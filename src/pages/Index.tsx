import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ArrowRight, Users, BookOpen, Shield } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'super-admin':
          navigate('/super-admin');
          break;
        case 'student':
          navigate('/student');
          break;
      }
    }
  }, [isAuthenticated, user, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: 'Smart Exam Creation',
      description: 'Create exams easily with CSV upload or manual entry. Support for multiple question types.',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Secure authentication system with different access levels for admins, super admins, and students.',
      color: 'text-accent'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with modern security practices and reliable infrastructure for educational institutions.',
      color: 'text-success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            ExamPro
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Professional Exam Management System for Modern Education
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Streamline your examination process with our comprehensive platform designed for administrators, educators, and students.
          </p>
          
          <Button 
            onClick={() => navigate('/login')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="backdrop-blur-sm bg-white/95 border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-secondary/20 p-4 rounded-2xl">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Examination Process?
              </h2>
              <p className="text-white/90 mb-6">
                Join educational institutions worldwide using ExamPro to create, manage, and deliver assessments efficiently.
              </p>
              <Button 
                onClick={() => navigate('/login')}
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Sign In to Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
