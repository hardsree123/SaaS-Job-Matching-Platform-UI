import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Badge } from './badge';
import {
  Check,
  Sparkles,
  Building2,
  ShieldCheck,
  Zap,
  PhoneCall,
  Lock,
  ArrowRight,
  Clock,
  Star,
  CheckCircle2,
  Cpu,
  Layers,
  MessageCircle,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { sendLeadToWhatsApp } from '../../services/leadService';

export type PlanKey = 'starter' | 'growth' | 'pro' | 'enterprise';

interface LicensePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PlanKey;
}

export function LicensePurchaseModal({
  isOpen,
  onClose,
  initialPlan = 'pro',
}: LicensePurchaseModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(initialPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual' | 'lifetime'>('annual');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    targetDomain: '',
    notes: '',
  });

  const targetWhatsAppNumber = '+91 7907084428';

  const plans: Record<PlanKey, {
    name: string;
    tagline: string;
    monthlyPrice: number;
    annualPrice: number;
    lifetimePrice: number;
    workspaces: string;
    seats: string;
    aiVolume: string;
    cvParsing: string;
    isPopular?: boolean;
    badgeColor?: string;
    features: string[];
  }> = {
    starter: {
      name: 'Starter',
      tagline: 'Boutique agencies & single recruitment workspace',
      monthlyPrice: 299,
      annualPrice: 249,
      lifetimePrice: 2990,
      workspaces: '1 Workspace',
      seats: 'Up to 5 seats',
      aiVolume: '1,500 AI Matches/mo',
      cvParsing: '300 CV parses/mo',
      features: [
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
      name: 'Growth',
      tagline: 'Scaling recruitment firms & regional niche boards',
      monthlyPrice: 699,
      annualPrice: 579,
      lifetimePrice: 6990,
      workspaces: '3 Workspaces',
      seats: 'Up to 15 seats',
      aiVolume: '10,000 AI Matches/mo',
      cvParsing: '1,500 CV parses/mo',
      features: [
        'Up to 3 Branded Workspaces',
        'Up to 15 Team Member Seats',
        'Custom Apex Domain Mapping & Automated SSL',
        'Stripe Connect Employer Paywall & Posting Credits',
        '10,000 AI Semantic Candidate Matches/mo',
        'Automated Resume/CV Entity Parsing (1,500/mo)',
        'Priority Technical Support & Email Templates',
      ],
    },
    pro: {
      name: 'Pro',
      tagline: 'High-volume talent marketplaces & multi-brand groups',
      monthlyPrice: 1290,
      annualPrice: 1090,
      lifetimePrice: 12900,
      workspaces: '10 Workspaces',
      seats: 'Unlimited seats',
      aiVolume: 'Unlimited vector AI',
      cvParsing: 'Unlimited CV parsing',
      isPopular: true,
      badgeColor: 'from-blue-600 to-indigo-600',
      features: [
        'Up to 10 Multi-Brand Isolated Workspaces',
        'Unlimited Team Members & Candidate Accounts',
        'High-Throughput Vector AI Matching (Unlimited)',
        'Unlimited Automated Resume Parsing',
        'Full White-Labeling (Custom CSS & Transactional SMTP)',
        'Multi-Currency (USD, AED, SAR, EUR) & MENA RTL Ready',
        'Priority 24/7 Dedicated SLA & Dedicated CSM',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      tagline: 'Full source code ownership & self-hosted private cloud',
      monthlyPrice: 2490,
      annualPrice: 1990,
      lifetimePrice: 24900,
      workspaces: 'Unlimited VPC',
      seats: 'Full Codebase',
      aiVolume: 'Air-Gapped AI',
      cvParsing: 'Self-Hosted',
      badgeColor: 'from-purple-600 to-indigo-600',
      features: [
        '100% Full Uncompiled Source Code (React 18 + Backend)',
        'Unlimited Self-Hosted Workspaces & Private Cloud VPC',
        'Self-Hosted AI Embedding Models (Data Sovereignty)',
        'Enterprise Single Sign-On (SAML 2.0 / Okta / Azure AD)',
        'Direct Engineering Slack Channel & Architecture Review',
        '0% Platform Royalties & Perpetual Commercial Rights',
      ],
    },
  };

  const currentPlan = plans[selectedPlan] || plans.pro;

  const getActivePrice = (tierKey: PlanKey) => {
    const plan = plans[tierKey];
    if (billingCycle === 'lifetime') {
      return {
        amount: `$${plan.lifetimePrice.toLocaleString()}`,
        period: 'one-time buyout',
        savings: 'Perpetual ownership',
      };
    }
    if (billingCycle === 'annual') {
      return {
        amount: `$${plan.annualPrice.toLocaleString()}`,
        period: '/ month',
        subtext: 'Billed annually',
        savings: `Save $${((plan.monthlyPrice - plan.annualPrice) * 12).toLocaleString()}/yr`,
      };
    }
    return {
      amount: `$${plan.monthlyPrice.toLocaleString()}`,
      period: '/ month',
      subtext: 'Billed monthly',
      savings: null,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activePricing = getActivePrice(selectedPlan);
    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    try {
      await sendLeadToWhatsApp({
        planName: currentPlan.name,
        planKey: selectedPlan,
        billingCycle,
        priceAmount: activePricing.amount,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        targetDomain: formData.targetDomain,
        recipientWhatsApp: targetWhatsAppNumber,
        submittedAt: timestamp,
      });
    } catch (err) {
      console.error('Lead forwarding error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="sm:max-w-5xl lg:max-w-5xl xl:max-w-6xl w-full max-w-[96vw] max-h-[92vh] overflow-y-auto p-0 border-slate-800 bg-slate-950 text-white shadow-2xl rounded-2xl">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 sm:px-10 py-6 border-b border-slate-800 relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-wider border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  B2B SaaS Workspace Commercial License
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-300/90 font-medium bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                  4.9/5 Rating (120+ Organizations)
                </span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Deploy DibsMatch For Your Organization
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs sm:text-sm">
                Claim your next role with DibsMatch. Select your preferred licensing tier and speak directly with our solutions engineering team.
              </DialogDescription>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>15-Min Response SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>0% Royalty Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          /* Silent Background Forwarding Confirmation Screen */
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                Lead Dossier Dispatched
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Call Back Request Received!</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Thank you, <span className="font-bold text-white">{formData.name || 'Partner'}</span>. Your organization requirements for <span className="font-bold text-white">{formData.company || 'your team'}</span> have been dispatched to our commercial solutions team.
              </p>
            </div>

            {/* Lead Summary Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-3 shadow-inner">
              <div className="flex justify-between items-center text-slate-400">
                <span>Selected Plan:</span>
                <span className="font-bold text-white text-sm">{currentPlan.name} Edition</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Investment & Term:</span>
                <span className="font-semibold text-emerald-400">{getActivePrice(selectedPlan).amount} ({billingCycle})</span>
              </div>
              {formData.phone && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>Call Back Number:</span>
                  <span className="font-semibold text-white font-mono">{formData.phone}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-slate-400">
                <span>Organization:</span>
                <span className="font-semibold text-slate-200">{formData.company}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Response SLA:</span>
                <span className="font-bold text-emerald-400">Under 15 Minutes</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Our solutions architect is preparing your sandbox environment and will call you back shortly.
            </p>

            <div className="pt-2">
              <Button onClick={handleResetAndClose} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30">
                Done & Return to Explorer
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Plan Picker & Dynamic Feature Inclusions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Billing Structure Switcher */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    1. Choose Billing Frequency
                  </Label>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    ⚡ Annual plans include 2 months free
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-center text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      billingCycle === 'annual'
                        ? 'bg-blue-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>Annual License</span>
                    <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                      -20%
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`py-2.5 px-3 rounded-lg transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-blue-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Monthly SaaS
                  </button>

                  <button
                    type="button"
                    onClick={() => setBillingCycle('lifetime')}
                    className={`py-2.5 px-3 rounded-lg transition-all ${
                      billingCycle === 'lifetime'
                        ? 'bg-blue-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Perpetual Buyout
                  </button>
                </div>
              </div>

              {/* Step 2: 4-Tier Interactive Cards with High-Visibility Pricing */}
              <div className="space-y-2.5">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  2. Select Licensing Tier
                </Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {(['starter', 'growth', 'pro', 'enterprise'] as const).map((tierKey) => {
                    const plan = plans[tierKey];
                    const isSelected = selectedPlan === tierKey;
                    const priceInfo = getActivePrice(tierKey);

                    return (
                      <button
                        type="button"
                        key={tierKey}
                        onClick={() => setSelectedPlan(tierKey)}
                        className={`relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-500 bg-gradient-to-b from-blue-950/70 to-slate-900 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500'
                            : 'border-slate-800/90 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900'
                        }`}
                      >
                        {/* Popular Badge */}
                        {plan.isPopular && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                            MOST POPULAR
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-extrabold text-white text-base">
                              {plan.name}
                            </span>
                            <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[10px] px-2">
                              {plan.workspaces}
                            </Badge>
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                            {plan.tagline}
                          </p>
                        </div>

                        {/* Prominent Pricing Value Display */}
                        <div className="pt-3 border-t border-slate-800/80">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                              {priceInfo.amount}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {priceInfo.period}
                            </span>
                          </div>

                          {priceInfo.savings && (
                            <div className="text-[10px] font-semibold text-emerald-400 mt-0.5">
                              ✓ {priceInfo.savings}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Feature Inclusions Matrix for Selected Plan */}
              <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Included with {currentPlan.name} Tier:
                    </span>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[11px]">
                    {currentPlan.workspaces}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                  {currentPlan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Security Highlights */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                <div className="p-2.5 bg-slate-900/50 rounded-xl border border-slate-800/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-300 block">30-Day Guarantee</span>
                  <span className="text-[10px] text-slate-500">Risk-free trial</span>
                </div>
                <div className="p-2.5 bg-slate-900/50 rounded-xl border border-slate-800/60">
                  <Lock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-300 block">100% White-Label</span>
                  <span className="text-[10px] text-slate-500">Your brand & apex domain</span>
                </div>
                <div className="p-2.5 bg-slate-900/50 rounded-xl border border-slate-800/60">
                  <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-[11px] font-semibold text-slate-300 block">0% Placement Cuts</span>
                  <span className="text-[10px] text-slate-500">Keep 100% platform revenue</span>
                </div>
              </div>
            </div>

            {/* Right Column: Callback & Customization Request Form (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                  <h3 className="font-extrabold text-white text-lg">
                    Speak With a Solutions Architect
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Request a live walkthrough, custom pricing proposal, or sandbox credentials.
                </p>
              </div>

              {/* Selected Plan Summary Banner */}
              <div className="p-3.5 bg-blue-950/40 border border-blue-500/30 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-blue-300 font-semibold uppercase tracking-wider">
                    Selected Configuration
                  </div>
                  <div className="font-black text-white text-sm">
                    {currentPlan.name} Edition ({billingCycle})
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-white text-base">
                    {getActivePrice(selectedPlan).amount}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {getActivePrice(selectedPlan).period}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-300">
                    Your Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 text-xs py-2.5 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
                    Business Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 text-xs py-2.5 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold text-slate-300">
                    Phone Number / WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 text-xs py-2.5 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-xs font-semibold text-slate-300">
                    Company / Organization Name *
                  </Label>
                  <Input
                    id="company"
                    required
                    placeholder="e.g. Apex Talent Group Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 text-xs py-2.5 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="domain" className="text-xs font-semibold text-slate-300">
                    Desired Custom Domain (Optional)
                  </Label>
                  <Input
                    id="domain"
                    placeholder="e.g. jobs.apextalent.com"
                    value={formData.targetDomain}
                    onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
                    className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 text-xs py-2.5 rounded-xl focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold py-6 rounded-xl shadow-xl shadow-blue-600/30 text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Dossier to WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>Request a call back</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-[11px] text-slate-500 text-center leading-tight pt-1">
                  🔒 No credit card required. Free 1-on-1 architecture consultation & instant sandbox access.
                </p>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
