import { useEffect, useRef, useState } from 'react';

export interface DitherMeshProps {
  mode?: 'crimson' | 'topo' | 'noir';
  className?: string;
  interactive?: boolean;
  pixelSize?: number;
  showControls?: boolean;
}

const VS_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_pixelSize;
  uniform int u_mode;
  uniform float u_rippleTime;
  uniform vec2 u_ripplePos;
  uniform float u_enabled;

  float bayer4(vec2 p) {
    int x = int(mod(p.x, 4.0));
    int y = int(mod(p.y, 4.0));
    int i = x + y * 4;
    if (i == 0) return 0.0/16.0;
    if (i == 1) return 8.0/16.0;
    if (i == 2) return 2.0/16.0;
    if (i == 3) return 10.0/16.0;
    if (i == 4) return 12.0/16.0;
    if (i == 5) return 4.0/16.0;
    if (i == 6) return 14.0/16.0;
    if (i == 7) return 6.0/16.0;
    if (i == 8) return 3.0/16.0;
    if (i == 9) return 11.0/16.0;
    if (i == 10) return 1.0/16.0;
    if (i == 11) return 9.0/16.0;
    if (i == 12) return 15.0/16.0;
    if (i == 13) return 7.0/16.0;
    if (i == 14) return 13.0/16.0;
    return 5.0/16.0;
  }

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = p * 2.08 + vec2(17.1, 9.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    if (u_enabled < 0.5) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      return;
    }

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 m = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 ripP = (u_ripplePos - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    float mDist = length(p - m);
    float mInfluence = smoothstep(0.48, 0.0, mDist);
    vec2 mDir = (mDist > 0.001) ? (p - m) / mDist : vec2(0.0);
    p += mDir * mInfluence * 0.18;

    float ripDist = length(p - ripP);
    float ripWave = sin(ripDist * 28.0 - u_rippleTime * 14.0) * exp(-u_rippleTime * 3.5) * exp(-ripDist * 3.0);
    p += mDir * ripWave * 0.12;

    float t = u_time * 0.35;
    vec2 pixelCoord = floor(gl_FragCoord.xy / u_pixelSize);
    float bay = bayer4(pixelCoord);

    vec3 cWhite = vec3(1.0, 1.0, 1.0);
    vec3 cSoftSilver = vec3(0.93, 0.96, 1.0);
    vec3 cMist = vec3(0.82, 0.89, 0.98);
    vec3 cCharcoal = vec3(0.04, 0.08, 0.22);
    vec3 cAccent = vec3(1.0, 0.835, 0.016); // Brand Bright Yellow #FFD504

    vec3 col = cWhite;

    if (u_mode == 0) {
      vec2 q = vec2(fbm(p * 2.1 + vec2(0.0, t * 0.18)),
                    fbm(p * 2.1 + vec2(5.2, 1.3 - t * 0.12)));
      vec2 r = vec2(fbm(p * 2.8 + 3.5 * q + vec2(1.7, 9.2) + t * 0.12),
                    fbm(p * 2.8 + 3.5 * q + vec2(8.3, 2.8) - t * 0.1));
      float f = fbm(p + 3.5 * r);
      float field = clamp(f * 1.25 + 0.42, 0.0, 1.0);

      float centerMask = smoothstep(0.0, 0.65, length(p * vec2(1.1, 1.4)));
      field = mix(field * 0.72, field, centerMask);

      float s1 = step(bay, field * 1.2);
      float s2 = step(bay, field * 0.82);
      float sAccent = step(bay, (field * q.x * 1.5 + mInfluence * 0.55 + abs(ripWave) * 1.5)) * (1.0 - s2);

      col = mix(col, cSoftSilver, s1);
      col = mix(col, cMist, s2);
      col = mix(col, cAccent, sAccent * 0.88);
      col = mix(col, cCharcoal, step(bay, field * 0.45) * 0.12);
    }
    else if (u_mode == 1) {
      float elev = sin(p.x * 7.0 + t * 0.5) * cos(p.y * 6.0 - t * 0.4)
                 + 0.5 * sin(p.x * 13.0 - p.y * 11.0 + t * 0.7)
                 + fbm(p * 4.0) * 0.6;
      elev += mInfluence * 0.6 + ripWave * 0.8;

      float contours = abs(fract(elev * 4.0 - 0.5) - 0.5) * 2.0;
      float contourLine = smoothstep(0.12, 0.0, contours);

      vec2 grid = abs(fract(p * 14.0 - 0.5) - 0.5);
      float gridLine = smoothstep(0.08, 0.0, min(grid.x, grid.y)) * 0.35;

      float ditherField = clamp((elev * 0.5 + 0.5) * 0.8 + contourLine * 0.4 + gridLine, 0.0, 1.0);

      float s1 = step(bay, ditherField * 1.1);
      float s2 = step(bay, ditherField * 0.75);
      float sAccent = step(bay, contourLine * 0.85 + mInfluence * 0.5);

      col = mix(col, cSoftSilver, s1);
      col = mix(col, cMist, s2);
      col = mix(col, cAccent, sAccent * 0.8);
      col = mix(col, cCharcoal, step(bay, contourLine * 0.4) * 0.25);
    }
    else {
      vec2 q = vec2(fbm(p * 2.4 + vec2(t * 0.15, 0.0)),
                    fbm(p * 2.4 + vec2(2.1, t * 0.12)));
      float f = fbm(p * 1.8 + 2.5 * q);
      float field = clamp(f * 1.35 + 0.4, 0.0, 1.0);

      float s1 = step(bay, field * 1.25);
      float s2 = step(bay, field * 0.8);
      float s3 = step(bay, field * 0.45);

      col = mix(col, cSoftSilver, s1);
      col = mix(col, cMist, s2);
      col = mix(col, cCharcoal, s3 * 0.35);
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function DitherMesh({
  mode = 'crimson',
  className = '',
  interactive = true,
  pixelSize = 2.5,
  showControls = true,
}: DitherMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<number>(
    mode === 'topo' ? 1 : mode === 'noir' ? 2 : 0
  );
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const glCtx: WebGLRenderingContext = gl;
    const cvs: HTMLCanvasElement = canvas;

    function compile(type: number, src: string) {
      const s = glCtx.createShader(type)!;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const vs = compile(glCtx.VERTEX_SHADER, VS_SOURCE);
    const fs = compile(glCtx.FRAGMENT_SHADER, FS_SOURCE);
    const prog = glCtx.createProgram()!;
    glCtx.attachShader(prog, vs);
    glCtx.attachShader(prog, fs);
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const posLoc = glCtx.getAttribLocation(prog, 'position');
    glCtx.enableVertexAttribArray(posLoc);
    glCtx.vertexAttribPointer(posLoc, 2, glCtx.FLOAT, false, 0, 0);

    const uRes = glCtx.getUniformLocation(prog, 'u_resolution');
    const uTime = glCtx.getUniformLocation(prog, 'u_time');
    const uMouse = glCtx.getUniformLocation(prog, 'u_mouse');
    const uPixelSize = glCtx.getUniformLocation(prog, 'u_pixelSize');
    const uMode = glCtx.getUniformLocation(prog, 'u_mode');
    const uRippleTime = glCtx.getUniformLocation(prog, 'u_rippleTime');
    const uRipplePos = glCtx.getUniformLocation(prog, 'u_ripplePos');
    const uEnabled = glCtx.getUniformLocation(prog, 'u_enabled');

    let mouseX = 400;
    let mouseY = 300;
    let targetMX = 400;
    let targetMY = 300;
    let rippleStartTime = -999;
    let rippleX = 0;
    let rippleY = 0;
    let inView = true;
    let raf = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = cvs.getBoundingClientRect();
      targetMX = e.clientX - rect.left;
      targetMY = rect.bottom - e.clientY;
    }

    function onPointerDown(e: PointerEvent) {
      const rect = cvs.getBoundingClientRect();
      rippleStartTime = performance.now();
      rippleX = e.clientX - rect.left;
      rippleY = rect.bottom - e.clientY;
    }

    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      cvs.addEventListener('pointerdown', onPointerDown);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = cvs.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (cvs.width !== w || cvs.height !== h) {
        cvs.width = w;
        cvs.height = h;
        glCtx.viewport(0, 0, w, h);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(cvs);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
    });
    intersectionObserver.observe(cvs);

    function render(time: number) {
      if (inView && isEnabled) {
        mouseX += (targetMX - mouseX) * 0.08;
        mouseY += (targetMY - mouseY) * 0.08;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const ripTime = (time - rippleStartTime) * 0.001;

        glCtx.uniform2f(uRes, cvs.width, cvs.height);
        glCtx.uniform1f(uTime, time * 0.001);
        glCtx.uniform2f(uMouse, mouseX * dpr, mouseY * dpr);
        glCtx.uniform1f(uPixelSize, pixelSize * dpr);
        glCtx.uniform1i(uMode, activeMode);
        glCtx.uniform1f(uRippleTime, Math.max(0.0, ripTime));
        glCtx.uniform2f(uRipplePos, rippleX * dpr, rippleY * dpr);
        glCtx.uniform1f(uEnabled, isEnabled ? 1 : 0);

        glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      if (interactive) {
        window.removeEventListener('pointermove', onPointerMove);
        cvs.removeEventListener('pointerdown', onPointerDown);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      glCtx.deleteBuffer(buf);
      glCtx.deleteProgram(prog);
    };
  }, [activeMode, isEnabled, interactive, pixelSize]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1.5rem',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            padding: '0.35rem 0.5rem 0.35rem 0.8rem',
            borderRadius: '40px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: '#1a1a1e',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', textTransform: 'uppercase' }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: isEnabled ? '#FFD504' : '#888',
                boxShadow: isEnabled ? '0 0 8px rgba(255, 213, 4, 0.85)' : 'none',
              }}
            />
            <span>DITHER MESH</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
              onClick={() => setActiveMode(0)}
              style={{
                background: activeMode === 0 ? '#0B5FFF' : 'transparent',
                color: activeMode === 0 ? '#fff' : '#666',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Gold Aura
            </button>
            <button
              onClick={() => setActiveMode(1)}
              style={{
                background: activeMode === 1 ? '#0B5FFF' : 'transparent',
                color: activeMode === 1 ? '#fff' : '#666',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              CAD Topo
            </button>
            <button
              onClick={() => setActiveMode(2)}
              style={{
                background: activeMode === 2 ? '#0B5FFF' : 'transparent',
                color: activeMode === 2 ? '#fff' : '#666',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.25rem 0.6rem',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Pure Noir
            </button>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              title="Toggle Dither Mesh"
              style={{
                background: !isEnabled ? '#0B5FFF' : 'transparent',
                color: !isEnabled ? '#fff' : '#666',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: '0.8rem',
                padding: '0.25rem 0.45rem',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              ⏻
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
