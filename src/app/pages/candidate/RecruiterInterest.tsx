import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Eye, MessageSquare, Calendar, Mail, Briefcase } from 'lucide-react';
import { useRecruiterActivities } from '../../api/hooks';
import { RecruiterActivity } from '../../data/types';

export default function RecruiterInterest() {
  const { data: mockRecruiterActivities = [], isLoading } = useRecruiterActivities();

  const profileViews = mockRecruiterActivities.filter(a => a.type === 'profile-view');
  const invitations = mockRecruiterActivities.filter(a => a.type === 'invitation');
  const interviewRequests = mockRecruiterActivities.filter(a => a.type === 'interview-request');
  const messages = mockRecruiterActivities.filter(a => a.type === 'message');

  const allActivities = [...mockRecruiterActivities, ...mockRecruiterActivities.map((a, i) => ({
    ...a,
    id: `${a.id}-dup-${i}`,
  }))];

  if (isLoading) {
    return <div className="p-8 text-center bg-gray-50 rounded-lg">Loading activity...</div>;
  }

  const ActivityCard = ({ activity }: { activity: typeof mockRecruiterActivities[0] }) => (
    <div className="flex items-start gap-4 p-6 border rounded-lg hover:border-blue-300 transition-colors">
      <img
        src={activity.companyLogo}
        alt={activity.companyName}
        className="w-14 h-14 rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <p className="font-semibold text-gray-900">{activity.recruiterName}</p>
            <p className="text-sm text-gray-600">
              {activity.recruiterTitle} at {activity.companyName}
            </p>
          </div>
          <Badge variant={activity.type === 'interview-request' ? 'default' : 'secondary'}>
            {activity.type === 'profile-view' && <Eye className="w-3 h-3 mr-1" />}
            {activity.type === 'interview-request' && <Calendar className="w-3 h-3 mr-1" />}
            {activity.type === 'invitation' && <Mail className="w-3 h-3 mr-1" />}
            {activity.type === 'message' && <MessageSquare className="w-3 h-3 mr-1" />}
            {activity.type.replace('-', ' ')}
          </Badge>
        </div>

        {activity.message && (
          <p className="text-sm text-gray-700 mb-3 bg-gray-50 p-3 rounded-lg">
            {activity.message}
          </p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {new Date(activity.timestamp).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {activity.type === 'interview-request' && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Decline</Button>
              <Button size="sm">Accept</Button>
            </div>
          )}
          {activity.type === 'invitation' && (
            <Button size="sm" variant="outline">View Job</Button>
          )}
          {(activity.type === 'message' || activity.type === 'profile-view') && (
            <Button size="sm" variant="outline">Send Message</Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Interest</h1>
        <p className="text-gray-600">See who's interested in your profile</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{allActivities.length}</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
                <p className="text-sm text-gray-600">Invitations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{interviewRequests.length}</p>
                <p className="text-sm text-gray-600">Interview Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                <p className="text-sm text-gray-600">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>All recruiter interactions with your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                All ({allActivities.length})
              </TabsTrigger>
              <TabsTrigger value="interview">
                Interview Requests ({interviewRequests.length})
              </TabsTrigger>
              <TabsTrigger value="invitations">
                Invitations ({invitations.length})
              </TabsTrigger>
              <TabsTrigger value="views">
                Profile Views ({profileViews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {allActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </TabsContent>

            <TabsContent value="interview" className="space-y-4 mt-6">
              {interviewRequests.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
              {interviewRequests.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No interview requests yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invitations" className="space-y-4 mt-6">
              {invitations.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </TabsContent>

            <TabsContent value="views" className="space-y-4 mt-6">
              {profileViews.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
