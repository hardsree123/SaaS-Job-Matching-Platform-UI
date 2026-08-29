import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  Cpu,
  Palette,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle,
  Building2,
  Lock,
  Code2,
  TrendingUp,
  Layers,
  ChevronRight,
  Star,
  PlusCircle,
  BarChart3,
  ExternalLink,
  Laptop,
  Check,
  Server,
  Workflow,
  HelpCircle,
  Compass,
  Menu,
  X,
} from 'lucide-react';
import { LicensePurchaseModal, PlanKey } from '../components/ui/LicensePurchaseModal';

export default function SaaSLicenseLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>('pro');

  // Interactive White-Label Simulator state
  const [tenantName, setTenantName] = useState('GulfTalent Pro');
  const [tenantDomain, setTenantDomain] = useState('careers.gulftalent.io');
  const [themeColor, setThemeColor] = useState<'blue' | 'emerald' | 'violet' | 'amber'>('blue');

  // ROI Calculator state
  const [recruiterSeats, setRecruiterSeats] = useState(25);
  const [monthlyFeePerSeat, setMonthlyFeePerSeat] = useState(99);
  const [jobPostsPerMonth, setJobPostsPerMonth] = useState(80);
  const [pricePerJobPost, setPricePerJobPost] = useState(49);

  const calculatedMRR = recruiterSeats * monthlyFeePerSeat + jobPostsPerMonth * pricePerJobPost;
  const calculatedARR = calculatedMRR * 12;

  const colorThemes = {
    blue: {
      label: 'Ocean Blue (Default)',
      gradient: 'from-blue-600 to-teal-500',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      accentColor: '#2563eb',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
    },
    emerald: {
      label: 'Emerald Growth',
      gradient: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentColor: '#059669',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
    },
    violet: {
      label: 'Cyber Violet',
      gradient: 'from-violet-600 to-indigo-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      accentColor: '#7c3aed',
      buttonBg: 'bg-violet-600 hover:bg-violet-700',
    },
    amber: {
      label: 'Sunset Amber',
      gradient: 'from-amber-600 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      accentColor: '#d97706',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
    },
  };

  const handleOpenModal = (plan: PlanKey) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const platformFeatures = [
    {
      icon: Cpu,
      title: 'Semantic Vector Match Engine',
      description:
        'Bi-directional skill graph matching aligning candidate CV vectors with job requisitions, seniority benchmarks, and compensation expectations.',
      badge: 'AI Engine',
    },
    {
      icon: Users,
      title: 'Dual Portals: Candidate & Recruiter ATS',
      description:
        'Dedicated end-to-end workspaces: Candidate self-service profiles & job matching + Recruiter ATS, candidate search & stage-gated pipelines.',
      badge: 'Turnkey UX',
    },
    {
      icon: Palette,
      title: 'Multi-Tenant White-Labeling',
      description:
        'Tenant-level brand isolation: Custom apex domains/subdomains, corporate palettes, logo assets, automated transactional emails, and custom CSS variables.',
      badge: 'Brand Freedom',
    },
    {
      icon: DollarSign,
      title: 'Stripe Connect Monetization Engine',
      description:
        'Automated employer billing: Monthly recruiter seat subscriptions, pay-per-post job credits, candidate profile unlock passes, and featured job upsells.',
      badge: 'Revenue Ready',
    },
    {
      icon: Sliders,
      title: 'Interactive ATS Kanban Pipeline',
      description:
        'Drag-and-drop applicant tracking across Sourced, Applied, Shortlisted, Interview, and Hired workflow stages with interview notes and scorecards.',
      badge: 'ATS Suite',
    },
    {
      icon: Globe,
      title: 'MENA & Global Compliance Ready',
      description:
        'Built for GCC & global scale with bilingual Arabic RTL layout support, multi-currency pricing (USD, AED, SAR, EUR), and UAE/KSA PDPL & GDPR data protection.',
      badge: 'Global Scale',
    },
  ];

  const demoPillars = [
    {
      role: 'Candidate Portal Experience',
      badge: 'Job Seeker Portal',
      description: 'Test the applicant journey: Instant profile creation, smart job discovery, match percentage insights, and application tracker.',
      link: '/candidate/dashboard',
      action: 'Launch Candidate Demo',
      color: 'from-blue-600 to-cyan-600',
      features: ['AI Match Percentage Badges', '1-Click Applications', 'Recruiter Inquiries Feed', 'Responsive Profile Editor'],
    },
    {
      role: 'Recruiter ATS & Talent Suite',
      badge: 'Employer & Agency ATS',
      description: 'Experience hiring workflows: Advanced candidate filters, interactive Kanban pipeline, job requisition creator, and direct messaging.',
      link: '/recruiter/dashboard',
      action: 'Launch Recruiter Demo',
      color: 'from-indigo-600 to-purple-600',
      features: ['Drag & Drop Kanban Pipeline', 'Talent Search Filters', 'Job Requisition Creator', 'Candidate CV Dossiers'],
    },
    {
      role: 'Full Interactive Demo Hub',
      badge: 'Sandbox Directory',
      description: 'Explore every single view, component, flow, and layout across the entire dual-portal platform in a unified sandbox directory.',
      link: '/demo',
      action: 'Explore Demo Directory',
      color: 'from-slate-800 to-slate-900',
      features: ['All 11+ App Routes', 'Consumer Marketing Page', 'Design System Overview', 'Workflow Walkthroughs'],
    },
  ];

  const faqs = [
    {
      q: 'What do I receive when I purchase a TalentMatch tenant license?',
      a: 'Depending on your tier, you receive either an instantly provisioned multi-tenant cloud environment with custom domain mapping, automated SSL, and tenant administration, or the full uncompiled TypeScript/React frontend & backend source code with perpetual commercial rights to self-host anywhere.',
    },
    {
      q: 'Can I rebrand the application with my agency or company logo and colors?',
      a: 'Yes! TalentMatch is built with 100% white-label architecture. You can customize the platform name, logo, typography, color palette, custom domain (e.g. jobs.yourcompany.com), transactional email templates, and employer checkout branding.',
    },
    {
      q: 'Can I host this on my own AWS, Azure, GCP, or private VPC infrastructure?',
      a: 'With the Enterprise / Source Code License, you receive full containerized Docker configurations, Helm charts, and CI/CD pipelines to deploy the platform on your own private cloud or on-premise Kubernetes cluster with zero vendor lock-in.',
    },
    {
      q: 'Are there any recurring royalties or per-hire transaction cuts?',
      a: 'None whatsoever. 100% of the revenue generated from your employer subscriptions, job posting packages, or candidate placements goes directly to your Stripe account.',
    },
    {
      q: 'How does the AI smart matching engine work?',
      a: 'The matching engine uses vector-based semantic scoring and skill taxonomy mapping to evaluate candidate skill sets, experience seniority, industry tags, and salary requirements against job requisition criteria in real time.',
    },
    {
      q: 'How is data privacy and compliance handled for different regions (e.g. GCC / EU)?',
      a: 'The platform is architected with strict tenant data isolation, encrypted candidate PII storage, consent tracking, and localized compliance support for GDPR, UAE Personal Data Protection Law (PDPL), and Saudi Arabian PDPL.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white text-xs py-2 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">New Release</span>
            <span className="font-medium text-slate-200">
              TalentMatch SaaS Edition: Multi-tenant White-Label Licensing Now Available for Q3 2026.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <Link to="/demo" className="text-yellow-300 hover:text-yellow-200 flex items-center gap-1">
              <span>Test Live Demo Sandbox</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4 sm:gap-6 lg:gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-teal-400 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-blue-500/20">
                TM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-white">TalentMatch</span>
                  <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    SaaS Platform
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block -mt-0.5">White-Label Job Matching Solution</span>
              </div>
            </div>

            {/* Desktop Navigation Links - with generous padding & spacing */}
            <div className="hidden xl:flex items-center gap-6 2xl:gap-8 text-sm font-medium text-slate-300 mx-auto px-4">
              <a href="#features" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                Features
              </a>
              <a href="#whitelabel" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                White-Labeling
              </a>
              <a href="#demo" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                Live Demo
              </a>
              <a href="#roi-calculator" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                ROI Calculator
              </a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                Licensing & Pricing
              </a>
              <a href="#faq" className="hover:text-blue-400 transition-colors px-2 py-1 rounded-md hover:bg-slate-900/60">
                FAQ
              </a>
            </div>

            {/* Action Buttons - protected with flex-shrink-0 */}
            <div className="flex items-center gap-3 flex-shrink-0 pl-2">
              <Button
                asChild
                variant="outline"
                className="border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold gap-1.5 shadow-sm"
              >
                <Link to="/demo">
                  <Compass className="w-4 h-4 text-blue-400" />
                  <span>View Live Demo</span>
                </Link>
              </Button>

              <Button
                onClick={() => handleOpenModal('growth')}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 px-4 sm:px-5"
              >
                <span>Get Tenant License</span>
                <ArrowRight className="w-4 h-4 ml-1 hidden sm:inline" />
              </Button>

              {/* Mobile / Tablet Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Small Screen Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#whitelabel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              White-Labeling
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              Live Demo
            </a>
            <a
              href="#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              ROI Calculator
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              Licensing & Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-blue-400 transition-colors"
            >
              FAQ
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-teal-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Turnkey Multi-Tenant Job Marketplace & ATS Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Launch Your Own <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                AI Job Matching SaaS
              </span>{' '}
              in Days, Not Months.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive, production-ready white-label hiring platform. Complete with AI skill matching, dual candidate & recruiter portals, Kanban applicant tracking, and automated monetization.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-base px-8 py-6 rounded-xl shadow-xl shadow-blue-600/30 gap-2 transition-all hover:scale-[1.02]"
              >
                <Link to="/demo">
                  <Compass className="w-5 h-5" />
                  Explore Live Interactive Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => handleOpenModal('growth')}
                className="w-full sm:w-auto border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base px-8 py-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Purchase Tenant License
              </Button>
            </div>

            {/* Quick Demo Links Pills */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span>Quick Demo Shortcuts:</span>
              <Link
                to="/candidate/dashboard"
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-300 transition-colors flex items-center gap-1.5"
              >
                <Users className="w-3 h-3 text-blue-400" />
                <span>Candidate Portal</span>
              </Link>
              <Link
                to="/recruiter/dashboard"
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-3 h-3 text-indigo-400" />
                <span>Recruiter ATS</span>
              </Link>
              <Link
                to="/recruiter/pipeline"
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-teal-500 hover:text-teal-300 transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3 h-3 text-teal-400" />
                <span>Kanban Pipeline</span>
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% White-Label Branded</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Per-Placement Royalties</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Full Source Code Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Docker & Cloud Deploy Ready</span>
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Showcase */}
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-3 sm:p-4 shadow-2xl shadow-blue-500/10">
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="bg-slate-950 px-4 py-1 rounded-md text-[11px] font-mono border border-slate-800 text-slate-300 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>https://jobs.yourcustomdomain.com/app</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px]">
                    Live Sandbox
                  </Badge>
                </div>
              </div>

              {/* Preview Content Grid */}
              <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Sidebar Mock */}
                <div className="hidden lg:block lg:col-span-3 bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                      TM
                    </div>
                    <span className="font-bold text-white text-sm">Tenant Portal</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-blue-600/20 text-blue-400 font-semibold">
                      <BarChart3 className="w-4 h-4" />
                      <span>Pipeline Overview</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Users className="w-4 h-4" />
                      <span>Candidate Database</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Briefcase className="w-4 h-4" />
                      <span>Active Requisitions</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <DollarSign className="w-4 h-4" />
                      <span>Tenant Billing</span>
                    </div>
                  </div>
                </div>

                {/* Main Showcase Panel */}
                <div className="lg:col-span-9 bg-slate-950/90 rounded-xl p-4 sm:p-6 border border-slate-800/80 space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-xs">Active Candidates</div>
                      <div className="text-xl font-bold text-white mt-1">12,480+</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">↑ 24% this month</div>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-xs">Recruiter Accounts</div>
                      <div className="text-xl font-bold text-white mt-1">450+</div>
                      <div className="text-[10px] text-blue-400 mt-0.5">SaaS Subscriptions</div>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-xs">AI Match Rate</div>
                      <div className="text-xl font-bold text-white mt-1">94.8%</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">High Precision</div>
                    </div>
                    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-xs">Avg. Time to Shortlist</div>
                      <div className="text-xl font-bold text-white mt-1">48 Hrs</div>
                      <div className="text-[10px] text-purple-400 mt-0.5">Automated Sourcing</div>
                    </div>
                  </div>

                  {/* Sample Interactive Kanban / Match Card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300">Live AI Match Stream (Sample Requisition):</span>
                      <Link to="/recruiter/pipeline" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
                        <span>Open Kanban Pipeline</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Candidate 1 */}
                      <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                              AH
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">Ahmed Hassan</div>
                              <div className="text-xs text-slate-400">Senior React / Full-Stack Engineer</div>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                            96% Match
                          </Badge>
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">React.js</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">TypeScript</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">Node.js</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">Dubai, UAE</span>
                        </div>
                      </div>

                      {/* Candidate 2 */}
                      <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl hover:border-indigo-500/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                              SJ
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">Sara Johnson</div>
                              <div className="text-xs text-slate-400">Principal Product Manager</div>
                            </div>
                          </div>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                            92% Match
                          </Badge>
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">SaaS Scaling</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">Agile/Scrum</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">Fintech</span>
                          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded">Riyadh, KSA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive White-Label Rebranding Playground */}
      <section id="whitelabel" className="py-20 bg-slate-900/60 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-3">
              100% White-Label Freedom
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Try the Interactive Tenant Rebranding Simulator
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              See how your company name, custom domain, and theme colors instantly transform the entire platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Customizer Controls */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-400" />
                Tenant Brand Configuration
              </h3>

              {/* Brand Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Brand / Agency Name</label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Apex Talent Hub"
                />
              </div>

              {/* Custom Domain */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Custom Tenant Domain</label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={tenantDomain}
                    onChange={(e) => setTenantDomain(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g. jobs.mybrand.com"
                  />
                </div>
              </div>

              {/* Theme Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Primary Brand Palette</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(colorThemes) as Array<keyof typeof colorThemes>).map((key) => {
                    const t = colorThemes[key];
                    const isSelected = themeColor === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setThemeColor(key)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 text-white font-semibold ring-1 ring-blue-500'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: t.accentColor }}
                        />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Multi-tenant Isolation:</span>
                <span className="text-emerald-400 font-semibold">Enabled (Private DB Schema)</span>
              </div>
            </div>

            {/* Live Rebranded Output View */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="text-xs font-mono text-slate-500 mb-4 flex items-center justify-between">
                <span>PREVIEW: Live Client-Facing Portal</span>
                <span className="text-blue-400">Custom Domain: https://{tenantDomain || 'careers.yourbrand.io'}</span>
              </div>

              {/* Rebranded Mock Header */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colorThemes[themeColor].gradient} flex items-center justify-center text-white font-black text-sm shadow-md`}
                  >
                    {(tenantName || 'TM').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white text-base leading-tight">
                      {tenantName || 'Your Brand Name'}
                    </div>
                    <div className="text-[10px] text-slate-400">Powered by TalentMatch Engine</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white">
                    Sign In
                  </button>
                  <button
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-md transition-all ${colorThemes[themeColor].buttonBg}`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Rebranded Card Preview */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Featured Role</span>
                    <h4 className="text-lg font-bold text-white mt-0.5">Head of AI Engineering</h4>
                    <p className="text-xs text-slate-400">Dubai, UAE (Hybrid) • $140,000 - $180,000 / yr</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${colorThemes[themeColor].badgeBg}`}
                  >
                    98% Match Score
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">PyTorch</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">LLM Fine-Tuning</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">Distributed Training</span>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>3 Candidates currently in final interview stage</span>
                  <button
                    className={`font-semibold underline ${colorThemes[themeColor].buttonBg.split(' ')[0]} bg-transparent text-blue-400 hover:text-blue-300`}
                  >
                    Manage Requisition &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Modules & Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-3">
            Full-Stack Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Everything Required to Run a High-Volume Hiring Marketplace
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Built from the ground up for recruitment agencies, job boards, and enterprise talent pools looking for a turnkey, scalable solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platformFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge className="bg-slate-800 text-slate-300 text-[11px] font-semibold border-slate-700">
                      {feat.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs text-blue-400 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-400" />
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Demo Showcase Section */}
      <section id="demo" className="py-20 bg-slate-900/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-3">
              Interactive Live Demo Sandbox
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Test Drive Every View & Workflow
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Explore the live application directly in your browser. Switch roles between job candidate and corporate recruiter with zero setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {demoPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {pillar.badge}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{pillar.role}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">{pillar.description}</p>

                  <div className="space-y-2 mb-8 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-300 mb-1">What You Can Test:</div>
                    {pillar.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  className={`w-full text-white font-bold py-5 rounded-xl shadow-lg bg-gradient-to-r ${pillar.color}`}
                >
                  <Link to={pillar.link} className="flex items-center justify-center gap-2">
                    <span>{pillar.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Central Demo Directory Banner */}
          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-6 rounded-xl"
            >
              <Link to="/demo" className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                <span>Open Full Interactive Demo Hub (All 11+ App Pages)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive ROI & SaaS Revenue Calculator */}
      <section id="roi-calculator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                Monetization Potential
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Calculate Your SaaS Platform Revenue
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As a tenant owner, you control subscription pricing and job posting fees. Use the simulator to project your recurring platform revenue.
              </p>

              {/* Sliders */}
              <div className="space-y-5 pt-2">
                {/* Recruiter Seats */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Subscribed Recruiters / Employers</span>
                    <span className="text-blue-400 text-sm font-bold">{recruiterSeats} Recruiters</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={recruiterSeats}
                    onChange={(e) => setRecruiterSeats(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Recruiter Monthly Fee */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Recruiter Monthly Subscription Fee</span>
                    <span className="text-blue-400 text-sm font-bold">${monthlyFeePerSeat} / month</span>
                  </div>
                  <input
                    type="range"
                    min="29"
                    max="299"
                    step="10"
                    value={monthlyFeePerSeat}
                    onChange={(e) => setMonthlyFeePerSeat(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Job Posts Per Month */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Monthly Paid Job Postings</span>
                    <span className="text-teal-400 text-sm font-bold">{jobPostsPerMonth} Jobs</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={jobPostsPerMonth}
                    onChange={(e) => setJobPostsPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                {/* Price Per Job Post */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Price Per Job Post (Credits)</span>
                    <span className="text-teal-400 text-sm font-bold">${pricePerJobPost} / post</span>
                  </div>
                  <input
                    type="range"
                    min="19"
                    max="199"
                    step="5"
                    value={pricePerJobPost}
                    onChange={(e) => setPricePerJobPost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800/90 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Projected Platform Earnings
              </span>

              <div className="space-y-2">
                <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  ${calculatedMRR.toLocaleString()}
                  <span className="text-base text-slate-400 font-normal"> / mo</span>
                </div>
                <div className="text-emerald-400 font-bold text-lg">
                  ${calculatedARR.toLocaleString()} Annualized Revenue (ARR)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="text-slate-400">Recruiter Subscriptions</div>
                  <div className="font-bold text-white text-sm mt-0.5">
                    ${(recruiterSeats * monthlyFeePerSeat).toLocaleString()} / mo
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Job Posting Fees</div>
                  <div className="font-bold text-white text-sm mt-0.5">
                    ${(jobPostsPerMonth * pricePerJobPost).toLocaleString()} / mo
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                * Zero revenue sharing. All proceeds flow directly to your Stripe merchant account.
              </p>

              <Button
                onClick={() => handleOpenModal('growth')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl text-base shadow-lg shadow-emerald-600/20"
              >
                Launch Your Monetized Platform &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Licensing & Commercial Pricing */}
      <section id="pricing" className="py-24 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-3">
              Commercial Licensing Tiers
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Simple, Transparent Licensing Plans
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg">
              Choose between turnkey cloud SaaS tenant hosting or complete source-code ownership for self-hosted private deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter / Agency Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Agency Edition</h3>
                  <Badge className="bg-slate-800 text-slate-300">Single Tenant</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Engineered for boutique staffing agencies & executive search firms requiring a dedicated branded portal.
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-black text-white">$399</div>
                  <div className="text-xs text-slate-400 mt-1">per month ($319/mo billed annually or $3,990 buyout)</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>1 Dedicated Branded Tenant & Custom Subdomain</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Up to 10 Recruiter Seats with Role-Based Access</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Applicant Tracking (Kanban Pipeline & Scorecards)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>AI Semantic Matching (2,500 candidate matches/mo)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Automated Resume/CV Parsing (500 uploads/mo)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Standard Email Notification Templates & SLA</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                onClick={() => handleOpenModal('starter')}
                className="w-full border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl"
              >
                Select Agency Tier
              </Button>
            </div>

            {/* Growth Marketplace SaaS Plan (Featured) */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-blue-500 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-blue-500/15 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                Most Popular for SaaS Founders
              </div>

              <div>
                <div className="flex justify-between items-center mb-4 pt-2">
                  <h3 className="text-xl font-bold text-white">Marketplace SaaS Edition</h3>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40">Multi-Tenant</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Ideal for regional job board founders, multi-brand staffing groups, and high-volume talent marketplaces.
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-black text-white">$990</div>
                  <div className="text-xs text-slate-400 mt-1">per month ($790/mo billed annually or $9,900 buyout)</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 mb-8 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">Up to 5 Multi-Brand Isolated Tenant Workspaces</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Unlimited Candidate & Recruiter Accounts</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Custom Apex Domain Mapping with Automated SSL</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Stripe Connect Employer Paywall & Job Posting Credits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>High-Throughput Vector AI Matching (Unlimited)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Multi-Currency (USD, AED, SAR, EUR) & MENA RTL Ready</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Priority 24/7 SLA & Dedicated Customer Success Manager</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => handleOpenModal('growth')}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-600/30 text-sm"
              >
                Deploy Marketplace SaaS Tenant &rarr;
              </Button>
            </div>

            {/* Enterprise / Source Code Plan */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Source Code License</h3>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40">Full Codebase</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  Complete uncompiled codebase ownership, private cloud self-hosting, and unrestricted custom engineering.
                </p>

                <div className="mb-6">
                  <div className="text-4xl font-black text-white">$24,900</div>
                  <div className="text-xs text-slate-400 mt-1">One-time perpetual buyout (0% royalties)</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">100% Full Uncompiled Source Code (Frontend & Backend)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Unlimited Self-Hosted Tenants & Private VPC Deployment</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Self-Hosted AI Embedding Models (Data Sovereignty Compliant)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Enterprise Single Sign-On (SAML 2.0 / Okta / Azure AD)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Direct Engineering Team Slack Channel & Architecture Review</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>0% Platform Royalties & Perpetual Commercial Rights</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                onClick={() => handleOpenModal('enterprise')}
                className="w-full border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 rounded-xl"
              >
                Request Source Code Agreement
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-slate-800 text-slate-300 mb-2">Modern Engineering</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Engineered with Modern, Production-Grade Standards
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <Code2 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">React 18 & Vite</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ultra-fast compilation</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">TypeScript Strict</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero runtime surprises</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <Palette className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">Tailwind CSS v4</div>
            <div className="text-[11px] text-slate-400 mt-0.5">CSS Variables theming</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <Layers className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">Radix Primitives</div>
            <div className="text-[11px] text-slate-400 mt-0.5">WAI-ARIA accessibility</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">TanStack Query</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Caching & state synchronization</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <Server className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <div className="font-bold text-white text-sm">Docker & Cloud</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Instant containerization</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mb-2">Answers</Badge>
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm mt-2">
              Everything you need to know about licensing, customization, and deployment.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800/90 rounded-2xl p-6 transition-colors hover:border-slate-700"
              >
                <h3 className="text-base font-bold text-white flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-400 text-sm mt-3 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call To Action Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Launch Your Job Matching Marketplace?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Test the live platform right now, or request your tenant deployment credentials to start onboarding candidates and recruiters today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              asChild
              className="bg-white text-slate-950 hover:bg-slate-100 font-bold px-8 py-6 rounded-xl text-base shadow-xl gap-2"
            >
              <Link to="/demo">
                <Compass className="w-5 h-5 text-blue-600" />
                Launch Live Demo Sandbox
              </Link>
            </Button>

            <Button
              size="lg"
              onClick={() => handleOpenModal('growth')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl text-base shadow-xl shadow-blue-600/30 gap-2"
            >
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Purchase Tenant License
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center text-slate-950 font-bold text-xs">
                  TM
                </div>
                <span className="font-bold text-white text-sm">TalentMatch SaaS</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Turnkey AI Job Matching & Multi-Tenant ATS SaaS Platform. Available under commercial white-label licensing.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Live Demos</h4>
              <ul className="space-y-2">
                <li><Link to="/demo" className="hover:text-white">Demo Hub Directory</Link></li>
                <li><Link to="/candidate/dashboard" className="hover:text-white">Candidate Portal Demo</Link></li>
                <li><Link to="/recruiter/dashboard" className="hover:text-white">Recruiter ATS Demo</Link></li>
                <li><Link to="/demo/client-portal" className="hover:text-white">Tenant End-User Landing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Licensing</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleOpenModal('starter')} className="hover:text-white text-left">Starter Agency Tier</button></li>
                <li><button onClick={() => handleOpenModal('growth')} className="hover:text-white text-left">Growth SaaS Tier</button></li>
                <li><button onClick={() => handleOpenModal('enterprise')} className="hover:text-white text-left">Source Code Agreement</button></li>
                <li><a href="#roi-calculator" className="hover:text-white">Revenue Simulator</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Security & Compliance</h4>
              <ul className="space-y-2 text-slate-500">
                <li>GDPR & Data Protection Ready</li>
                <li>Isolated Multi-Tenant Schema</li>
                <li>Encrypted Storage & Vectors</li>
                <li>RTL / GCC Localization Ready</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>© 2026 TalentMatch SaaS Platform. All commercial rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link to="/demo" className="hover:text-slate-300">Live Demo</Link>
              <a href="#whitelabel" className="hover:text-slate-300">White-Labeling</a>
              <a href="#pricing" className="hover:text-slate-300">Pricing</a>
            </div>
          </div>
        </div>
      </footer>

      {/* License Purchase Dialog Modal */}
      <LicensePurchaseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedPlan}
      />
    </div>
  );
}
