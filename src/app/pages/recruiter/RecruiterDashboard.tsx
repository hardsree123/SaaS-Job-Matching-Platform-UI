import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Users,
  Briefcase,
  Eye,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { useJobs, useCandidateMatches } from '../../api/hooks';
import { useAuthStore } from '../../store/useAuthStore';

export default function RecruiterDashboard() {
  const { user } = useAuthStore();
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const { data: matches = [], isLoading: isLoadingMatches } = useCandidateMatches();

  if (isLoadingJobs || isLoadingMatches) {
    return <div className="p-8 text-center bg-gray-50 rounded-lg">Loading dashboard...</div>;
  }

  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const totalApplications = 45; // Currently statically mocked
  const newMatches = matches.length;
  const scheduledInterviews = 3; // Currently statically mocked

  const recentJobs = jobs.slice(0, 3);
  const topMatches = matches.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name?.split(' ')[0] || 'Recruiter'}!</h1>
        <p className="text-gray-600">Here's an overview of your hiring activity</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/recruiter/post-job">
            <Plus className="w-4 h-4 mr-2" />
            Post a New Job
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/recruiter/candidates">
            <Users className="w-4 h-4 mr-2" />
            Find Candidates
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/recruiter/pipeline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Pipeline
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{activeJobs}</p>
                <p className="text-sm text-gray-600">Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">New Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{newMatches}</p>
                <p className="text-sm text-gray-600">Candidates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
                <p className="text-sm text-gray-600">To Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{scheduledInterviews}</p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Matches */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Job Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Job Posts</CardTitle>
                <CardDescription>Your current open positions</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/recruiter/post-job">+ New Job</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <Badge
                    variant={job.urgency === 'high' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {job.urgency}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>12 applicants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {new Date(job.postedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Candidate Matches */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Candidate Matches</CardTitle>
                <CardDescription>Highly matched candidates for your roles</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/recruiter/candidates">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {topMatches.map((match) => (
              <div key={match.candidate.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-start gap-3">
                  <img
                    src={match.candidate.avatar}
                    alt={match.candidate.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{match.candidate.name}</h3>
                        <p className="text-sm text-gray-600">{match.candidate.title}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {match.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {match.candidate.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/recruiter/candidates/${match.candidate.id}`}>View Profile</Link>
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hiring Pipeline Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hiring Pipeline</CardTitle>
              <CardDescription>Overview of candidates in each stage</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/recruiter/pipeline">
                View Full Pipeline
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              { label: 'Applied', count: 45, color: 'bg-blue-500' },
              { label: 'Screening', count: 23, color: 'bg-purple-500' },
              { label: 'Interview', count: 12, color: 'bg-yellow-500' },
              { label: 'Offer', count: 4, color: 'bg-green-500' },
              { label: 'Hired', count: 8, color: 'bg-emerald-500' },
              { label: 'Rejected', count: 15, color: 'bg-gray-400' },
            ].map((stage) => (
              <div key={stage.label} className="text-center">
                <div className={`w-full h-2 ${stage.color} rounded-full mb-2`} />
                <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
                <p className="text-sm text-gray-600">{stage.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">New application received</p>
              <p className="text-sm text-gray-600">Ahmed Hassan applied for Senior Full Stack Developer</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Interview confirmed</p>
              <p className="text-sm text-gray-600">Sara Al Mansoori confirmed interview for tomorrow at 2 PM</p>
              <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <Users className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">4 new candidate matches</p>
              <p className="text-sm text-gray-600">Found highly qualified candidates for DevOps Engineer role</p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
