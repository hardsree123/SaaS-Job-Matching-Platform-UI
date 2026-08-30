import React, { useState } from 'react';
import { PLANS_DATA } from './aiKnowledgeBase';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PlanKey } from '../ui/LicensePurchaseModal';

interface PlanComparisonCardProps {
  onSelectPlan: (plan: PlanKey) => void;
}

export function PlanComparisonCard({ onSelectPlan }: PlanComparisonCardProps) {
  const [billing, setBilling] = useState<'annual' | 'monthly' | 'lifetime'>('annual');
  const [activePlanKey, setActivePlanKey] = useState<string>('pro');

  const plans = Object.values(PLANS_DATA);
  const activePlan = PLANS_DATA[activePlanKey] || PLANS_DATA['pro'];

  const getPrice = (plan: typeof activePlan) => {
    if (billing === 'lifetime') return `$${plan.lifetimePrice.toLocaleString()} one-time`;
    if (billing === 'annual') return `$${plan.annualPrice}/mo (billed annually)`;
    return `$${plan.monthlyPrice}/mo`;
  };

  return (
    <div className="my-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-slate-100 shadow-xl">
      {/* Billing Switcher Header */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2 pb-2 border-b border-slate-800">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Interactive Plan Selector
        </span>
        <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-2 py-1 rounded font-medium transition-all ${
              billing === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-2 py-1 rounded font-medium transition-all ${
              billing === 'annual' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual (-20%)
          </button>
          <button
            onClick={() => setBilling('lifetime')}
            className={`px-2 py-1 rounded font-medium transition-all ${
              billing === 'lifetime' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lifetime
          </button>
        </div>
      </div>

      {/* Plan Tabs */}
      <div className="grid grid-cols-4 gap-1 mb-3">
        {plans.map((p) => {
          const isSelected = p.key === activePlanKey;
          return (
            <button
              key={p.key}
              onClick={() => setActivePlanKey(p.key)}
              className={`p-1.5 rounded-lg text-center transition-all border ${
                isSelected
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-[11px] truncate">{p.name.split(' ')[0]}</div>
              <div className="text-[9px] text-slate-500">
                {billing === 'lifetime' ? `$${p.lifetimePrice}` : `$${billing === 'annual' ? p.annualPrice : p.monthlyPrice}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Plan Detail Box */}
      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 mb-3">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-white">{activePlan.name}</h4>
            {activePlan.isPopular && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-[9px] px-1.5 py-0">
                Most Popular
              </Badge>
            )}
          </div>
          <span className="text-xs font-extrabold text-teal-300">{getPrice(activePlan)}</span>
        </div>

        <p className="text-[11px] text-slate-400 mb-2 leading-tight">{activePlan.tagline}</p>

        <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-300 mb-2.5 pb-2 border-b border-slate-850">
          <div className="flex items-center gap-1">
            <span className="text-slate-500">Workspaces:</span>
            <span className="font-semibold text-slate-200">{activePlan.workspaces}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">Recruiter Seats:</span>
            <span className="font-semibold text-slate-200">{activePlan.seats}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">AI Matching:</span>
            <span className="font-semibold text-slate-200">{activePlan.aiVolume}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-slate-500">CV Parsing:</span>
            <span className="font-semibold text-slate-200">{activePlan.cvParsing}</span>
          </div>
        </div>

        <ul className="space-y-1 mb-3">
          {activePlan.highlights.slice(0, 4).map((h, i) => (
            <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug">
              <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => onSelectPlan(activePlan.key as PlanKey)}
          className="w-full h-8 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md gap-1"
        >
          <span>Select {activePlan.name} & Get Started</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
