import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Sparkles, User, Briefcase, ChevronRight, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';

export function DemoBanner() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isCandidate = location.pathname.startsWith('/candidate');
  const isRecruiter = location.pathname.startsWith('/recruiter');

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white shadow-xl hover:bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide transition-all animate-bounce"
      >
        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
        <span>Live SaaS Demo Bar</span>
      </button>
    );
  }

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 px-4 py-2 text-xs sticky top-0 z-[60] shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge & Status */}
        <div className="flex items-center gap-2.5">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-2 py-0.5 text-[10px] tracking-wider uppercase border-0">
            Interactive SaaS Demo
          </Badge>
          <span className="text-slate-300 hidden md:inline">
            You are testing the live workspace for <span className="font-semibold text-white">DibsMatch Platform</span>.
          </span>
        </div>

        {/* Center Role Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <span className="text-slate-400 text-[11px] px-2 font-medium hidden sm:inline">Switch Role:</span>
          
          <Link
            to="/candidate/dashboard"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-[11px] font-semibold ${
              isCandidate
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-3 h-3" />
            Candidate Experience
          </Link>

          <Link
            to="/recruiter/dashboard"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-[11px] font-semibold ${
              isRecruiter
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            Recruiter Suite
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/demo"
            className="text-slate-300 hover:text-white hidden lg:flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded hover:bg-slate-900 transition-colors"
          >
            Demo Hub
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white px-3 py-1 rounded-md text-[11px] font-bold shadow-sm transition-all"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Product & Licensing Page</span>
          </Link>

          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            title="Minimize banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
