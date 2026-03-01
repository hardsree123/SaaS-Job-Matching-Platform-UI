// Core types for the job matching platform

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'recruiter';
  avatar?: string;
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title: string;
  summary: string;
  location: string;
  experience: number; // years
  skills: string[];
  education: Education[];
  workHistory: WorkExperience[];
  certifications: string[];
  availability: 'immediate' | '1-week' | '2-weeks' | '1-month' | 'not-looking';
  visaStatus: string;
  salaryExpectation: { min: number; max: number; currency: string };
  preferredRoles: string[];
  profileStrength: number; // 0-100
  isOpenToOpportunities: boolean;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;

  // New Metrics
  communicationScore?: number; // 0-100
  roleFitScore?: number; // 0-100
  redFlags?: string[]; // Array of identified risks/red flags
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current?: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Job {
  id: string;
  recruiterId: string;
  recruiterName: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  location: string;
  locationType: 'remote' | 'on-site' | 'hybrid';
  experience: { min: number; max: number };
  salary: { min: number; max: number; currency: string };
  skills: string[];
  industry: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  visaSponsorship: boolean;
  urgency: 'low' | 'medium' | 'high';
  postedAt: string;
  status: 'active' | 'closed' | 'paused';
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'applied' | 'viewed' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedAt: string;
  updatedAt: string;
  notes?: string;
}

export interface RecruiterActivity {
  id: string;
  recruiterId: string;
  recruiterName: string;
  recruiterTitle: string;
  companyName: string;
  companyLogo?: string;
  candidateId: string;
  type: 'profile-view' | 'invitation' | 'interview-request' | 'message';
  message?: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface CandidateMatch {
  candidate: Candidate;
  matchScore: number;
  matchReasons: string[];
}
