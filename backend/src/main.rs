use axum::{
    Json, Router,
    body::Body,
    extract::{ConnectInfo, State},
    http::{HeaderMap, HeaderValue, Method, Request, StatusCode, header},
    middleware::{self, Next},
    response::{IntoResponse, Response},
    routing::{get, post},
};
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::{
    collections::HashMap,
    env,
    fs::{self, OpenOptions},
    io::Write,
    net::{IpAddr, Ipv4Addr, SocketAddr},
    path::PathBuf,
    sync::{Arc, Mutex},
    time::{Duration, Instant, SystemTime, UNIX_EPOCH},
};
use tower_http::{
    cors::{AllowOrigin, CorsLayer},
    services::{ServeDir, ServeFile},
};

const SYSTEM_PROMPT: &str = r#"You are VELURYN Assistant, the AI assistant for VELURYN AGNECY and VELURYN STUDIO.

About VELURYN AGNECY:
- An independent marketing and talent management agency for culture brands.
- Core services: Influencer Marketing, UGC Campaigns, Content & Creative, Performance Paid Ads, Social Media Marketing, and SEO & Web Design.
- Talent division: Represents creators, models, and AI talent (including Maya Bennett), managing commercial contracts, career growth, and sponsorships.
- VELURYN STUDIO division: Produces AI-generated video ads (short-form and long-form) and posters, combining AI visuals with human creative direction and Google Flow.
- Cyber Security division: ICA (International Contract Agency) provides private security engineering and threat modeling in Rust (ica.velurynagnecy.com).
- Direct Contact: vivin.b@velurynagnecy.com | Phone: +91 96775 33281 (India).

Rules:
- Keep answers concise, helpful, and professional (2-4 sentences).
- Never invent prices, guarantees, or fake client testimonials. Say quotes are tailored based on campaign scope by email.
- If asked who you are, introduce yourself as VELURYN Assistant, the AI assistant for VELURYN AGNECY.
- If the visitor speaks in Tamil, you can reply in Tamil. Otherwise reply in English.
- If you do not know an answer, politely direct the visitor to vivin.b@velurynagnecy.com."#;

#[derive(Clone)]
struct AppState {
    http_client: reqwest::Client,
    rate_limiter: Arc<Mutex<RateLimiterState>>,
    gemini_api_key: Option<String>,
    gemini_model: String,
    groq_api_key: Option<String>,
    groq_model: String,
    sentinel_gateway_url: Option<String>,
    sentinel_token: Option<String>,
    leads_file: PathBuf,
}

struct RateLimiterState {
    buckets: HashMap<String, Vec<Instant>>,
    last_cleanup: Instant,
}

impl RateLimiterState {
    fn new() -> Self {
        Self {
            buckets: HashMap::new(),
            last_cleanup: Instant::now(),
        }
    }

    /// Sliding window check. Returns (allowed, remaining, retry_after_secs).
    fn check(&mut self, key: &str, max_requests: usize, window: Duration) -> (bool, usize, u64) {
        let now = Instant::now();

        // Periodic cleanup of stale IP entries every 60 seconds
        if now.duration_since(self.last_cleanup) > Duration::from_secs(60) {
            self.buckets.retain(|_, timestamps| {
                timestamps.retain(|&t| now.duration_since(t) < window);
                !timestamps.is_empty()
            });
            self.last_cleanup = now;
        }

        let entry = self.buckets.entry(key.to_string()).or_default();
        entry.retain(|&t| now.duration_since(t) < window);

        if entry.len() >= max_requests {
            let oldest = entry.first().copied().unwrap_or(now);
            let retry_after = window
                .checked_sub(now.duration_since(oldest))
                .unwrap_or(Duration::from_secs(1))
                .as_secs()
                .max(1);
            (false, 0, retry_after)
        } else {
            entry.push(now);
            let remaining = max_requests.saturating_sub(entry.len());
            (true, remaining, 0)
        }
    }
}

/// Extract client IP from Cloudflare `CF-Connecting-IP`, `X-Forwarded-For`, or socket address.
fn extract_client_ip(headers: &HeaderMap, peer: Option<SocketAddr>) -> IpAddr {
    if let Some(cf_ip) = headers
        .get("cf-connecting-ip")
        .and_then(|v| v.to_str().ok())
        .and_then(|s| s.trim().parse::<IpAddr>().ok())
    {
        return cf_ip;
    }

    if let Some(xff) = headers.get("x-forwarded-for").and_then(|v| v.to_str().ok()) {
        if let Some(first) = xff.split(',').next() {
            if let Ok(ip) = first.trim().parse::<IpAddr>() {
                return ip;
            }
        }
    }

    peer.map(|s| s.ip())
        .unwrap_or(IpAddr::V4(Ipv4Addr::LOCALHOST))
}

/// Middleware: Security Headers + Cross-Site Abuse Protection + Per-IP Rate Limiting
async fn security_and_rate_limit_middleware(
    State(state): State<AppState>,
    req: Request<Body>,
    next: Next,
) -> Response {
    let path = req.uri().path().to_string();
    let method = req.method().clone();
    let headers = req.headers();
    let peer = req.extensions().get::<ConnectInfo<SocketAddr>>().map(|c| c.0);

    // 1. Block Cross-Site POST/PUT/DELETE requests (CSRF / cross-origin abuse protection)
    if method != Method::GET && method != Method::HEAD && method != Method::OPTIONS {
        if let Some(fetch_site) = headers.get("sec-fetch-site").and_then(|v| v.to_str().ok()) {
            if fetch_site.eq_ignore_ascii_case("cross-site") {
                return (
                    StatusCode::FORBIDDEN,
                    Json(json!({ "error": "Cross-origin requests are not allowed." })),
                )
                    .into_response();
            }
        }
    }

    // 2. Per-IP Rate Limiting (strict on /api/*, generous on static assets)
    let client_ip = extract_client_ip(headers, peer);
    let (bucket_scope, max_reqs, window_secs) = if path.starts_with("/api/chat") {
        ("chat", 60usize, 60u64)
    } else if path.starts_with("/api/contact") {
        ("contact", 15usize, 60u64)
    } else if path.starts_with("/api/") {
        ("api", 120usize, 60u64)
    } else {
        ("static", 300usize, 60u64)
    };

    let bucket_key = format!("{}:{}", bucket_scope, client_ip);
    let (allowed, remaining, retry_after) = {
        let mut limiter = state.rate_limiter.lock().unwrap();
        limiter.check(&bucket_key, max_reqs, Duration::from_secs(window_secs))
    };

    if !allowed {
        let mut res = (
            StatusCode::TOO_MANY_REQUESTS,
            Json(json!({
                "error": "Too many requests from this IP. Please wait a moment and try again.",
                "retry_after_seconds": retry_after
            })),
        )
            .into_response();
        let h = res.headers_mut();
        let _ = h.insert("Retry-After", HeaderValue::from(retry_after));
        let _ = h.insert("X-RateLimit-Limit", HeaderValue::from(max_reqs as u64));
        let _ = h.insert("X-RateLimit-Remaining", HeaderValue::from(0u64));
        append_security_headers(h, &path);
        return res;
    }

    let mut response = next.run(req).await;
    let res_headers = response.headers_mut();
    let _ = res_headers.insert("X-RateLimit-Limit", HeaderValue::from(max_reqs as u64));
    let _ = res_headers.insert("X-RateLimit-Remaining", HeaderValue::from(remaining as u64));
    append_security_headers(res_headers, &path);
    response
}

fn append_security_headers(headers: &mut HeaderMap, path: &str) {
    headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    headers.insert(header::X_FRAME_OPTIONS, HeaderValue::from_static("DENY"));
    headers.insert(
        header::REFERRER_POLICY,
        HeaderValue::from_static("strict-origin-when-cross-origin"),
    );
    headers.insert(
        "Permissions-Policy",
        HeaderValue::from_static("camera=(), microphone=(), geolocation=(), payment=()"),
    );
    headers.insert(
        "Cross-Origin-Opener-Policy",
        HeaderValue::from_static("same-origin"),
    );
    headers.insert(
        header::STRICT_TRANSPORT_SECURITY,
        HeaderValue::from_static("max-age=63072000; includeSubDomains; preload"),
    );
    headers.insert(
        "X-Powered-By",
        HeaderValue::from_static("VELURYN-Rust-Engine"),
    );

    if path.starts_with("/api/") {
        headers.insert(header::CACHE_CONTROL, HeaderValue::from_static("no-store"));
    }
}

#[derive(Deserialize)]
struct ChatMessage {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct ChatRequest {
    messages: Vec<ChatMessage>,
}

#[derive(Serialize)]
struct ChatResponse {
    reply: String,
    source: &'static str,
}

fn rust_fallback_reply(query: &str) -> String {
    let q = query.trim().to_lowercase();

    if q.contains("service")
        || q.contains("what do you do")
        || q.contains("capability")
        || q.contains("capabilities")
        || q.contains("offer")
    {
        return "VELURYN AGNECY provides 6 core growth services:\n\n1. Influencer Marketing (creator matching, contracting, campaign execution)\n2. UGC Campaigns (vetted creators, 50% upfront deposit security, watermark review drafts)\n3. Content & Creative (art direction, ad copywriting, visual identity)\n4. Performance Paid Ads (Meta, TikTok, and Google media buying)\n5. Social Media Marketing (organic growth, community, and strategy)\n6. SEO & Web Design (conversion-focused web experiences and search discovery)\n\nWe also produce AI commercial video ads and posters through VELURYN STUDIO."
            .to_string();
    }

    if q.contains("ugc") || q.contains("watermark") || q.contains("creator pipeline") {
        return "Our UGC pipeline connects brands with vetted creators across E-Commerce, Tech, Fashion, and Lifestyle. We operate with a 50% upfront deposit to secure the creator and deliver watermarked review drafts, so you only pay the remainder upon approval."
            .to_string();
    }

    if q.contains("ai talent") || q.contains("virtual") || q.contains("maya") {
        return "We develop and represent hyper-realistic AI talent, including Maya Bennett (@maya.benett2002), available for UGC product showcases, beauty and lifestyle routines, and paid social campaigns."
            .to_string();
    }

    if q.contains("talent")
        || q.contains("model")
        || q.contains("roster")
        || q.contains("creator")
        || q.contains("join")
        || q.contains("apply")
    {
        return "We represent high-caliber creators, models, and AI talent, managing commercial contracts, brand partnerships, and career growth. Creators can apply directly on our Creator Pipeline page."
            .to_string();
    }

    if q.contains("price")
        || q.contains("pricing")
        || q.contains("cost")
        || q.contains("rate")
        || q.contains("retainer")
        || q.contains("package")
        || q.contains("how much")
    {
        return "Pricing is tailored to your campaign scope, deliverable volume, and usage rights. Production starts with a 50% deposit, with the remaining 50% invoiced after you approve watermarked drafts. Contact vivin.b@velurynagnecy.com for a custom quote."
            .to_string();
    }

    if q.contains("contract")
        || q.contains("brief")
        || q.contains("hire")
        || q.contains("book")
        || q.contains("proposal")
        || q.contains("get started")
    {
        return "To submit a contract or project brief, use the live contract compose form on our Contact page, or email director Vivin B directly at vivin.b@velurynagnecy.com. We review every brief and respond within 24 hours."
            .to_string();
    }

    if q.contains("about")
        || q.contains("who are you")
        || q.contains("who is")
        || q.contains("founder")
        || q.contains("team")
        || q.contains("vivin")
    {
        return "VELURYN AGNECY is an independent marketing and talent management agency founded by Vivin B, bridging direct-response performance marketing with modern creator culture and AI studio production."
            .to_string();
    }

    if q.contains("studio") || q.contains("video") || q.contains("poster") || q.contains("flow") {
        return "VELURYN STUDIO produces AI commercial video ads (short-form vertical ads and creator-style UGC) and campaign posters with human art direction using Google Flow. Explore our reel on the Studio page."
            .to_string();
    }

    if q.contains("ica") || q.contains("cyber") || q.contains("security") || q.contains("rust") {
        return "Our International Contract Agency (ICA) division provides private cyber security engineering, threat modeling, and secure software infrastructure built in Rust at ica.velurynagnecy.com."
            .to_string();
    }

    if q.contains("contact") || q.contains("email") || q.contains("phone") || q.contains("call") {
        return "You can reach our leadership directly:\n- Email: vivin.b@velurynagnecy.com\n- Phone: +91 96775 33281 (India)\n- Operations: Global Remote"
            .to_string();
    }

    "I am VELURYN Assistant, powered by the VELURYN Rust backend. Ask me about our marketing services, Maya Bennett UGC campaigns, creator roster, studio productions, or pricing!"
        .to_string()
}

async fn health_handler() -> impl IntoResponse {
    Json(json!({
        "status": "ok",
        "engine": "veluryn-rust-backend",
        "version": env!("CARGO_PKG_VERSION"),
    }))
}

async fn chat_handler(
    State(state): State<AppState>,
    Json(payload): Json<ChatRequest>,
) -> impl IntoResponse {
    let valid_msgs: Vec<Value> = payload
        .messages
        .iter()
        .filter(|m| {
            (m.role == "user" || m.role == "assistant") && !m.content.trim().is_empty()
        })
        .rev()
        .take(10)
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .map(|m| {
            let truncated: String = m.content.chars().take(800).collect();
            json!({ "role": m.role, "content": truncated })
        })
        .collect();

    let Some(last_msg) = valid_msgs.last() else {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "Message list cannot be empty." })),
        )
            .into_response();
    };

    let last_user_text = last_msg
        .get("content")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();

    // Determine upstream LLM target (Sentinel -> Gemini -> Groq)
    let upstream = if let (Some(url), Some(token)) =
        (&state.sentinel_gateway_url, &state.sentinel_token)
    {
        Some((
            format!("{}/openai/v1/chat/completions", url.trim_end_matches('/')),
            format!("Bearer {}", token),
            state.groq_model.clone(),
            false,
        ))
    } else if let Some(gemini_key) = &state.gemini_api_key {
        Some((
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions".to_string(),
            format!("Bearer {}", gemini_key),
            state.gemini_model.clone(),
            true,
        ))
    } else if let Some(groq_key) = &state.groq_api_key {
        Some((
            "https://api.groq.com/openai/v1/chat/completions".to_string(),
            format!("Bearer {}", groq_key),
            state.groq_model.clone(),
            false,
        ))
    } else {
        None
    };

    if let Some((target_url, auth_header, model, is_gemini)) = upstream {
        let mut full_messages = Vec::with_capacity(valid_msgs.len() + 1);
        full_messages.push(json!({ "role": "system", "content": SYSTEM_PROMPT }));
        full_messages.extend(valid_msgs);

        let req_body = json!({
            "model": model,
            "messages": full_messages,
            "temperature": 0.5,
            "max_tokens": 1200,
        });

        let mut res = state
            .http_client
            .post(&target_url)
            .header("Authorization", &auth_header)
            .header("Connection", "close")
            .json(&req_body)
            .send()
            .await;

        // Automatic fallback to gemini-3.1-flash-lite if primary Gemini model fails
        if let Ok(r) = &res {
            if !r.status().is_success() && is_gemini && model != "gemini-3.1-flash-lite" {
                let fallback_body = json!({
                    "model": "gemini-3.1-flash-lite",
                    "messages": req_body["messages"],
                    "temperature": 0.5,
                    "max_tokens": 450,
                });
                res = state
                    .http_client
                    .post(&target_url)
                    .header("Authorization", &auth_header)
                    .header("Connection", "close")
                    .json(&fallback_body)
                    .send()
                    .await;
            }
        }

        if let Ok(r) = res {
            if r.status().is_success() {
                if let Ok(body_json) = r.json::<Value>().await {
                    if let Some(reply) = body_json
                        .pointer("/choices/0/message/content")
                        .and_then(|v| v.as_str())
                    {
                        let trimmed = reply.trim();
                        if !trimmed.is_empty() {
                            return (
                                StatusCode::OK,
                                Json(ChatResponse {
                                    reply: trimmed.to_string(),
                                    source: "llm",
                                }),
                            )
                                .into_response();
                        }
                    }
                }
            }
        }
    }

    // Resilient Rust local knowledge base fallback
    let reply = rust_fallback_reply(&last_user_text);
    (
        StatusCode::OK,
        Json(ChatResponse {
            reply,
            source: "rust-engine",
        }),
    )
        .into_response()
}

async fn contact_handler(
    State(state): State<AppState>,
    ConnectInfo(peer): ConnectInfo<SocketAddr>,
    headers: HeaderMap,
    Json(payload): Json<HashMap<String, Value>>,
) -> impl IntoResponse {
    // 1. Honeypot spam check
    if let Some(honey) = payload.get("_honey").and_then(|v| v.as_str()) {
        if !honey.trim().is_empty() {
            return (StatusCode::OK, Json(json!({ "ok": true }))).into_response();
        }
    }

    let client_ip = extract_client_ip(&headers, Some(peer));
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0);

    // 2. Persist lead locally in backend/data/leads.jsonl
    let log_entry = json!({
        "timestamp_unix": timestamp,
        "client_ip": client_ip.to_string(),
        "payload": payload,
    });

    if let Some(parent) = state.leads_file.parent() {
        let _ = fs::create_dir_all(parent);
    }
    if let Ok(mut file) = OpenOptions::new()
        .create(true)
        .append(true)
        .open(&state.leads_file)
    {
        let _ = writeln!(file, "{}", log_entry);
    }

    // 3. Forward to FormSubmit so inbox delivery continues seamlessly
    let _ = state
        .http_client
        .post("https://formsubmit.co/ajax/velurynandco@gmail.com")
        .header("Accept", "application/json")
        .json(&payload)
        .send()
        .await;

    (
        StatusCode::OK,
        Json(json!({
            "ok": true,
            "message": "Brief logged by VELURYN Rust backend."
        })),
    )
        .into_response()
}

#[tokio::main]
async fn main() {
    // Load .env from project root or current dir
    let _ = dotenvy::from_filename("../.env").or_else(|_| dotenvy::dotenv());

    let port: u16 = env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(3001);

    let gemini_api_key = env::var("GEMINI_API_KEY")
        .ok()
        .filter(|s| !s.trim().is_empty());
    let gemini_model = env::var("GEMINI_MODEL")
        .ok()
        .filter(|s| !s.trim().is_empty())
        .unwrap_or_else(|| "gemini-3-flash-preview".to_string());
    let groq_api_key = env::var("GROQ_API_KEY")
        .ok()
        .filter(|s| !s.trim().is_empty());
    let groq_model = env::var("GROQ_MODEL")
        .ok()
        .filter(|s| !s.trim().is_empty())
        .unwrap_or_else(|| "llama-3.3-70b-versatile".to_string());
    let sentinel_gateway_url = env::var("SENTINEL_GATEWAY_URL")
        .ok()
        .filter(|s| !s.trim().is_empty());
    let sentinel_token = env::var("SENTINEL_WEB_APP_TOKEN")
        .ok()
        .filter(|s| !s.trim().is_empty());

    let http_client = reqwest::Client::builder()
        .pool_max_idle_per_host(0)
        .connect_timeout(Duration::from_secs(3))
        .timeout(Duration::from_secs(5))
        .build()
        .expect("Failed to initialize HTTP client");

    let leads_file = if PathBuf::from("backend").exists() {
        PathBuf::from("backend/data/leads.jsonl")
    } else {
        PathBuf::from("data/leads.jsonl")
    };

    let state = AppState {
        http_client,
        rate_limiter: Arc::new(Mutex::new(RateLimiterState::new())),
        gemini_api_key,
        gemini_model,
        groq_api_key,
        groq_model,
        sentinel_gateway_url,
        sentinel_token,
        leads_file,
    };

    // Strict CORS allowlist for production and local dev origins
    let allowed_origins = [
        "https://velurynagnecy.com".parse::<HeaderValue>().unwrap(),
        "https://www.velurynagnecy.com".parse::<HeaderValue>().unwrap(),
        "http://localhost:5173".parse::<HeaderValue>().unwrap(),
        "http://127.0.0.1:5173".parse::<HeaderValue>().unwrap(),
        "http://localhost:3001".parse::<HeaderValue>().unwrap(),
        "http://127.0.0.1:3001".parse::<HeaderValue>().unwrap(),
    ];

    let cors = CorsLayer::new()
        .allow_origin(AllowOrigin::list(allowed_origins))
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::ACCEPT, header::AUTHORIZATION]);

    // Static SPA directory (serves ../dist or ./dist with index.html fallback)
    let dist_dir = if PathBuf::from("../dist").exists() {
        PathBuf::from("../dist")
    } else {
        PathBuf::from("dist")
    };
    let index_file = dist_dir.join("index.html");
    let spa_service = ServeDir::new(&dist_dir).not_found_service(ServeFile::new(index_file));

    let app = Router::new()
        .route("/api/health", get(health_handler))
        .route("/api/chat", post(chat_handler))
        .route("/api/contact", post(contact_handler))
        .fallback_service(spa_service)
        .layer(cors)
        .layer(middleware::from_fn_with_state(
            state.clone(),
            security_and_rate_limit_middleware,
        ))
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("⚡ VELURYN Rust Backend listening on http://127.0.0.1:{}", port);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Failed to bind TCP port");

    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .expect("Server error");
}
