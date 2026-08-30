export type MessageSender = 'user' | 'agent' | 'system';

export interface ChatAction {
  label: string;
  actionType: 'navigate' | 'open_modal' | 'lead_form' | 'custom';
  payload?: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  showLeadForm?: boolean;
  showPlanCards?: boolean;
  isStreaming?: boolean;
}

export interface QuickPrompt {
  id: string;
  title: string;
  iconName: string;
  prompt: string;
  category: 'features' | 'pricing' | 'sales' | 'demo' | 'tech';
}

export interface PlanDetail {
  key: 'starter' | 'growth' | 'pro' | 'enterprise';
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
  highlights: string[];
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  interestedPlan: string;
  requirements: string;
}
