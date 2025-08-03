import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GraduationCap, LogOut, User, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Dashboard" }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'super-admin':
        return 'Super Administrator';
      case 'student':
        return 'Student';
      default:
        return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary';
      case 'super-admin':
        return 'bg-accent/10 text-accent';
      case 'student':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Enhanced Header with Glassmorphism */}
      <header className="sticky top-0 z-50 glass border-b border-white/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Animation */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3 group">
                <div className="bg-gradient-primary p-3 rounded-2xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold gradient-text">
                    ExamPro
                  </h1>
                  <p className="text-xs text-muted-foreground font-medium">{title}</p>
                </div>
              </div>
            </div>

            {/* Enhanced User Menu */}
            <div className="flex items-center space-x-4">
              {/* Status Indicator */}
              <div className="hidden sm:flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Online</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-12 w-12 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold text-lg">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 mr-4 glass border-white/20 backdrop-blur-xl" align="end">
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold leading-none mb-1">{user?.name}</p>
                        <p className="text-sm text-muted-foreground mb-2 truncate">
                          {user?.email}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role || '')}`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {getRoleDisplay(user?.role || '')}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="p-3 hover:bg-white/10 transition-colors duration-200">
                    <User className="mr-3 h-4 w-4" />
                    <div>
                      <div className="font-medium">Profile Settings</div>
                      <div className="text-xs text-muted-foreground">Manage your account</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="p-3 text-destructive hover:bg-destructive/10 transition-colors duration-200"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <div>
                      <div className="font-medium">Sign Out</div>
                      <div className="text-xs text-muted-foreground">End your session</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Animation */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl animate-floating"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent/5 rounded-full blur-xl animate-floating" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-success/5 rounded-full blur-xl animate-floating" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-warning/5 rounded-full blur-xl animate-floating" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
};

export default Layout;