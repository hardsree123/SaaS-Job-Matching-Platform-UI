import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import {
  Eye,
  TrendingUp,
  MessageSquare,
  Briefcase,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { useJobs, useRecruiterActivities, useApplications } from '../../api/hooks';
import { useAuthStore } from '../../store/useAuthStore';

export default function CandidateDashboard() {
  const { user } = useAuthStore();
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const { data: activities = [], isLoading: isLoadingActivities } = useRecruiterActivities();
  const { data: applications = [], isLoading: isLoadingApps } = useApplications();

  const profileStrength = 92;
  const recruiterViews = 47;
  const isOpenToOpportunities = true;

  // Get AI-matched jobs (top 3)
  const matchedJobs = jobs.slice(0, 3);

  // Get recent activities
  const recentActivities = activities.slice(0, 3);

  // Get active applications
  const activeApplications = applications.slice(0, 2);

  if (isLoadingJobs || isLoadingActivities || isLoadingApps) {
    return <div className="p-8 text-center bg-gray-50 rounded-lg">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Candidate'}!</h1>
        <p className="text-gray-600">Here's what's happening with your job search</p>
      </div>

      {/* Availability Toggle */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Label htmlFor="availability-toggle" className="text-base font-semibold text-gray-900 cursor-pointer">
                  Open to Opportunities
                </Label>
                <p className="text-sm text-gray-600">
                  {isOpenToOpportunities ? 'Your profile is visible to recruiters' : 'Turn on to get discovered'}
                </p>
              </div>
            </div>
            <Switch id="availability-toggle" checked={isOpenToOpportunities} />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Strength */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Profile Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">{profileStrength}%</span>
                <Badge variant={profileStrength >= 90 ? 'default' : 'secondary'}>
                  {profileStrength >= 90 ? 'Excellent' : 'Good'}
                </Badge>
              </div>
              <Progress value={profileStrength} className="h-2" />
              {profileStrength < 100 && (
                <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                  <Link to="/candidate/profile">
                    Improve your profile
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recruiter Views */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Recruiter Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">{recruiterViews}</span>
              </div>
              <p className="text-sm text-gray-600">In the last 7 days</p>
              <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                <Link to="/candidate/interest">
                  View all activity
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Applications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">{activeApplications.length}</span>
              </div>
              <p className="text-sm text-gray-600">Applications in progress</p>
              <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                <Link to="/candidate/applications">
                  Track applications
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Recruiter Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Recruiter Activity</CardTitle>
              <CardDescription>Recruiters who are interested in your profile</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/candidate/interest">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={activity.companyLogo}
                alt={activity.companyName}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">{activity.recruiterName}</p>
                    <p className="text-sm text-gray-600">
                      {activity.recruiterTitle} at {activity.companyName}
                    </p>
                  </div>
                  <Badge variant={activity.type === 'interview-request' ? 'default' : 'secondary'}>
                    {activity.type === 'profile-view' && 'Viewed Profile'}
                    {activity.type === 'interview-request' && 'Interview Request'}
                    {activity.type === 'invitation' && 'Invitation'}
                    {activity.type === 'message' && 'Message'}
                  </Badge>
                </div>
                {activity.message && (
                  <p className="text-sm text-gray-700 mt-2">{activity.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(activity.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {activity.type === 'interview-request' && (
                <Button size="sm">Respond</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI-Matched Jobs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AI-Matched Jobs</CardTitle>
              <CardDescription>Opportunities perfectly aligned with your profile</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/candidate/jobs">Explore More</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {matchedJobs.map((job) => {
            const matchScore = Math.floor(Math.random() * 10) + 90; // 90-100% for demo
            return (
              <div key={job.id} className="p-6 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-4">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-14 h-14 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.companyName}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {matchScore}% Match
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {job.experience.min}-{job.experience.max} years
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {job.locationType}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="secondary">+{job.skills.length - 4} more</Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Quick Apply</Button>
                      <Button size="sm" variant="outline">Save</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Suggested Improvements */}
      <Card>
        <CardHeader>
          <CardTitle>Boost Your Profile</CardTitle>
          <CardDescription>Complete these actions to increase your visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Upload your resume</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Add at least 5 skills</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Add certifications</p>
              <p className="text-sm text-gray-600">This will help you stand out to recruiters</p>
            </div>
            <Button size="sm" variant="outline">Add</Button>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Complete work history</p>
              <p className="text-sm text-gray-600">Add your most recent positions</p>
            </div>
            <Button size="sm" variant="outline">Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
