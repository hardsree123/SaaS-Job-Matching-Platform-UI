import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { SEOHead } from '../components/seo/SEOHead';
import {
  Sparkles,
  ArrowRight,
  User,
  Briefcase,
  Layers,
  Search,
  PlusCircle,
  FileCheck,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Shield,
  ArrowLeft,
  LayoutDashboard,
  Eye,
} from 'lucide-react';

export default function DemoHubPage() {
  const candidateDemos = [
    {
      title: 'Candidate Dashboard',
      description: 'The real-time candidate command center featuring match score feeds, recruiter contact requests, and job recommendations.',
      href: '/candidate/dashboard',
      badge: 'Main Hub',
      icon: LayoutDashboard,
    },
    {
      title: 'Smart Job Discovery',
      description: 'Search, filter, and discover matching opportunities with AI match percentage badges and one-click applications.',
      href: '/candidate/jobs',
      badge: 'AI Matched',
      icon: Search,
    },
    {
      title: 'Recruiter Interest & Inquiries',
      description: 'View recruiters who unlocked the candidate profile and requested direct interviews or chats.',
      href: '/candidate/interest',
      badge: 'Interactive',
      icon: Eye,
    },
    {
      title: 'Application Tracker',
      description: 'End-to-end tracking of applied positions, interview statuses, and recruiter responses.',
      href: '/candidate/applications',
      badge: 'Real-time',
      icon: FileCheck,
    },
    {
      title: 'Candidate Profile & CV Builder',
      description: 'Comprehensive profile with skills assessment, portfolio links, salary expectations, and work preferences.',
      href: '/candidate/profile',
      badge: 'Profile',
      icon: User,
    },
    {
      title: 'Candidate Onboarding Wizard',
      description: 'Step-by-step interactive onboarding flow with CV upload, skill tagging, and instant AI profile parsing.',
      href: '/candidate/onboarding',
      badge: 'Flow',
      icon: Layers,
    },
  ];

  const recruiterDemos = [
    {
      title: 'Recruiter ATS Dashboard',
      description: 'High-level analytics of open requisitions, candidate pipeline velocity, top matching talents, and incoming messages.',
      href: '/recruiter/dashboard',
      badge: 'ATS Hub',
      icon: LayoutDashboard,
    },
    {
      title: 'Hiring Pipeline (Kanban ATS)',
      description: 'Interactive drag-and-drop Kanban board moving candidates through Sourced, Applied, Shortlisted, Interview, and Hired stages.',
      href: '/recruiter/pipeline',
      badge: 'Drag & Drop',
      icon: Sliders,
    },
    {
      title: 'AI Candidate Search & Sourcing',
      description: 'Filter candidates by experience level, location, salary range, and AI match compatibility.',
      href: '/recruiter/candidates',
      badge: 'Smart Filter',
      icon: Search,
    },
    {
      title: 'Post a New Requisition',
      description: 'Intuitive job builder with salary ranges, experience tags, required skills, and instant AI candidate matching upon publish.',
      href: '/recruiter/post-job',
      badge: 'Creator',
      icon: PlusCircle,
    },
    {
      title: 'Candidate Deep Profile Inspection',
      description: 'Inspect comprehensive candidate CV dossiers, skill breakdowns, verified work history, and contact them directly.',
      href: '/recruiter/candidates/cand-1',
      badge: 'Dossier',
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Interactive SaaS Demo Hub & Directory | DibsMatch"
        description="Claim your next role with DibsMatch. Explore the live interactive demo. Test both Candidate Job Portal and Recruiter ATS Pipeline with smart vector AI matching."
        canonicalUrl="https://dibsmatch.io/demo"
      />
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                DM
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block leading-none">DibsMatch <span className="text-xs text-blue-400 font-mono font-normal">DEMO PORTAL</span></span>
                <span className="text-[10px] text-slate-400 font-medium">Claim your next role</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Product & Licensing</span>
            </Link>

            <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
              <Link to="/candidate/dashboard">Launch Candidate Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden py-12 lg:py-16 border-b border-slate-800/80 bg-gradient-to-b from-blue-950/30 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Live Turnkey SaaS Sandbox
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto">
            Experience the DibsMatch Platform in Action
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Claim your next role. Explore the complete dual-sided marketplace as an active Candidate or a corporate Recruiter. Test our matchmaking engine, Kanban pipeline, and modern responsive UI.
          </p>

          {/* Quick Dual Start */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2 shadow-lg shadow-blue-600/25 px-8">
              <Link to="/candidate/dashboard">
                <User className="w-5 h-5" />
                Launch Candidate Experience
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold gap-2 px-8">
              <Link to="/recruiter/dashboard">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                Launch Recruiter Suite
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Candidate Section */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Candidate Portal Experiences</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                How job-seekers discover opportunities, upload CVs, and interact with hiring recruiters.
              </p>
            </div>
            <Button variant="ghost" asChild className="text-blue-400 hover:text-blue-300 hidden sm:flex">
              <Link to="/candidate/dashboard">Open Candidate App &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateDemos.map((demo, idx) => {
              const Icon = demo.icon;
              return (
                <Link
                  key={idx}
                  to={demo.href}
                  className="group relative bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge className="bg-slate-800 text-slate-300 group-hover:bg-blue-900/50 group-hover:text-blue-200 border-slate-700 text-xs">
                        {demo.badge}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                      {demo.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <span>Explore Component</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recruiter Section */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-white">Recruiter & ATS Portals</h2>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                How employers and staffing agencies source talent, manage Kanban pipelines, and post jobs.
              </p>
            </div>
            <Button variant="ghost" asChild className="text-indigo-400 hover:text-indigo-300 hidden sm:flex">
              <Link to="/recruiter/dashboard">Open Recruiter App &rarr;</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recruiterDemos.map((demo, idx) => {
              const Icon = demo.icon;
              return (
                <Link
                  key={idx}
                  to={demo.href}
                  className="group relative bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge className="bg-slate-800 text-slate-300 group-hover:bg-indigo-900/50 group-hover:text-indigo-200 border-slate-700 text-xs">
                        {demo.badge}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                      {demo.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                    <span>Explore Component</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Branded Consumer Landing Preview */}
        <section className="bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Consumer Portal Preview
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              View the End-User Candidate Marketing Page
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Want to see what your job candidates and hiring managers will see when they visit your customized branded domain? View the default consumer-facing landing page included in this build.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Button asChild size="lg" className="bg-white text-slate-950 hover:bg-slate-100 font-bold">
              <Link to="/demo/client-portal">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Candidate Portal Landing
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white">
              <Link to="/">
                Get Organization License
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 DibsMatch SaaS Platform. Turnkey White-Label Licensing Edition.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/" className="hover:text-white">Commercial Licensing</Link>
            <Link to="/candidate/dashboard" className="hover:text-white">Candidate App</Link>
            <Link to="/recruiter/dashboard" className="hover:text-white">Recruiter ATS</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
