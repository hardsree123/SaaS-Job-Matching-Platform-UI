import { Outlet, Link, useLocation } from 'react-router';
import { Users, Briefcase, MessageSquare, Bell, Settings, LogOut, Home, Plus, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import { DemoBanner } from '../components/ui/DemoBanner';

export default function RecruiterLayout() {
  const location = useLocation();
  const unreadCount = 5;

  const navigation = [
    { name: 'Dashboard', href: '/recruiter/dashboard', icon: Home },
    { name: 'Find Candidates', href: '/recruiter/candidates', icon: Users },
    { name: 'Hiring Pipeline', href: '/recruiter/pipeline', icon: BarChart3 },
    { name: 'Post a Job', href: '/recruiter/post-job', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoBanner />
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">
                  DM
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-gray-900 block leading-none">DibsMatch</span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-tight">Claim your next role</span>
                </div>
              </Link>
              <Badge variant="secondary" className="hidden sm:flex">Recruiter ATS</Badge>
            </div>

            <div className="flex items-center gap-4">
              {/* Messages */}
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Michael Chen</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>Michael Chen</div>
                    <div className="text-xs text-gray-500 font-normal">Emirates Digital Bank</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Briefcase className="w-4 h-4 mr-2" />
                    My Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
