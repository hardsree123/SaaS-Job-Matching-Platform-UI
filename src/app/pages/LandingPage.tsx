import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Upload,
  Zap,
  MessageSquare,
  CheckCircle,
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';
import { trustedCompanies, platformStats } from '../data/mockData';

export default function LandingPage() {
  const features = [
    {
      icon: Upload,
      title: 'Create profile / Upload CV',
      description: 'Set up your professional profile in minutes with our easy-to-use interface',
    },
    {
      icon: Zap,
      title: 'Smart matching engine',
      description: 'Our AI analyzes your skills and matches you with relevant opportunities',
    },
    {
      icon: MessageSquare,
      title: 'Recruiters contact candidates',
      description: 'Connect directly with hiring managers and receive interview invitations',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed Al Mazrouei',
      role: 'Software Engineer',
      company: 'Dubai Tech',
      content: 'I received 5 interview invitations within the first week. The platform made job searching incredibly efficient!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed1',
    },
    {
      name: 'Sara Johnson',
      role: 'Product Manager',
      company: 'Innovation Hub',
      content: 'The direct communication with recruiters saved me so much time. I found my dream job in just 3 weeks.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara1',
    },
    {
      name: 'Raj Patel',
      role: 'DevOps Engineer',
      company: 'Cloud Solutions',
      content: 'Finally, a platform that connects me with the right opportunities. The match quality is impressive!',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raj1',
    },
  ];

  const faqs = [
    {
      question: 'Does TalentMatch guarantee job offers?',
      answer: 'No, TalentMatch is a platform that facilitates connections between candidates and recruiters. While we help you get discovered and connect with opportunities, job offers are at the discretion of hiring companies.',
    },
    {
      question: 'How does the matching work?',
      answer: 'Our smart algorithm analyzes your profile, skills, experience, and preferences to match you with relevant job opportunities and interested recruiters.',
    },
    {
      question: 'Is the platform free for candidates?',
      answer: 'Yes! Creating a profile and getting matched with opportunities is completely free for candidates.',
    },
    {
      question: 'How quickly can I expect to hear from recruiters?',
      answer: 'Most candidates with complete profiles receive their first recruiter contact within 48 hours. The more complete your profile, the better your visibility.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg" />
              <span className="text-xl font-semibold text-gray-900">TalentMatch</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/candidate/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/candidate/onboarding">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Trusted by 50,000+ professionals</Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get discovered by recruiters{' '}
                <span className="text-blue-600">faster</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload your profile and get matched to the right opportunities in real time
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/candidate/onboarding">
                    I am a Candidate
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link to="/recruiter/dashboard">
                    I am a Recruiter
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Users className="w-5 h-5" />
                    <span className="text-2xl font-bold">{platformStats.activeCandidates}</span>
                  </div>
                  <p className="text-sm text-gray-600">Active Candidates</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Briefcase className="w-5 h-5" />
                    <span className="text-2xl font-bold">{platformStats.recruiters}</span>
                  </div>
                  <p className="text-sm text-gray-600">Recruiters</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">{platformStats.successfulMatches}</span>
                  </div>
                  <p className="text-sm text-gray-600">Successful Matches</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-2xl font-bold">{platformStats.averageMatchTime}</span>
                  </div>
                  <p className="text-sm text-gray-600">Avg. Match Time</p>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative">
              <Card className="p-8 shadow-xl">
                <div className="space-y-6">
                  {/* Candidate Card */}
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-blue-300 rounded w-32 mb-2" />
                      <div className="h-3 bg-blue-200 rounded w-24" />
                    </div>
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Matching Arrow */}
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Zap className="w-6 h-6" />
                      <span className="font-semibold">Smart Match</span>
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Job Cards */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <div className="w-10 h-10 bg-gray-200 rounded" />
                        <div className="flex-1">
                          <div className="h-3 bg-gray-300 rounded w-full mb-2" />
                          <div className="h-3 bg-gray-200 rounded w-3/4" />
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {90 + i}% Match
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      STEP {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8">
            Trusted by leading companies in the UAE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {trustedCompanies.map((company) => (
              <div
                key={company}
                className="text-gray-400 font-semibold text-lg"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success stories
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to accelerate your career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who found their dream job through TalentMatch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/candidate/onboarding">
                Get Started as Candidate
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white gap-2" asChild>
              <Link to="/recruiter/dashboard">
                Hire Top Talent
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg" />
                <span className="text-xl font-semibold text-white">TalentMatch</span>
              </div>
              <p className="text-sm">
                Connecting talent with opportunity through intelligent matching.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Candidates</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/candidate/dashboard">Dashboard</Link></li>
                <li><Link to="/candidate/jobs">Browse Jobs</Link></li>
                <li><Link to="/candidate/profile">Create Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Recruiters</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/recruiter/dashboard">Dashboard</Link></li>
                <li><Link to="/recruiter/post-job">Post a Job</Link></li>
                <li><Link to="/recruiter/candidates">Find Candidates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 TalentMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
