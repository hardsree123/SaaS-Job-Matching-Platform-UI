import { Outlet, Link, useLocation } from 'react-router';
import { User, Briefcase, MessageSquare, Bell, Settings, LogOut, Home, FileText, Eye } from 'lucide-react';
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
import { useAuthStore } from '../store/useAuthStore';
import { DemoBanner } from '../components/ui/DemoBanner';

export default function CandidateLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const unreadCount = 3;

  const navigation = [
    { name: 'Dashboard', href: '/candidate/dashboard', icon: Home },
    { name: 'Find Jobs', href: '/candidate/jobs', icon: Briefcase },
    { name: 'Recruiter Interest', href: '/candidate/interest', icon: Eye },
    { name: 'Applications', href: '/candidate/applications', icon: FileText },
    { name: 'My Profile', href: '/candidate/profile', icon: User },
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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-400 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md">
                  DM
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-gray-900 block leading-none">DibsMatch</span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-tight">Claim your next role</span>
                </div>
              </Link>
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
                      <AvatarImage src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"} />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user?.name || 'Ahmed Hassan'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/candidate/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/" onClick={logout}>
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
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
