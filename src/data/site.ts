/**
 * Everything editable about the main site lives here.
 * Texts marked DRAFT are new and have not been written by the founder yet.
 * Images: drop files in /public/images/site/ with the names shown as `img`.
 * Until a file exists the page shows a blue placeholder.
 */

export const SITE = {
  name: 'VELURYN AGNECY',
  email: 'vivin.b@velurynagnecy.com',
  phone: '+91 96775 33281',
  phoneHref: 'tel:+919677533281',
  phoneNote: 'India only',
  url: 'https://velurynagnecy.com',
  studioPath: '/studio',
  icaUrl: 'https://ica.velurynagnecy.com',
  /** Form endpoint. FormSubmit delivers the form to this inbox. */
  formEndpoint: 'https://formsubmit.co/ajax/velurynandco@gmail.com',
  studioCta: 'Need AI visuals?',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/velurynagnecy' },
    { label: 'X', href: 'https://x.com/velurynagnecy' },
    { label: 'Pinterest', href: 'https://pin.it/4WZTPTGkb' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/veluryn-agnecy' },
    { label: 'Facebook', href: 'https://facebook.com/velurynagnecy' },
  ],
};

export type Service = {
  slug: string;
  path: string;
  title: string;
  short: string;
  lead: string;
  img: string;
  pointsTitle: string;
  points: { h: string; t: string }[];
  stepsTitle: string;
  steps: { h: string; t: string }[];
  closing: string;
  cta: string;
  draft?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: 'influencer-marketing',
    path: '/services/influencer-marketing',
    title: 'Influencer Marketing',
    short: 'Strategic creator campaigns built around the right audience and talent.',
    lead: 'Strategic creator campaigns built around the right audience and talent. We manage sourcing, negotiation, and execution.',
    img: 'influencer-marketing.jpg',
    pointsTitle: 'How we execute',
    points: [
      { h: 'Influencer Strategy', t: 'Aligning creators with your business goals.' },
      { h: 'Creator Sourcing & Selection', t: 'Vetting talent for authentic audience overlap.' },
      { h: 'Campaign Management', t: 'Handling briefs, timelines, and deliverables.' },
      { h: 'Performance Reporting', t: 'Analyzing campaign performance and ROI.' },
    ],
    stepsTitle: 'What this includes',
    steps: [
      { h: 'Strategy', t: 'Understand your brand, audience, and campaign objectives before we identify any talent.' },
      { h: 'Discovery', t: 'Source and vet the right creators for your vertical, ensuring authentic alignment with your brand.' },
      { h: 'Negotiation', t: 'Secure talent, align on deliverables, and negotiate terms and usage rights on your behalf.' },
      { h: 'Production', t: 'Manage the creative process from brief to delivery, ensuring content hits performance goals.' },
    ],
    closing: 'Ready to scale your brand through targeted influencer partnerships? Reach out to discuss your objectives and budget.',
    cta: 'Start a campaign',
  },
  {
    slug: 'ugc-campaigns',
    path: '/ugc-campaigns',
    title: 'UGC Campaigns',
    short: 'Social first content produced through carefully selected creators.',
    lead: 'Social first content produced through carefully selected creators. UGC is one part of how VELURYN helps brands grow.',
    img: 'ugc-campaigns.jpg',
    pointsTitle: 'Usage rights',
    points: [
      { h: 'Organic Rights', t: 'Standard inclusion for posting on your owned social channels.' },
      { h: 'Paid / Whitelisting', t: 'Priced separately to allow scaling across paid acquisition channels (Meta, TikTok, etc.) with explicit creator permission.' },
    ],
    stepsTitle: 'The pipeline',
    steps: [
      { h: 'Brief & Match', t: 'You submit your campaign goals and brand verticals. We tap our roster and match you with the perfect creators for your niche.' },
      { h: 'Watermarked Drafts', t: 'Creators script and film the content. We deliver watermarked drafts to you for review and approval.' },
      { h: 'Invoice & Release', t: 'Once approved, we issue the final invoice. Upon payment, the watermark is removed and high-res files are released to you.' },
    ],
    closing: 'Every brand is different. We custom build bundles (e.g., 2 creators × 3 videos) based on your exact volume needs, target audience, and required usage rights. Reach out for a custom quote tailored to your next campaign.',
    cta: 'Start a project',
  },
  {
    slug: 'content-creative',
    path: '/services/content-creative',
    title: 'Content & Creative',
    short: 'Creator led and branded content built for attention.',
    lead: 'Creator led and branded content built for attention. While UGC is highly effective for conversion, modern brands need a diverse mix of creative assets.',
    img: 'content-creative.jpg',
    pointsTitle: 'Full-spectrum creative support',
    points: [
      { h: 'Branded Content', t: 'Polished brand storytelling that elevates your aesthetic.' },
      { h: 'Social Creative', t: 'Trend-driven assets designed for shareability and organic reach.' },
      { h: 'Creator-Led Productions', t: 'Leveraging top talent to anchor high-production value campaigns.' },
    ],
    stepsTitle: 'Beyond UGC',
    steps: [
      { h: 'Short Form Content', t: 'Platform native content designed specifically for TikTok, Reels, and YouTube Shorts algorithms.' },
      { h: 'Creative Direction', t: 'Concept development, scripting, and visual direction to ensure content aligns with brand strategy.' },
      { h: 'Campaign Assets', t: 'Comprehensive content packages built for multi-platform marketing campaigns and paid acquisition.' },
    ],
    closing: "Tell us about your creative requirements and we'll build a tailored content solution for your brand.",
    cta: 'Brief us',
  },
  {
    slug: 'social-media-marketing',
    path: '/services/social-media-marketing',
    title: 'Social Media Marketing',
    short: 'Planning, posting and community care across your channels.',
    lead: 'A steady, on-brand presence on the channels your customers already use.',
    img: 'social-media.jpg',
    pointsTitle: 'What we handle',
    points: [
      { h: 'Content Planning', t: 'A calendar built around your goals, launches and audience.' },
      { h: 'Posts and Graphics', t: 'Designed posts, carousels and short video for each platform.' },
      { h: 'Community', t: 'Replies, comments and conversations handled in your voice.' },
      { h: 'Reporting', t: 'Clear monthly numbers on what worked and what to change.' },
    ],
    stepsTitle: 'How it runs',
    steps: [
      { h: 'Audit', t: 'We review your channels, audience and competitors.' },
      { h: 'Plan', t: 'We agree the themes, formats and posting rhythm.' },
      { h: 'Publish', t: 'We create, schedule and post.' },
      { h: 'Review', t: 'We report and adjust every month.' },
    ],
    closing: 'Tell us which channels matter to you and we will propose a plan.',
    cta: 'Get a plan',
    draft: true,
  },
  {
    slug: 'performance-ads',
    path: '/services/performance-ads',
    title: 'Performance Ads',
    short: 'Paid campaigns on Meta, Google and TikTok, built on creative that converts.',
    lead: 'Paid media where the creative and the targeting are planned together.',
    img: 'performance-ads.jpg',
    pointsTitle: 'What we handle',
    points: [
      { h: 'Campaign Setup', t: 'Accounts, pixels, audiences and tracking set up properly.' },
      { h: 'Creative Testing', t: 'Several hooks and formats tested against each other.' },
      { h: 'Budget Management', t: 'Spend moved toward what performs.' },
      { h: 'Reporting', t: 'Plain numbers, no vanity metrics.' },
    ],
    stepsTitle: 'How it runs',
    steps: [
      { h: 'Goals', t: 'We define the result you need and how it is measured.' },
      { h: 'Launch', t: 'Campaigns go live with a first round of creative.' },
      { h: 'Optimise', t: 'We learn from the data and refine.' },
    ],
    closing: 'We cannot promise specific ROAS or CPA, but we will tell you what the numbers say, every time.',
    cta: 'Talk about ads',
    draft: true,
  },
  {
    slug: 'seo',
    path: '/services/seo',
    title: 'SEO',
    short: 'Be found when people search for what you sell.',
    lead: 'Search work that fixes the foundations first, then builds content that earns traffic.',
    img: 'seo.jpg',
    pointsTitle: 'What we handle',
    points: [
      { h: 'Technical Audit', t: 'Speed, structure and indexing problems found and fixed.' },
      { h: 'Keyword Research', t: 'The searches your customers actually make.' },
      { h: 'On-page Work', t: 'Titles, headings, copy and internal links.' },
      { h: 'Content', t: 'Articles and pages written to answer real questions.' },
    ],
    stepsTitle: 'How it runs',
    steps: [
      { h: 'Audit', t: 'We find what is holding the site back.' },
      { h: 'Fix', t: 'We repair the technical and on-page basics.' },
      { h: 'Grow', t: 'We publish and improve content month after month.' },
    ],
    closing: 'SEO takes time. We will be honest about what to expect.',
    cta: 'Ask about SEO',
    draft: true,
  },
  {
    slug: 'branding-design',
    path: '/services/branding-design',
    title: 'Branding & Design',
    short: 'Identity, posters and social graphics that look like one brand.',
    lead: 'Visual identity and everyday design for brands that want to look consistent.',
    img: 'branding.jpg',
    pointsTitle: 'What we make',
    points: [
      { h: 'Brand Identity', t: 'Logo, colours, type and simple guidelines.' },
      { h: 'Social Posts and Graphics', t: 'Templates and one-off designs for your channels.' },
      { h: 'Posters and Print', t: 'Posters, flyers and campaign visuals.' },
    ],
    stepsTitle: 'How it runs',
    steps: [
      { h: 'Brief', t: 'We learn about the brand and the audience.' },
      { h: 'Concepts', t: 'You see directions before we polish.' },
      { h: 'Delivery', t: 'Final files, ready to use.' },
    ],
    closing: 'Tell us what you need designed.',
    cta: 'Start a design brief',
    draft: true,
  },
  {
    slug: 'web-design',
    path: '/services/web-design',
    title: 'Web Design',
    short: 'Fast, clear websites that turn visitors into enquiries.',
    lead: 'Websites designed around what your visitor needs to do next.',
    img: 'web-design.jpg',
    pointsTitle: 'What we make',
    points: [
      { h: 'Design', t: 'A clean look that fits your brand.' },
      { h: 'Build', t: 'Fast, mobile-friendly, easy to maintain.' },
      { h: 'Forms and Booking', t: 'Enquiry forms and booking set up and tested.' },
      { h: 'Launch Support', t: 'Domain, hosting and go-live handled with you.' },
    ],
    stepsTitle: 'How it runs',
    steps: [
      { h: 'Plan', t: 'Pages, content and goals agreed up front.' },
      { h: 'Design', t: 'You review the look before it is built.' },
      { h: 'Build and Launch', t: 'We build, test and publish.' },
    ],
    closing: 'Tell us about the site you need.',
    cta: 'Brief a website',
    draft: true,
  },
];

export const STEPS = [
  { h: 'Strategy', t: 'Understand the brand, audience, objectives and campaign requirements.' },
  { h: 'Talent', t: 'Identify the right creators, models and talent for the project.' },
  { h: 'Creative', t: 'Develop the content direction and campaign creative.' },
  { h: 'Execute', t: 'Manage partnerships, production and campaign delivery.' },
  { h: 'Grow', t: 'Analyze performance and build the next opportunity.' },
];

export const FAQ: { q: string; a: string }[] = [
  { q: 'Do you only do UGC?', a: 'No. UGC is one of our services. We also offer influencer marketing, content & creative services, and talent management for creators and models.' },
  { q: 'Where are you located?', a: 'We are a globally distributed, remote-first agency. This allows us to source talent internationally and operate across multiple time zones efficiently.' },
  { q: 'How do you select your creators?', a: 'Creators apply to join our roster and undergo a vetting process where we review their portfolio, on-camera presence, and past performance metrics. We only onboard talent that meets our quality standards.' },
  { q: 'Do you guarantee campaign performance?', a: 'While we cannot guarantee specific ROAS or CPA outcomes due to variables in media buying and product-market fit, we do guarantee the delivery of high-quality, brief-compliant creative that is engineered based on proven performance principles.' },
  { q: 'How are creators paid?', a: 'We secure deposits upfront from brands. Creators are paid according to the terms of their specific campaign or management agreement, ensuring secure and reliable compensation.' },
  { q: 'How does payment work for brands?', a: '50% advance starts production, and the remaining 50% is due on delivery. We quote transparently in both INR (₹) and USD ($).' },
  { q: 'How many revisions are included?', a: 'Two revision rounds are included with every project. Extra revision rounds are billed at 20% of the project price. Raw footage and unlimited usage rights are available as paid add-ons.' },
  { q: 'What do you do with VELURYN STUDIO and ICA?', a: 'VELURYN STUDIO is our AI visuals and UGC ads studio, and its work is on the Studio page. ICA, the International Contract Agency, is our cyber security division. Organizations and individuals may apply. Both are part of VELURYN AGNECY. VELURYN STUDIO lives on this site and ICA has its own site.' },
];

export const PRICING_PER_PROJECT = [
  { item: 'Short form ad (15 to 30 sec)', inr: '₹6,000', usd: '$130' },
  { item: 'Pack of 5 short ads', inr: '₹25,000', usd: '$550' },
  { item: 'Long form ad (60 to 90 sec)', inr: '₹30,000 to ₹45,000', usd: '$450 to $900' },
  { item: 'UGC ad (20 to 30 sec)', inr: '₹4,000', usd: '$70' },
  { item: 'Pack of 3 UGC ads', inr: '₹10,000', usd: '$180' },
  { item: 'Poster', inr: '₹800', usd: '$20' },
  { item: 'Pack of 10 posters', inr: '₹6,500', usd: '$150' },
];

export const PRICING_RETAINERS = [
  {
    tier: 'Starter',
    inr: '₹30,000',
    usd: '$450',
    period: '/ month',
    deliverables: ['4 short ads', '2 UGC videos', '8 posters'],
    featured: false,
  },
  {
    tier: 'Growth',
    inr: '₹65,000',
    usd: '$950',
    period: '/ month',
    deliverables: ['8 short ads', '1 long ad', '4 UGC videos', '16 posters'],
    featured: true,
  },
  {
    tier: 'Scale',
    inr: '₹1,20,000',
    usd: '$1,800',
    period: '/ month',
    deliverables: ['15 short ads', '2 long ads', '8 UGC videos', '30 posters', 'Priority turnaround'],
    featured: false,
  },
];

export const PRICING_TERMS = [
  { title: '50% advance, 50% on delivery', desc: 'Production begins once the 50% advance is received, with the remaining 50% settled upon final delivery.' },
  { title: 'Two revision rounds included', desc: 'Every project includes two rounds of revisions. Extra revision rounds are billed at 20% of the project price.' },
  { title: 'Raw footage & unlimited usage rights', desc: 'Raw footage files and unlimited paid usage rights are available as paid add-ons.' },
];

export const FILLER_WORDS = ['Influencer marketing', 'UGC campaigns', 'Content & creative', 'Talent management', 'Social media', 'Performance ads', 'SEO', 'Branding & design', 'Web design', 'AI visuals'];

/* ------------------------------------------------------------------
   VELURYN STUDIO (AI ads and UGC). Lives inside this site at /studio.
   VIDEOS: put MP4 files in /public/videos and set  video: { type: 'mp4', src: '/videos/saree-short.mp4' }
   Keep each file under 25 MB (Cloudflare limit), H.264 video and AAC audio.
   For the long ad use YouTube (unlisted): video: { type: 'youtube', src: 'VIDEO_ID' }
   Without a video the card shows a placeholder.
------------------------------------------------------------------- */
export type Video = { type: 'mp4' | 'youtube'; src: string };
export type WorkItem = { id: string; title: string; kind: string; language: 'Tamil' | 'English'; brief: string; ratio: '9:16' | '16:9'; video?: Video; poster?: string };

export const STUDIO = {
  tagline: 'Words say nothing when visuals are everything.',
  intro: 'VELURYN STUDIO makes AI generated video ads and UGC ads for brands. The visuals are made by AI. All the planning is made by humans.',
  tool: 'Google Flow',
};

export const SHORT_ADS: WorkItem[] = [
  {
    id: 'bridal-makeup',
    title: 'Bridal Studio Commercial',
    kind: 'Short form ad',
    language: 'Tamil',
    brief: 'Vertical AI commercial built for high scroll retention and local studio bookings.',
    ratio: '9:16',
    video: { type: 'mp4', src: '/videos/bridal-makeup.mp4' },
    poster: '/images/studio/bridal-makeup.webp',
  },
  {
    id: 'jewellery-showroom',
    title: 'Fine Jewellery Showcase',
    kind: 'Short form ad',
    language: 'Tamil',
    brief: 'Multi-scene vertical campaign crafted for regional luxury retail.',
    ratio: '9:16',
    video: { type: 'mp4', src: '/videos/jewellery-showroom.mp4' },
    poster: '/images/studio/jewellery-showroom.webp',
  },
];

export const LONG_AD: WorkItem = {
  id: 'saree-long',
  title: 'Brand Film',
  kind: 'Long form ad',
  language: 'Tamil',
  brief: 'Full length brand film.',
  ratio: '16:9',
};

export const UGC_ADS: WorkItem[] = [
  {
    id: 'ugc-maya-1',
    title: 'Matcha Set Morning Routine',
    kind: 'UGC Ad · Maya Bennett',
    language: 'English',
    brief: 'Natural product storytelling showing how easy it is to whisk and pour an iced matcha latte at home.',
    ratio: '9:16',
    video: { type: 'mp4', src: '/videos/ugc-maya-1.mp4' },
    poster: '/images/studio/ugc-maya-1.webp',
  },
  {
    id: 'ugc-maya-2',
    title: 'AI-Powered Skincare Routine',
    kind: 'UGC Ad · Maya Bennett',
    language: 'English',
    brief: 'Testimonial-style beauty and skincare routine combining conversational scripting with product-focused visuals.',
    ratio: '9:16',
    video: { type: 'mp4', src: '/videos/ugc-maya-2.mp4' },
    poster: '/images/studio/ugc-maya-2.webp',
  },
  {
    id: 'ugc-maya-3',
    title: 'VELORA Silk Drop Hair Serum',
    kind: 'UGC Ad · Maya Bennett',
    language: 'English',
    brief: 'Creator-led haircare showcase built for Instagram Reels, TikTok, and paid social conversion.',
    ratio: '9:16',
    video: { type: 'mp4', src: '/videos/ugc-maya-3.mp4' },
    poster: '/images/studio/ugc-maya-3.webp',
  },
];

export const STUDIO_POSTERS = [
  { id: 'poster-1', title: 'Strategy Meets Storytelling', img: '/images/posters/poster-1.jpeg', ratio: '768 / 1376' },
  { id: 'poster-2', title: 'Trust Authority Infrastructure', img: '/images/posters/poster-2.jpeg', ratio: '1086 / 1448' },
  { id: 'poster-3', title: 'High-Performing Digital Solutions', img: '/images/posters/poster-3.jpeg', ratio: '1024 / 1536' },
  { id: 'poster-4', title: 'Sunscreen Day Campaign', img: '/images/posters/poster-4.jpeg', ratio: '960 / 1600' },
  { id: 'poster-5', title: 'Protector Solar Editorial Launch', img: '/images/posters/poster-5.jpeg', ratio: '1122 / 1402' },
];

export const STUDIO_SERVICES = [
  {
    id: 'short',
    title: 'Short Form Ads',
    text: 'Vertical ads engineered for Reels, Shorts, and TikTok, built around a visual hook in the first second.',
    stat: `${SHORT_ADS.length} vertical videos, 9:16`,
  },
  {
    id: 'ugc',
    title: 'UGC & Creator Ads',
    text: 'Direct-to-camera creator-style videos and AI talent campaigns tailored for paid social conversion.',
    stat: `${UGC_ADS.length} vertical videos, 9:16`,
  },
  {
    id: 'posters',
    title: 'Campaign Posters',
    text: 'Editorial posters and static social creatives designed to match the visual identity of your campaigns.',
    stat: `${STUDIO_POSTERS.length} campaign posters`,
  },
];

/* ------------------------------------------------------------------
   AI TALENT. Add a person here and she appears on /ai-talent.
   Photo goes in /public/images/site/ with the name given in `img`.
------------------------------------------------------------------- */
export type AiTalent = { slug: string; name: string; img: string };
export const AI_TALENT: AiTalent[] = [{ slug: 'maya-bennett', name: 'Maya Bennett', img: 'ai-maya-bennett.jpg' }];

