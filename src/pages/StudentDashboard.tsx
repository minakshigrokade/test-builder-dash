import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, PlayCircle, Calendar, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const upcomingFeatures = [
    {
      title: 'Take Exams',
      description: 'Access and complete assigned examinations',
      icon: PlayCircle,
      color: 'text-primary'
    },
    {
      title: 'View Results',
      description: 'Check your exam scores and detailed feedback',
      icon: Award,
      color: 'text-success'
    },
    {
      title: 'Exam Schedule',
      description: 'View upcoming exams and important dates',
      icon: Calendar,
      color: 'text-warning'
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning progress and performance trends',
      icon: TrendingUp,
      color: 'text-accent'
    }
  ];

  const mockExams = [
    {
      title: 'Mathematics - Algebra Basics',
      status: 'upcoming',
      date: '2024-01-15',
      duration: '90 minutes',
      questions: 25
    },
    {
      title: 'Science - Physics Fundamentals',
      status: 'completed',
      date: '2024-01-10',
      duration: '60 minutes',
      score: '85%'
    },
    {
      title: 'English - Grammar & Comprehension',
      status: 'available',
      date: '2024-01-12',
      duration: '45 minutes',
      questions: 20
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'available':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Layout title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-white/90 text-lg">
                Your learning journey starts here
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Exams Completed</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Award className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold">87%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Banner */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="h-12 w-12 text-warning" />
              <div>
                <h2 className="text-2xl font-bold text-warning">Coming Soon</h2>
                <p className="text-muted-foreground">
                  Student portal functionality is currently under development. 
                  Exam taking and progress tracking features will be available soon.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planned Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingFeatures.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mock Exam List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Exams</CardTitle>
            <CardDescription>
              Preview of how your exams will be displayed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockExams.map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{exam.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{exam.date}</span>
                      <span>{exam.duration}</span>
                      {exam.questions && <span>{exam.questions} questions</span>}
                      {exam.score && <span className="text-success font-medium">{exam.score}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                    <Button size="sm" variant="outline" disabled>
                      {exam.status === 'completed' ? 'View Results' : 
                       exam.status === 'available' ? 'Start Exam' : 'Scheduled'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;