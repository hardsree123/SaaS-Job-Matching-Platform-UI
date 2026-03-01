import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Slider } from '../../components/ui/slider';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  Eye,
  UserPlus,
  Filter,
  X,
  Calendar,
} from 'lucide-react';
import { useCandidateMatches } from '../../api/hooks';
import { toast } from 'sonner';

export default function CandidateSearch() {
  const { data: matches = [], isLoading } = useCandidateMatches();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [experienceRange, setExperienceRange] = useState([3, 10]);
  const [salaryRange, setSalaryRange] = useState([10000, 50000]);

  const handleShortlist = (candidateName: string) => {
    toast.success(`${candidateName} added to shortlist`);
  };

  const handleMessage = (candidateName: string) => {
    toast.success(`Message sent to ${candidateName}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Candidates</h1>
        <p className="text-gray-600">Search and discover top talent for your roles</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by skills, role, or keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <Card className="w-80 flex-shrink-0 h-fit">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Range */}
              <div className="space-y-3">
                <Label>Years of Experience</Label>
                <Slider
                  value={experienceRange}
                  onValueChange={setExperienceRange}
                  max={15}
                  min={0}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{experienceRange[0]} years</span>
                  <span>{experienceRange[1]} years</span>
                </div>
              </div>

              {/* Salary Expectations */}
              <div className="space-y-3">
                <Label>Salary Expectations (AED)</Label>
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  max={50000}
                  min={0}
                  step={1000}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{salaryRange[0].toLocaleString()}</span>
                  <span>{salaryRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any availability</SelectItem>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1-week">Within 1 week</SelectItem>
                    <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Visa Status */}
              <div className="space-y-3">
                <Label>Visa Status</Label>
                <div className="space-y-2">
                  {['UAE National', 'Residence Visa', 'Visit Visa', 'Need Sponsorship'].map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <Checkbox id={status} />
                      <label htmlFor={status} className="text-sm text-gray-700 cursor-pointer">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <Label>Education Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any education</SelectItem>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full">Clear All Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidate Results */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            {isLoading ? (
              <p className="text-sm text-gray-600">Loading candidates...</p>
            ) : (
              <p className="text-sm text-gray-600">{matches.length} candidates found</p>
            )}
            <Select defaultValue="best-match">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-match">Best Match</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="experience-high">Experience: High to Low</SelectItem>
                <SelectItem value="experience-low">Experience: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {matches.map((match) => {
            const candidate = match.candidate;
            return (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-20 h-20 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-xl text-gray-900">{candidate.name}</h3>
                            {candidate.isOpenToOpportunities && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                                Available
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 font-medium mb-1">{candidate.title}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {candidate.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {match.matchScore}% Match
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 line-clamp-2">{candidate.summary}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 6).map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 6 && (
                          <Badge variant="secondary">+{candidate.skills.length - 6} more</Badge>
                        )}
                      </div>

                      {/* Match Reasons */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Why this is a good match:</p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {match.matchReasons.slice(0, 2).map((reason, index) => (
                            <li key={index}>• {reason}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {candidate.experience} years exp
                          </div>
                          <div>
                            {candidate.salaryExpectation.min.toLocaleString()} -{' '}
                            {candidate.salaryExpectation.max.toLocaleString()} {candidate.salaryExpectation.currency}
                          </div>
                          <Badge variant="outline" className="capitalize text-xs">
                            {candidate.availability.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/recruiter/candidates/${candidate.id}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              View Profile
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShortlist(candidate.name)}
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Shortlist
                          </Button>
                          <Button size="sm" onClick={() => handleMessage(candidate.name)}>
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Load More */}
          <div className="flex justify-center pt-4">
            <Button variant="outline">Load More Candidates</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
