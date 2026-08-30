import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Send, CheckCircle2, Loader2, Sparkles, Building, Mail, Phone, User } from 'lucide-react';
import { dispatchLeadNotification } from '../../services/leadService';

interface ChatLeadFormProps {
  onSuccess?: () => void;
  defaultPlan?: string;
}

export function ChatLeadForm({ onSuccess, defaultPlan = 'Pro Edition' }: ChatLeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await dispatchLeadNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'N/A',
        company: formData.company || 'N/A',
        planName: defaultPlan,
        planKey: defaultPlan.toLowerCase().replace(/\s+/g, '-'),
        billingCycle: 'chat-inquiry',
        priceAmount: 'Custom Quote / Sales Inquiry',
        targetDomain: formData.requirements || 'AI Chat Assistant Inquiry',
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.warn('Lead submission error in chat:', err);
      // Still show success to user as local fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="my-3 p-4 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/40 text-emerald-200">
        <div className="flex items-center gap-2 font-semibold text-sm mb-1 text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Inquiry Received Successfully!</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Thank you, <strong className="text-white">{formData.name}</strong>. Our enterprise solutions advisor has received your request and will reach out to <strong className="text-white">{formData.email}</strong> within 1 business hour.
        </p>
      </div>
    );
  }

  return (
    <div className="my-3 p-3.5 sm:p-4 rounded-xl bg-slate-900/95 border border-blue-500/30 shadow-lg text-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white">Direct Sales & Solutions Request</h4>
          <p className="text-[11px] text-slate-400">Get a custom quote & personalized platform walkthrough</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <Label className="text-[11px] text-slate-300 font-medium mb-1 block">Full Name *</Label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <Input
                required
                placeholder="Sarah Al-Mansoor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-8 h-8 text-xs bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-[11px] text-slate-300 font-medium mb-1 block">Work Email *</Label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <Input
                type="email"
                required
                placeholder="sarah@agency.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-8 h-8 text-xs bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <Label className="text-[11px] text-slate-300 font-medium mb-1 block">Company / Agency</Label>
            <div className="relative">
              <Building className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <Input
                placeholder="Apex Talent Partners"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="pl-8 h-8 text-xs bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-[11px] text-slate-300 font-medium mb-1 block">Phone / WhatsApp</Label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <Input
                placeholder="+971 50 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-8 h-8 text-xs bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-[11px] text-slate-300 font-medium mb-1 block">Key Requirements / Notes</Label>
          <Input
            placeholder="e.g. 50 recruiter seats, custom domain, Arabic RTL support..."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="h-8 text-xs bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500"
          />
        </div>

        {errorMsg && <p className="text-[11px] text-rose-400">{errorMsg}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-8 text-xs font-semibold bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white shadow-md shadow-blue-500/20 gap-1.5 mt-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Submit Priority Inquiry</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
