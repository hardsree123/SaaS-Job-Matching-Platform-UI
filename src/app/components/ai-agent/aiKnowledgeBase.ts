import { PlanDetail, QuickPrompt, ChatAction } from './types';

export const PLANS_DATA: Record<string, PlanDetail> = {
  starter: {
    key: 'starter',
    name: 'Starter Edition',
    tagline: 'Boutique agencies & single recruitment workspace',
    monthlyPrice: 299,
    annualPrice: 249,
    lifetimePrice: 2990,
    workspaces: '1 Workspace',
    seats: 'Up to 5 Seats',
    aiVolume: '1,500 AI Matches/mo',
    cvParsing: '300 CV parses/mo',
    badgeColor: 'bg-slate-800 text-slate-200 border-slate-700',
    highlights: [
      '1 Dedicated Branded Workspace',
      'Up to 5 Team Member Seats (RBAC)',
      'Kanban ATS Pipeline & Candidate Scorecards',
      '1,500 AI Semantic Candidate Matches/mo',
      'Automated Resume/CV Entity Parsing (300/mo)',
      'Custom Brand Logo, Colors & Typography',
      'Standard Email Notification Templates',
    ],
  },
  growth: {
    key: 'growth',
    name: 'Growth Edition',
    tagline: 'Scaling recruitment firms & regional niche boards',
    monthlyPrice: 699,
    annualPrice: 579,
    lifetimePrice: 6990,
    workspaces: '3 Workspaces',
    seats: 'Up to 15 Seats',
    aiVolume: '6,000 AI Matches/mo',
    cvParsing: '1,200 CV parses/mo',
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
    highlights: [
      '3 Dedicated Branded Workspaces',
      'Up to 15 Team Member Seats',
      'Custom Apex Domain Mapping + SSL',
      '6,000 AI Semantic Candidate Matches/mo',
      '1,200 Resume CV Parses/mo',
      'Bilingual Arabic RTL Layout Engine',
      'Stripe Connect Employer Subscriptions',
      'Priority Email & Slack Support',
    ],
  },
  pro: {
    key: 'pro',
    name: 'Pro Organization',
    tagline: 'Multi-brand agencies, staffing networks & job marketplaces',
    monthlyPrice: 1499,
    annualPrice: 1199,
    lifetimePrice: 14990,
    workspaces: '10 Workspaces',
    seats: 'Up to 50 Seats',
    aiVolume: '25,000 AI Matches/mo',
    cvParsing: '5,000 CV parses/mo',
    isPopular: true,
    badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-600/50',
    highlights: [
      '10 Dedicated Branded Workspaces',
      'Up to 50 Team Member Seats',
      '25,000 AI Semantic Candidate Matches/mo',
      '5,000 Resume CV Parses/mo',
      'Dedicated Isolated Database Shard',
      'Full Stripe Connect Direct Employer Payouts',
      'Custom White-Label Email & SMS Gateways',
      '99.9% Uptime SLA & Dedicated Account Manager',
    ],
  },
  enterprise: {
    key: 'enterprise',
    name: 'Enterprise / Source Code',
    tagline: 'Full source code ownership, on-premise & private VPC deployment',
    monthlyPrice: 3499,
    annualPrice: 2799,
    lifetimePrice: 34990,
    workspaces: 'Unlimited',
    seats: 'Unlimited Seats',
    aiVolume: 'Unlimited AI Matches',
    cvParsing: 'Unlimited CV parses',
    badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-600/50',
    highlights: [
      'Full Uncompiled TypeScript/React Frontend & Backend Source Code',
      'Perpetual Commercial Royalty-Free License',
      'Zero Revenue Cuts on Employer Transactions',
      'Self-Host on AWS, Azure, GCP, or On-Premise Kubernetes',
      'Docker Compose & Kubernetes Helm Charts Included',
      'Unlimited Workspaces, Seats & AI Matching Engine',
      'Dedicated Solutions Architect & Migration Support',
    ],
  },
};

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'qp-pricing',
    title: 'Compare Pricing Plans',
    iconName: 'DollarSign',
    prompt: 'Can you show me the pricing plans and licensing options for DibsMatch?',
    category: 'pricing',
  },
  {
    id: 'qp-matching',
    title: 'How AI Matching Works',
    iconName: 'Cpu',
    prompt: 'How does the AI semantic vector matching engine work in DibsMatch?',
    category: 'features',
  },
  {
    id: 'qp-whitelabel',
    title: 'White-Label & Domains',
    iconName: 'Palette',
    prompt: 'Can I white-label DibsMatch with my own brand, custom domain, and logo?',
    category: 'features',
  },
  {
    id: 'qp-demo',
    title: 'Explore Live Demo',
    iconName: 'Compass',
    prompt: 'Where can I test the candidate portal and recruiter ATS demo live?',
    category: 'demo',
  },
  {
    id: 'qp-source-code',
    title: 'Full Source Code & Self-Hosting',
    iconName: 'Code2',
    prompt: 'What is included in the Enterprise Source Code license for self-hosting?',
    category: 'tech',
  },
  {
    id: 'qp-compliance',
    title: 'MENA & GDPR Compliance',
    iconName: 'ShieldCheck',
    prompt: 'Is DibsMatch compliant with GDPR and MENA data privacy laws like UAE/Saudi PDPL?',
    category: 'tech',
  },
  {
    id: 'qp-quote',
    title: 'Request a Quote / Demo',
    iconName: 'Sparkles',
    prompt: 'I would like to speak with your sales team and get a custom quote for our organization.',
    category: 'sales',
  },
];

interface KnowledgeTopic {
  keywords: string[];
  intents: string[];
  response: string;
  actions?: ChatAction[];
  showPlanCards?: boolean;
  showLeadForm?: boolean;
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  // 1. Pricing & Licensing
  {
    keywords: [
      'price', 'pricing', 'cost', 'plan', 'plans', 'subscription', 'starter', 'growth', 'pro', 'enterprise',
      'tier', 'fee', 'charge', 'rate', 'how much', 'license', 'licensing', 'buy', 'purchase'
    ],
    intents: ['pricing_query', 'plan_comparison'],
    response: `### 💳 DibsMatch Commercial Licensing & Pricing Tiers

DibsMatch offers 4 transparent licensing tiers tailored for recruitment agencies, job marketplace founders, and enterprise staffing firms. **Annual billing includes a 20% discount**, and lifetime licenses with perpetual usage rights are also available!

1. **Starter ($299/mo or $249/mo billed annually | $2,990 Lifetime)**:
   - 1 Branded Workspace, 5 Recruiter Seats
   - 1,500 AI Matches & 300 CV Parses/month
   - Kanban ATS Pipeline & Candidate Scorecards

2. **Growth ($699/mo or $579/mo billed annually | $6,990 Lifetime)**:
   - 3 Workspaces, 15 Seats
   - Custom Apex Domain Mapping with Automated SSL
   - 6,000 AI Matches & 1,200 CV Parses/month
   - Bilingual Arabic RTL Layout Support

3. **Pro ($1,499/mo or $1,199/mo billed annually | $14,990 Lifetime)** *(Most Popular)*:
   - 10 Workspaces, 50 Seats
   - 25,000 AI Matches & 5,000 CV Parses/month
   - Dedicated Database Shard + Stripe Connect Direct Monetization
   - Custom Email/SMS Gateway Integration

4. **Enterprise / Full Source Code ($3,499/mo or $2,799/mo billed annually | $34,990 Perpetual Source Code)**:
   - **Full uncompiled TypeScript/React Frontend & Backend Source Code**
   - Unlimited Workspaces & Recruiter Seats
   - 100% Perpetual Commercial Ownership, Zero Revenue Cuts
   - Docker & Kubernetes Helm Charts for self-hosting on AWS/Azure/GCP/On-Premise

*Would you like to review an interactive plan comparison or request a custom deployment quote?*`,
    showPlanCards: true,
    actions: [
      { label: '🚀 Request Custom Quote', actionType: 'lead_form', icon: 'Sparkles' },
      { label: '🧭 Test Live Demo', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
    ],
  },

  // 2. AI Semantic Matching Engine
  {
    keywords: [
      'ai', 'matching', 'match engine', 'vector', 'semantic', 'algorithm', 'score', 'percentage',
      'skill graph', 'nlp', 'embeddings', 'how matching works', 'accuracy', 'cv match', 'job match'
    ],
    intents: ['ai_matching_query'],
    response: `### 🎯 DibsMatch AI Semantic Vector Matching Engine

DibsMatch replaces legacy keyword lookups with a high-dimensional **bi-directional semantic vector engine**:

- **Skill Graph Alignment**: Automatically maps candidate CV entities (skills, experience, seniority, certifications, salary expectations) directly to job requisitions.
- **Context-Aware Scoring**: Understands synonyms and related technologies (e.g. matching *PostgreSQL* with *Relational Databases* or *React* with *Next.js* even if the exact keyword differs).
- **Match Percentage Badges**: Both candidates and recruiters see real-time match confidence scores (e.g. **94% Match**) with itemized breakdown of matching vs missing requirements.
- **Automated Resume/CV Parsing**: Extracts work history, education, domain expertise, and contact metadata into structured JSON in under 3 seconds.

You can test this right now in our live candidate job discovery sandbox!`,
    actions: [
      { label: '🔍 Test Job Match Discovery', actionType: 'navigate', payload: '/candidate/jobs', icon: 'Cpu' },
      { label: '👥 Search Candidates ATS', actionType: 'navigate', payload: '/recruiter/candidates', icon: 'Users' },
    ],
  },

  // 3. White-Labeling & Multi-Tenant Branding
  {
    keywords: [
      'white label', 'whitelabel', 'brand', 'branding', 'custom domain', 'logo', 'theme', 'color',
      'colors', 'rebrand', 'subdomain', 'apex domain', 'cname', 'css', 'tenant', 'multi-tenant', 'workspace'
    ],
    intents: ['whitelabel_query'],
    response: `### 🎨 100% Turnkey White-Label Architecture

DibsMatch gives you total brand independence so your clients and candidates see exclusively **your brand**:

- **Custom Apex & Subdomains**: Connect your own domains (e.g., \`careers.youragency.com\` or \`jobs.yourdomain.io\`) with automated Let's Encrypt SSL.
- **Dynamic Theming & Palettes**: Live CSS variable switching allows you to customize primary, secondary, and accent brand colors in real time.
- **Logo & Asset Isolation**: Upload custom logos, favicons, typography (Inter, Outfit, Roboto), and localized transactional email templates.
- **Multi-Workspace Isolation**: Agency admins can manage independent, isolated client workspaces under a single master admin dashboard.

Check out our interactive White-Label Simulator on the homepage to see it in action!`,
    actions: [
      { label: '🎨 Try White-Label Simulator', actionType: 'navigate', payload: '/#whitelabel', icon: 'Palette' },
      { label: '💼 View Pricing Tiers', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
    ],
  },

  // 4. Recruiter ATS & Kanban Pipeline
  {
    keywords: [
      'recruiter', 'ats', 'kanban', 'pipeline', 'stages', 'hiring pipeline', 'candidate search',
      'post job', 'requisition', 'scorecard', 'interview', 'drag and drop', 'recruiter portal'
    ],
    intents: ['recruiter_ats_query'],
    response: `### 📊 Recruiter ATS & Interactive Kanban Suite

The recruiter workspace is engineered for rapid talent acquisition and agency workflows:

- **Interactive Kanban Pipeline**: Drag-and-drop candidates across stage gates: *Sourced → Applied → Shortlisted → Interview → Hired*.
- **Deep Candidate Search**: Multi-facet filters for seniority, location (Dubai, Riyadh, Remote, etc.), salary range, skills, and AI match threshold.
- **Rich Candidate Dossiers**: View verified skills, CV highlights, contact links, interview notes, and team scorecards.
- **Job Requisition Builder**: Create structured job postings with skill requirements, compensation benchmarks, and publishing controls.

Experience the recruiter ATS directly in our sandbox:`,
    actions: [
      { label: '📊 Open Recruiter Dashboard', actionType: 'navigate', payload: '/recruiter/dashboard', icon: 'BarChart3' },
      { label: '🗂️ View Kanban Pipeline', actionType: 'navigate', payload: '/recruiter/pipeline', icon: 'Sliders' },
      { label: '➕ Test Post a Job', actionType: 'navigate', payload: '/recruiter/post-job', icon: 'PlusCircle' },
    ],
  },

  // 5. Candidate Experience & Portal
  {
    keywords: [
      'candidate', 'job seeker', 'applicant', 'candidate portal', 'candidate dashboard', 'apply',
      'applications', 'tracker', 'profile', 'cv upload', 'onboarding'
    ],
    intents: ['candidate_portal_query'],
    response: `### 👤 Frictionless Candidate Experience

The candidate portal is designed to maximize completion rates and applicant engagement:

- **Streamlined Onboarding**: 3-step setup with CV auto-parsing to build a rich talent profile in minutes.
- **Smart Job Discovery**: Browse open positions ranked by real-time AI Match Percentage.
- **1-Click Quick Apply**: Instant application submission with personalized cover notes.
- **Real-Time Application Tracker**: Track progress across hiring stages with status badges (*Under Review*, *Shortlisted*, *Interview Scheduled*).
- **Recruiter Interest Feed**: Direct notifications when verified employers view or bookmark candidate profiles.`,
    actions: [
      { label: '👤 Open Candidate Dashboard', actionType: 'navigate', payload: '/candidate/dashboard', icon: 'Users' },
      { label: '🚀 Try Candidate Onboarding', actionType: 'navigate', payload: '/candidate/onboarding', icon: 'ArrowRight' },
    ],
  },

  // 6. Source Code, Self-Hosting & Tech Stack
  {
    keywords: [
      'source code', 'code', 'github', 'git', 'self host', 'self-host', 'on-premise', 'kubernetes',
      'docker', 'aws', 'azure', 'gcp', 'tech stack', 'typescript', 'react', 'tailwind', 'backend', 'api'
    ],
    intents: ['source_code_query'],
    response: `### 💻 Enterprise Source Code & Technology Stack

With our **Enterprise License ($34,990 Perpetual / $2,799/mo)**, you receive 100% uncompiled source code with perpetual commercial rights:

- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI primitives, React Router v7, TanStack Query, Framer Motion animations.
- **Backend & Cloud**: REST / GraphQL endpoints, PostgreSQL schema with vector extension (\`pgvector\`), Stripe Connect billing engine.
- **DevOps Ready**: Pre-built Docker Compose configurations, Kubernetes Helm charts, and CI/CD deployment pipelines for AWS, Azure, GCP, or private VPCs.
- **Zero Royalties**: 100% of your platform revenues belong to you. Zero per-placement or subscription royalties.

Would you like our engineering architecture documentation or a technical deep-dive with our solutions architect?`,
    actions: [
      { label: '📄 Request Technical Dossier', actionType: 'lead_form', icon: 'Code2' },
      { label: '⚡ Review Enterprise Plan', actionType: 'open_modal', payload: 'enterprise', icon: 'Sparkles' },
    ],
  },

  // 7. Monetization & Stripe Connect
  {
    keywords: [
      'monetization', 'stripe', 'stripe connect', 'billing', 'revenue', 'mrr', 'arr', 'charge employers',
      'subscription', 'job credits', 'payout', 'make money', 'roi', 'calculator'
    ],
    intents: ['monetization_query'],
    response: `### 💰 Multi-Stream Monetization Engine

DibsMatch includes built-in business models so you can monetize employers from Day 1:

1. **Recruiter Seat Subscriptions**: Charge staffing agencies and employers recurring monthly access fees (e.g. $99–$299/seat/mo).
2. **Pay-Per-Post Job Credits**: Sell single job listings or bulk packages (e.g. $49–$199/post).
3. **Candidate Profile Unlock Passes**: Charge fees for revealing verified contact details and direct outreach credits.
4. **Featured Job & Highlight Upsells**: Premium listing placements with 3x visibility badges on the job feed.

*Use our interactive ROI Calculator on the homepage to simulate your monthly recurring revenue (MRR)!*`,
    actions: [
      { label: '📈 Launch ROI Calculator', actionType: 'navigate', payload: '/#roi-calculator', icon: 'TrendingUp' },
      { label: '💳 View License Options', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
    ],
  },

  // 8. MENA & Global Compliance (GDPR, UAE / KSA PDPL, Arabic)
  {
    keywords: [
      'compliance', 'gdpr', 'mena', 'uae', 'saudi', 'ksa', 'pdpl', 'privacy', 'security',
      'arabic', 'rtl', 'gcc', 'middle east', 'data protection', 'encryption'
    ],
    intents: ['compliance_query'],
    response: `### 🛡️ Global & MENA Compliance Architecture

DibsMatch is purpose-built for global deployment with localized compliance for the GCC and European markets:

- **Data Privacy Regulations**: Fully compliant with **EU GDPR**, **UAE Personal Data Protection Law (PDPL)**, and **Saudi Arabian PDPL**.
- **Data Isolation & Encryption**: End-to-end AES-256 encryption at rest, TLS 1.3 in transit, with role-based access control (RBAC).
- **Bilingual Arabic RTL Support**: Complete Right-to-Left layout compatibility and bilingual content rendering for MENA job boards.
- **Multi-Currency Support**: Native handling for USD ($), AED (د.إ), SAR (﷼), EUR (€), and GBP (£).`,
    actions: [
      { label: '🛡️ Contact Security Team', actionType: 'lead_form', icon: 'ShieldCheck' },
      { label: '🧭 Explore All Demos', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
    ],
  },

  // 9. Demo Hub & Overview
  {
    keywords: [
      'demo', 'sandbox', 'test', 'try', 'preview', 'experience', 'walkthrough', 'all pages',
      'routes', 'overview', 'features list'
    ],
    intents: ['demo_query'],
    response: `### 🧭 DibsMatch Live Demo Directory

You can explore all interactive modules of DibsMatch right inside our live sandbox:

1. **SaaS License Landing Page** (\`/\`): Commercial overview, ROI calculator, and white-label simulator.
2. **Demo Hub Directory** (\`/demo\`): Complete catalog of all 11+ application routes and components.
3. **Candidate Portal** (\`/candidate/dashboard\`): AI job matching, application tracking, and profile editor.
4. **Recruiter ATS Workspace** (\`/recruiter/dashboard\`): Candidate search, Kanban pipeline, and job post creator.
5. **Consumer Job Board** (\`/demo/client-portal\`): Public applicant-facing marketplace view.`,
    actions: [
      { label: '🚀 Go to Demo Hub', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
      { label: '👤 Candidate Portal', actionType: 'navigate', payload: '/candidate/dashboard', icon: 'Users' },
      { label: '📊 Recruiter ATS', actionType: 'navigate', payload: '/recruiter/dashboard', icon: 'BarChart3' },
    ],
  },

  // 10. Sales, Lead Ingestion, Quotes, Talk to Human
  {
    keywords: [
      'sales', 'talk to sales', 'quote', 'custom quote', 'book demo', 'schedule demo', 'contact',
      'call', 'human', 'representative', 'agent', 'enterprise quote', 'consultant', 'meeting', 'phone'
    ],
    intents: ['sales_contact_query'],
    response: `### 🤝 Connect with DibsMatch Solutions & Sales

We'd love to learn about your recruitment project, hiring goals, or agency expansion plans! Our senior solutions team can provide:

- **Custom Live Platform Walkthrough** tailored to your agency or enterprise requirements.
- **White-Label Branding Consultation & Architecture Review**.
- **Tailored Enterprise & Multi-Year Licensing Quotes**.
- **Instant Deployment & Setup Guidance**.

Please provide your contact details below, and our team will get in touch with you shortly:`,
    showLeadForm: true,
    actions: [
      { label: '📝 Fill Lead Dossier', actionType: 'lead_form', icon: 'Sparkles' },
      { label: '💳 View Pricing Plans', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
    ],
  },
];

export const GUARDRAIL_FALLBACK_RESPONSE = `### 🤖 DibsMatch AI Solutions Advisor

I am specifically specialized in answering queries regarding the **DibsMatch AI Job Matching & Multi-Tenant ATS SaaS Platform**.

I can assist you with:
- 💡 **AI Match Engine & Features**: Vector embeddings, candidate CV parsing, ATS Kanban pipeline, dual portals.
- 💳 **Commercial Licensing & Pricing**: Starter, Growth, Pro, and Enterprise Source Code tiers.
- 🎨 **White-Labeling & Multi-Tenant**: Custom domains, brand palettes, and tenant isolation.
- 💰 **Monetization & ROI**: Stripe Connect subscriptions, job credits, and revenue calculations.
- 🛡️ **Security & Compliance**: GDPR, UAE/KSA PDPL, and Arabic RTL localization.
- 🚀 **Live Demos & Quotes**: Direct access to sandbox pages and custom sales quotations.

*How can I help you evaluate or deploy DibsMatch today?*`;

/**
 * Intelligent domain query matcher with fuzzy keyword scoring and strict domain boundaries
 */
export function matchUserQuery(query: string): {
  response: string;
  actions?: ChatAction[];
  showPlanCards?: boolean;
  showLeadForm?: boolean;
  matchedIntent?: string;
  isOffTopic?: boolean;
} {
  const cleanQuery = query.toLowerCase().trim();

  // 1. Direct Greetings
  if (/^(hi|hello|hey|greetings|good\s(morning|afternoon|evening)|hola|assalamu\salaykum)/i.test(cleanQuery) && cleanQuery.split(' ').length <= 4) {
    return {
      response: `👋 Hello! Welcome to **DibsMatch AI Sales & Solutions Advisor**! 

I'm here to help you explore our white-label AI Job Matching and ATS Platform. Whether you're looking for pricing plans, technical architecture details, live demo walkthroughs, or a custom quote, I'm at your service.

What would you like to explore first?`,
      actions: [
        { label: '💳 Compare Pricing', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
        { label: '🎯 How Matching Works', actionType: 'navigate', payload: '/demo', icon: 'Cpu' },
        { label: '🚀 Schedule a Demo', actionType: 'lead_form', icon: 'Sparkles' },
      ],
    };
  }

  // 2. Off-Topic Query Detection (Strict Guardrail)
  // Check for general knowledge, coding assistance unrelated to DibsMatch, creative writing, etc.
  const offTopicTriggers = [
    /\b(write|generate)\s+(a\s+)?(poem|story|song|essay|joke|recipe|script\s+for\s+python|code\s+for\s+bubble\s+sort)\b/i,
    /\b(who\s+won|president\s+of|capital\s+of|weather\s+in|recipe|diet|movie|crypto\s+price|bitcoin\s+price)\b/i,
    /\b(solve\s+this\s+equation|calculate\s+\d+\s*[\+\-\*\/]\s*\d+)\b/i,
    /\b(tell\s+me\s+a\s+joke|what\s+is\s+the\s+meaning\s+of\s+life)\b/i,
    /\b(translate\s+this\s+to\s+french|german\s+grammar)\b/i,
  ];

  const isExplicitOffTopic = offTopicTriggers.some((pattern) => pattern.test(cleanQuery));

  if (isExplicitOffTopic) {
    return {
      response: GUARDRAIL_FALLBACK_RESPONSE,
      isOffTopic: true,
      actions: [
        { label: '💳 View Pricing Plans', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
        { label: '🧭 Explore Live Demo', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
        { label: '🚀 Request Custom Quote', actionType: 'lead_form', icon: 'Sparkles' },
      ],
    };
  }

  // 3. Keyword Scoring across KNOWLEDGE_TOPICS
  let bestTopic: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (cleanQuery.includes(keyword)) {
        score += keyword.length > 5 ? 3 : 2;
        // Exact word match bonus
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(cleanQuery)) {
          score += 3;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  // If score meets confidence threshold, return matched topic
  if (bestTopic && highestScore >= 2) {
    return {
      response: bestTopic.response,
      actions: bestTopic.actions,
      showPlanCards: bestTopic.showPlanCards,
      showLeadForm: bestTopic.showLeadForm,
      matchedIntent: bestTopic.intents[0],
    };
  }

  // Check if query is about the product in general
  if (
    cleanQuery.includes('what is dibsmatch') ||
    cleanQuery.includes('what does it do') ||
    cleanQuery.includes('overview') ||
    cleanQuery.includes('about') ||
    cleanQuery.includes('features') ||
    cleanQuery.includes('product')
  ) {
    return {
      response: `### 🌟 Welcome to DibsMatch SaaS Platform

**DibsMatch** is a turnkey, multi-tenant **AI Job Matching & ATS SaaS Platform** built for recruitment agencies, job board entrepreneurs, and enterprise staffing networks.

#### Key Capabilities:
- **Bi-Directional Vector Match Engine**: Instantly matches candidate CV profiles to job requirements with contextual precision.
- **Dual Turnkey Workspaces**: Dedicated candidate self-service portal + Recruiter ATS with drag-and-drop Kanban pipeline.
- **100% White-Label Isolation**: Run the platform under your own brand, custom domain, logo, and color scheme.
- **Stripe Connect Monetization**: Bill employers via subscriptions, job posting packages, and candidate unlock passes.
- **Source Code or Cloud**: Available as a managed cloud license or perpetual uncompiled source code for private Kubernetes/AWS hosting.`,
      actions: [
        { label: '💳 View Pricing Tiers', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
        { label: '🧭 Open Demo Hub', actionType: 'navigate', payload: '/demo', icon: 'Compass' },
        { label: '📝 Request Instant Quote', actionType: 'lead_form', icon: 'Sparkles' },
      ],
    };
  }

  // Polite domain fallback
  return {
    response: `Thank you for your question! As the **DibsMatch AI Sales & Solutions Advisor**, I can assist you with all aspects of our AI Job Matching Platform, ATS software, pricing tiers, and white-label deployment.

Would you like to explore our pricing plans, examine the AI matching architecture, or test the live sandbox?`,
    actions: [
      { label: '💳 Compare Pricing Plans', actionType: 'open_modal', payload: 'pro', icon: 'DollarSign' },
      { label: '🎯 How Matching Works', actionType: 'navigate', payload: '/demo', icon: 'Cpu' },
      { label: '🚀 Request Custom Quote', actionType: 'lead_form', icon: 'Sparkles' },
    ],
  };
}
