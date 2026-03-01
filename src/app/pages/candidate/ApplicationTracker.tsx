import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  CheckCircle,
  Clock,
  Eye,
  Star,
  Calendar,
  XCircle,
  MapPin,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { useApplications, useJobs } from '../../api/hooks';
import { Application } from '../../data/types';

export default function ApplicationTracker() {
  const { data: applications = [], isLoading: isLoadingApps } = useApplications();
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();

  const statusConfig = {
    applied: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Applied' },
    viewed: { icon: Eye, color: 'text-purple-600', bg: 'bg-purple-100', label: 'Viewed' },
    shortlisted: { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Shortlisted' },
    interview: { icon: Calendar, color: 'text-green-600', bg: 'bg-green-100', label: 'Interview' },
    offer: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Offer' },
    hired: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Hired' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
  };

  const statuses: (keyof typeof statusConfig)[] = ['applied', 'viewed', 'shortlisted', 'interview', 'offer', 'hired'];

  const ApplicationCard = ({ application }: { application: Application }) => {
    const job = jobs.find(j => j.id === application.jobId);
    if (!job) return null;

    const currentStatusIndex = statuses.indexOf(application.status as keyof typeof statusConfig);
    const StatusIcon = statusConfig[application.status as keyof typeof statusConfig]?.icon || Clock;

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-14 h-14 rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{job.title}</h3>
              <p className="text-gray-600 mb-3">{job.companyName}</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {job.experience.min}-{job.experience.max} years
                </div>
              </div>
            </div>
            <Badge className={`h-fit ${statusConfig[application.status as keyof typeof statusConfig]?.bg} ${statusConfig[application.status as keyof typeof statusConfig]?.color} hover:${statusConfig[application.status as keyof typeof statusConfig]?.bg}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig[application.status as keyof typeof statusConfig]?.label}
            </Badge>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all"
              style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {statuses.map((status, index) => {
                const config = statusConfig[status];
                const Icon = config.icon;
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={status} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${isCurrent
                          ? `${config.bg} ${config.color} ring-4 ring-blue-100`
                          : isCompleted
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className={`text-xs font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
                      {config.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-gray-600">
              <p>Applied: {new Date(application.appliedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</p>
              <p>Last updated: {new Date(application.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Withdraw</Button>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoadingApps || isLoadingJobs) {
    return <div>Loading applications...</div>;
  }

  const activeApplications = applications.filter(a =>
    ['applied', 'viewed', 'shortlisted', 'interview', 'offer'].includes(a.status)
  );
  const archivedApplications = applications.filter(a =>
    ['hired', 'rejected'].includes(a.status)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h1>
        <p className="text-gray-600">Track the status of all your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'applied').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Applied</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'viewed').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Viewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'shortlisted').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Shortlisted</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'interview').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Interview</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(a => a.status === 'offer').length}
              </p>
            </div>
            <p className="text-sm text-gray-600">Offers</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications */}
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">
                Active ({activeApplications.length})
              </TabsTrigger>
              <TabsTrigger value="archived">
                Archived ({archivedApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4 mt-6">
              {activeApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {activeApplications.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active applications</p>
                  <Button className="mt-4">Browse Jobs</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="archived" className="space-y-4 mt-6">
              {archivedApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))}
              {archivedApplications.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No archived applications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
