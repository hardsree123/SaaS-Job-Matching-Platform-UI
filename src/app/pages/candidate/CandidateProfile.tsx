import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Edit,
  Award,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useCandidate } from '../../api/hooks';
import { useAuthStore } from '../../store/useAuthStore';
import { mockCandidates } from '../../data/mockData';

export default function CandidateProfile() {
  const { user } = useAuthStore();
  const { data: candidateData, isLoading } = useCandidate(user?.id || '1');
  
  // Use resolved candidate or fallback to default mock candidate for seamless demo flow
  const candidate = candidateData || mockCandidates.find((c) => c.userId === user?.id || c.id === user?.id) || mockCandidates[0];

  if (isLoading && !candidate) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <div className="text-gray-500 font-medium text-sm">Loading Candidate Profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-32 h-32 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{candidate.name}</h1>
                  <p className="text-xl text-gray-600 mb-3">{candidate.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {candidate.availability === 'immediate' && 'Available Immediately'}
                  {candidate.availability === '1-week' && 'Available in 1 Week'}
                  {candidate.availability === '2-weeks' && 'Available in 2 Weeks'}
                  {candidate.availability === '1-month' && 'Available in 1 Month'}
                  {candidate.availability === 'not-looking' && 'Not Looking'}
                </Badge>
                <Badge variant="outline">{candidate.visaStatus}</Badge>
                <Badge variant="outline">{candidate.experience} Years Experience</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
          </div>
          <div className="space-y-6">
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
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
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
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          </div>
          <div className="space-y-6">
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
                      {edu.current
                        ? 'Present'
                        : new Date(edu.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                    </div>
                  </div>
                </div>
                {index < candidate.education.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      {candidate.certifications.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
            </div>
            <div className="space-y-3">
              {candidate.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="font-medium text-gray-900">{cert}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Preferred Roles</p>
              <div className="flex flex-wrap gap-2">
                {candidate.preferredRoles.map((role) => (
                  <Badge key={role} variant="outline">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Expected Salary</p>
              <p className="font-medium text-gray-900">
                {candidate.salaryExpectation.min.toLocaleString()} -{' '}
                {candidate.salaryExpectation.max.toLocaleString()} {candidate.salaryExpectation.currency}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Public View Button */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          View Public Profile
        </Button>
      </div>
    </div>
  );
}
