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
import { Check, Sparkles, Building2, ShieldCheck, Zap, HelpCircle, Layers } from 'lucide-react';

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
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targetDomain: '',
    notes: '',
  });

  const plans: Record<PlanKey, {
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    lifetimePrice: number;
    description: string;
    features: string[];
    isPopular?: boolean;
  }> = {
    starter: {
      name: 'Starter Edition',
      monthlyPrice: 299,
      annualPrice: 249,
      lifetimePrice: 2990,
      description: 'Engineered for boutique staffing agencies & emerging recruitment teams launching a dedicated branded portal.',
      features: [
        '1 Dedicated Branded Workspace',
        'Up to 5 Team Member Seats with RBAC',
        'Applicant Tracking (Kanban Pipeline & Scorecards)',
        'AI Semantic Matching (1,500 candidate matches/mo)',
        'Automated Resume/CV Parsing (300 uploads/mo)',
        'Custom Brand Logo, Colors & Typography',
      ],
    },
    growth: {
      name: 'Growth Edition',
      monthlyPrice: 699,
      annualPrice: 579,
      lifetimePrice: 6990,
      description: 'Ideal for scaling recruitment firms & niche job boards expanding candidate volume across multiple teams.',
      features: [
        'Up to 3 Branded Workspaces',
        'Up to 15 Team Member Seats',
        'Custom Apex Domain Mapping with Automated SSL',
        'Stripe Connect Employer Paywall & Job Posting Credits',
        'AI Semantic Matching (10,000 candidate matches/mo)',
        'Automated Resume/CV Parsing (1,500 uploads/mo)',
        'Standard Email Notification Templates & Priority Support',
      ],
    },
    pro: {
      name: 'Pro Edition',
      monthlyPrice: 1290,
      annualPrice: 1090,
      lifetimePrice: 12900,
      description: 'Perfect for high-volume talent marketplaces, regional job networks, and multi-brand staffing groups.',
      isPopular: true,
      features: [
        'Up to 10 Multi-Brand Isolated Workspaces',
        'Unlimited Team Members & Candidate Accounts',
        'High-Throughput Vector AI Matching (Unlimited)',
        'Unlimited Automated Resume Parsing',
        'Full White-Label & Custom CSS Variables',
        'Multi-Currency (USD, AED, SAR, EUR) & MENA RTL Ready',
        'Priority 24/7 SLA & Dedicated Customer Success Manager',
      ],
    },
    enterprise: {
      name: 'Enterprise / Source Code License',
      monthlyPrice: 2490,
      annualPrice: 1990,
      lifetimePrice: 24900,
      description: 'Complete uncompiled source code ownership, private cloud self-hosting, and unrestricted custom engineering.',
      features: [
        '100% Full Uncompiled Source Code (Frontend & Backend)',
        'Unlimited Self-Hosted Workspaces & Private Cloud VPC',
        'Self-Hosted AI Embedding Models (Data Sovereignty Compliant)',
        'Enterprise Single Sign-On (SAML 2.0 / Okta / Azure AD)',
        'Direct Engineering Team Slack Channel & Architecture Review',
        '0% Platform Royalties & Perpetual Commercial Rights',
      ],
    },
  };

  const currentPlan = plans[selectedPlan] || plans.pro;

  const getPriceDisplay = () => {
    if (billingCycle === 'lifetime') {
      return `$${currentPlan.lifetimePrice.toLocaleString()} one-time`;
    }
    if (billingCycle === 'annual') {
      return `$${currentPlan.annualPrice.toLocaleString()} / month (billed annually)`;
    }
    return `$${currentPlan.monthlyPrice.toLocaleString()} / month`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-gray-200">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              B2B SaaS Workspace License Agreement
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Deploy TalentMatch For Your Organization
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-sm mt-2">
            Select your licensing plan to obtain immediate deployment credentials, white-label customization assets, and turnkey SaaS access.
          </DialogDescription>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">License Request Received!</h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
              Thank you, <span className="font-semibold text-gray-900">{formData.name || 'Partner'}</span>. Our commercial licensing team has provisioned your sandbox workspace token for <span className="font-semibold text-gray-900">{formData.company || 'your organization'}</span>.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Selected Plan:</span>
                <span className="font-semibold text-gray-900">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Billing Term:</span>
                <span className="font-semibold text-gray-900 capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Target Domain:</span>
                <span className="font-semibold text-gray-900">{formData.targetDomain || 'Custom Subdomain'}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              We’ve sent the full white-label onboarding kit and staging environment credentials to <span className="font-medium text-gray-800">{formData.email || 'your email'}</span>.
            </p>
            <div className="pt-4">
              <Button onClick={handleResetAndClose} className="w-full sm:w-auto px-8">
                Done & Return to Explorer
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Plan Picker */}
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                1. Select Licensing Tier
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {(['starter', 'growth', 'pro', 'enterprise'] as const).map((tierKey) => {
                  const plan = plans[tierKey];
                  const isSelected = selectedPlan === tierKey;
                  return (
                    <button
                      type="button"
                      key={tierKey}
                      onClick={() => setSelectedPlan(tierKey)}
                      className={`relative p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {plan.isPopular && (
                        <span className="absolute -top-2.5 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          POPULAR
                        </span>
                      )}
                      <div className="font-bold text-xs text-gray-900 mb-1">{plan.name}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-2 leading-snug">{plan.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Billing Cycle Switcher */}
            <div>
              <Label className="text-sm font-semibold text-gray-800 mb-2 block">
                2. Choose Billing Structure
              </Label>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1.5 rounded-xl text-center text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`py-2 px-3 rounded-lg transition-all ${
                    billingCycle === 'annual'
                      ? 'bg-white text-blue-700 shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual License <span className="text-[10px] text-emerald-600 font-bold ml-1">(Save 20%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`py-2 px-3 rounded-lg transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-blue-700 shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly SaaS
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('lifetime')}
                  className={`py-2 px-3 rounded-lg transition-all ${
                    billingCycle === 'lifetime'
                      ? 'bg-white text-blue-700 shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Perpetual Buyout
                </button>
              </div>
              <div className="mt-2 text-right">
                <span className="text-sm font-semibold text-gray-900">{getPriceDisplay()}</span>
              </div>
            </div>

            {/* Included in this plan */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                Plan Inclusions ({currentPlan.name}):
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {currentPlan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Organization Details */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-800 block">
                3. Your Organization & Contact Details
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs text-gray-600">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-gray-600">Business Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company" className="text-xs text-gray-600">Company / Organization Name *</Label>
                  <Input
                    id="company"
                    required
                    placeholder="e.g. Apex Talent Group Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="domain" className="text-xs text-gray-600">Desired Custom Domain</Label>
                  <Input
                    id="domain"
                    placeholder="e.g. jobs.apextalent.com"
                    value={formData.targetDomain}
                    onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex items-center gap-3 text-xs text-gray-500 border-t pt-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>30-Day Money-Back Guarantee. Full source code repository access granted via private GitHub organization upon completion.</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 shadow-md shadow-blue-600/20"
              >
                Request Deployment Credentials
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
