import { useState } from 'react';
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
  DollarSign,
  Calendar,
  Star,
  Bookmark,
  BookmarkCheck,
  Filter,
  X,
} from 'lucide-react';
import { useJobs } from '../../api/hooks';
import { toast } from 'sonner';

export default function JobDiscovery() {
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 50000]);

  const handleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.success('Job removed from saved');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success('Job saved successfully');
    }
  };

  const handleQuickApply = (jobTitle: string) => {
    toast.success(`Application submitted for ${jobTitle}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
        <p className="text-gray-600">Discover jobs matched to your skills and preferences</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by job title, skills, or company..."
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
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label>Salary Range (AED)</Label>
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

              {/* Experience Level */}
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any experience</SelectItem>
                    <SelectItem value="entry">Entry level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                    <SelectItem value="lead">Lead (8+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <Label>Job Type</Label>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox id={type} />
                      <label htmlFor={type} className="text-sm text-gray-700 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Type */}
              <div className="space-y-3">
                <Label>Work Type</Label>
                <div className="space-y-2">
                  {['Remote', 'On-site', 'Hybrid'].map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox id={type} />
                      <label htmlFor={type} className="text-sm text-gray-700 cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label>Industry</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All industries</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full">Clear All Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            {isLoadingJobs ? (
              <p className="text-sm text-gray-600">Loading jobs...</p>
            ) : (
              <p className="text-sm text-gray-600">{jobs.length} jobs found</p>
            )}
            <Select defaultValue="best-match">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-match">Best Match</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                <SelectItem value="salary-low">Salary: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {jobs.map((job) => {
            const matchScore = Math.floor(Math.random() * 10) + 88;
            const isSaved = savedJobs.includes(job.id);

            return (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-16 h-16 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-xl text-gray-900">{job.title}</h3>
                            {job.urgency === 'high' && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 font-medium">{job.companyName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {matchScore}% Match
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSaveJob(job.id)}
                          >
                            {isSaved ? (
                              <BookmarkCheck className="w-5 h-5 text-blue-600 fill-current" />
                            ) : (
                              <Bookmark className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
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
                        <Badge variant="outline" className="capitalize">
                          {job.jobType}
                        </Badge>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Posted {new Date(job.postedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                          {job.visaSponsorship && (
                            <Badge variant="outline" className="text-xs">
                              Visa Sponsorship
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm" onClick={() => handleQuickApply(job.title)}>
                            Quick Apply
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
            <Button variant="outline">Load More Jobs</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
