import { createBrowserRouter } from 'react-router';

// Landing
import LandingPage from './pages/LandingPage';

// Candidate Pages
import CandidateOnboarding from './pages/candidate/CandidateOnboarding';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import JobDiscovery from './pages/candidate/JobDiscovery';
import RecruiterInterest from './pages/candidate/RecruiterInterest';
import ApplicationTracker from './pages/candidate/ApplicationTracker';
import CandidateProfile from './pages/candidate/CandidateProfile';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJob from './pages/recruiter/PostJob';
import CandidateSearch from './pages/recruiter/CandidateSearch';
import CandidateProfileView from './pages/recruiter/CandidateProfileView';
import HiringPipeline from './pages/recruiter/HiringPipeline';

// Layouts
import CandidateLayout from './layouts/CandidateLayout';
import RecruiterLayout from './layouts/RecruiterLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/candidate',
    Component: CandidateLayout,
    children: [
      { path: 'onboarding', Component: CandidateOnboarding },
      { path: 'dashboard', Component: CandidateDashboard },
      { path: 'jobs', Component: JobDiscovery },
      { path: 'interest', Component: RecruiterInterest },
      { path: 'applications', Component: ApplicationTracker },
      { path: 'profile', Component: CandidateProfile },
    ],
  },
  {
    path: '/recruiter',
    Component: RecruiterLayout,
    children: [
      { path: 'dashboard', Component: RecruiterDashboard },
      { path: 'post-job', Component: PostJob },
      { path: 'candidates', Component: CandidateSearch },
      { path: 'candidates/:id', Component: CandidateProfileView },
      { path: 'pipeline', Component: HiringPipeline },
    ],
  },
]);
