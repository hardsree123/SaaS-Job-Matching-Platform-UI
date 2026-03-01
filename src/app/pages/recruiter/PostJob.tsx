import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

const TOTAL_STEPS = 4;

export default function PostJob() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>(['React', 'Node.js', 'TypeScript']);
  const [newSkill, setNewSkill] = useState('');

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Job posted successfully!');
      navigate('/recruiter/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600">Fill in the details to attract the right candidates</p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Step {currentStep} of {TOTAL_STEPS}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="mb-2">Basic Information</CardTitle>
                <CardDescription>Tell us about the position you're hiring for</CardDescription>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle" placeholder="e.g., Senior Full Stack Developer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what makes your company great..."
                  rows={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="mb-2">Requirements</CardTitle>
                <CardDescription>Define the skills and experience needed</CardDescription>
              </div>

              <div className="space-y-2">
                <Label>Required Skills *</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a skill (e.g., React, Leadership)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-2 px-3">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minExp">Min Experience (years)</Label>
                  <Input id="minExp" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxExp">Max Experience (years)</Label>
                  <Input id="maxExp" type="number" placeholder="8" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="mb-2">Compensation & Location</CardTitle>
                <CardDescription>Set salary range and work location details</CardDescription>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minSalary">Min Salary (AED) *</Label>
                  <Input id="minSalary" type="number" placeholder="20000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSalary">Max Salary (AED) *</Label>
                  <Input id="maxSalary" type="number" placeholder="35000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="Dubai, UAE" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="visaSponsorship" className="cursor-pointer">
                      Visa Sponsorship Available
                    </Label>
                    <p className="text-sm text-gray-600">Offer visa sponsorship for this position</p>
                  </div>
                  <Switch id="visaSponsorship" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <CardTitle className="mb-2">Additional Details</CardTitle>
                <CardDescription>Final touches to optimize your job post</CardDescription>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Standard hiring</SelectItem>
                    <SelectItem value="medium">Medium - Fill within 1-2 months</SelectItem>
                    <SelectItem value="high">High - Urgent hiring needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="screeningQ1">Screening Question 1 (Optional)</Label>
                <Input id="screeningQ1" placeholder="e.g., How many years of React experience do you have?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screeningQ2">Screening Question 2 (Optional)</Label>
                <Input id="screeningQ2" placeholder="e.g., Are you authorized to work in the UAE?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screeningQ3">Screening Question 3 (Optional)</Label>
                <Input id="screeningQ3" placeholder="e.g., What is your notice period?" />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="emailNotif" className="cursor-pointer">
                      Email notifications
                    </Label>
                    <p className="text-sm text-gray-600">Get notified when candidates apply</p>
                  </div>
                  <Switch id="emailNotif" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="autoMatch" className="cursor-pointer">
                      Automatic candidate matching
                    </Label>
                    <p className="text-sm text-gray-600">Get AI-suggested candidates</p>
                  </div>
                  <Switch id="autoMatch" defaultChecked />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Ready to post!</strong> Your job will be visible to {Math.floor(Math.random() * 10000 + 40000)} qualified candidates.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-8 mt-8 border-t">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => navigate('/recruiter/dashboard')}>
                Save as Draft
              </Button>
              <Button onClick={handleNext}>
                {currentStep === TOTAL_STEPS ? 'Post Job' : 'Continue'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
