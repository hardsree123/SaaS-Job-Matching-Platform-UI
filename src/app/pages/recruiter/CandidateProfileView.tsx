import { useParams, useNavigate } from 'react-router';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  MessageSquare,
  UserPlus,
  UserX,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  ArrowLeft,
} from 'lucide-react';
import { useCandidate } from '../../api/hooks';
import { toast } from 'sonner';

export default function CandidateProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find candidate by ID
  const { data: candidate, isLoading } = useCandidate(id || '');
  const matchScore = 95; // Mock match score

  if (isLoading || !candidate) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  const handleShortlist = () => {
    toast.success(`${candidate.name} added to shortlist`);
  };

  const handleReject = () => {
    toast.success(`${candidate.name} rejected`);
  };

  const handleScheduleInterview = () => {
    toast.success(`Interview scheduled with ${candidate.name}`);
  };

  const handleSendMessage = () => {
    toast.success(`Message sent to ${candidate.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/recruiter/candidates')}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Search
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{candidate.name}</h1>
                      <p className="text-lg text-gray-600 mb-2">{candidate.title}</p>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {candidate.email}
                        </div>
                        {candidate.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {candidate.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {matchScore}% Match
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {candidate.availability === 'immediate' && 'Available Immediately'}
                      {candidate.availability === '1-week' && 'Available in 1 Week'}
                      {candidate.availability === '2-weeks' && 'Available in 2 Weeks'}
                      {candidate.availability === '1-month' && 'Available in 1 Month'}
                    </Badge>
                    <Badge variant="outline">{candidate.visaStatus}</Badge>
                    <Badge variant="outline">{candidate.experience} Years Experience</Badge>
                    <Badge variant="outline">
                      {candidate.salaryExpectation.min.toLocaleString()} -{' '}
                      {candidate.salaryExpectation.max.toLocaleString()} {candidate.salaryExpectation.currency}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Content */}
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
                    <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  {candidate.certifications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                      <div className="space-y-2">
                        {candidate.certifications.map((cert) => (
                          <div key={cert} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Award className="w-5 h-5 text-yellow-600" />
                            <p className="font-medium text-gray-900">{cert}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="experience" className="space-y-6 mt-6">
                  {candidate.workHistory.map((work, index) => (
                    <div key={work.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{work.title}</h3>
                          <p className="text-gray-600 mb-2">{work.company}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(work.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })}{' '}
                              -{' '}
                              {work.current
                                ? 'Present'
                                : new Date(work.endDate!).toLocaleDateString('en-US', {
                                  month: 'short',
                                  year: 'numeric',
                                })}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {work.location}
                            </div>
                            {work.current && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700">{work.description}</p>
                        </div>
                      </div>
                      {index < candidate.workHistory.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="education" className="space-y-6 mt-6">
                  {candidate.education.map((edu, index) => (
                    <div key={edu.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-600 mb-1">{edu.institution}</p>
                          <p className="text-gray-600 mb-2">{edu.field}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(edu.startDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            -{' '}
                            {new Date(edu.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                      {index < candidate.education.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="notes" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="notes">Internal Notes</Label>
                    <p className="text-sm text-gray-600 mb-2">
                      Add private notes about this candidate (only visible to your team)
                    </p>
                    <Textarea
                      id="notes"
                      placeholder="Add your notes here..."
                      rows={8}
                      className="mb-2"
                    />
                    <Button size="sm">Save Notes</Button>
                  </div>

                  <Separator />

                  <div>
                    <Label>Tags</Label>
                    <p className="text-sm text-gray-600 mb-2">
                      Add tags to organize candidates
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Strong Match</Badge>
                      <Badge variant="outline">Backup</Badge>
                      <Button variant="outline" size="sm">+ Add Tag</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <Button className="w-full" onClick={handleSendMessage}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="w-full" variant="outline" onClick={handleScheduleInterview}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button className="w-full" variant="outline" onClick={handleShortlist}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add to Shortlist
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Separator />
              <Button className="w-full" variant="destructive" onClick={handleReject}>
                <UserX className="w-4 h-4 mr-2" />
                Reject Candidate
              </Button>
            </CardContent>
          </Card>

          {/* Match Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Match Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Overall Match</span>
                    <span className="text-sm font-semibold text-gray-900">{matchScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${matchScore}%` }} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">Key Strengths:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ {candidate.experience}+ years of relevant experience</li>
                    <li>✓ Strong technical skills match</li>
                    <li>✓ Available within {candidate.availability.replace('-', ' ')}</li>
                    <li>✓ Located in {candidate.location}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profile Strength</span>
                  <span className="text-sm font-semibold text-gray-900">{candidate.profileStrength}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="text-sm font-semibold text-gray-900">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-sm font-semibold text-gray-900">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Active</span>
                  <span className="text-sm font-semibold text-gray-900">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
