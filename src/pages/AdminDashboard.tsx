import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Plus, 
  FileSpreadsheet, 
  BookOpen, 
  Users, 
  BarChart3, 
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Zap,
  Target,
  CheckCircle2,
  ArrowUpRight,
  Star
} from 'lucide-react';
import CreateExamCSV from '@/components/admin/CreateExamCSV';
import CreateExamManual from '@/components/admin/CreateExamManual';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Exams',
      value: '24',
      change: '+12%',
      description: 'Active examinations',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: 'up'
    },
    {
      title: 'Students Enrolled',
      value: '1,247',
      change: '+23%',
      description: 'Across all exams',
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: '89%',
      change: '+5%',
      description: 'Average completion',
      icon: Target,
      color: 'text-success',
      bgColor: 'bg-success/10',
      trend: 'up'
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: '+8%',
      description: 'Student pass rate',
      icon: Award,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Exam',
      description: 'Start building your next assessment',
      icon: Plus,
      color: 'text-primary',
      bgGradient: 'bg-gradient-primary',
      action: () => setActiveTab('create-exam')
    },
    {
      title: 'Import from CSV',
      description: 'Upload questions in bulk',
      icon: Upload,
      color: 'text-accent',
      bgGradient: 'bg-gradient-to-r from-accent to-primary',
      action: () => setActiveTab('create-exam')
    },
    {
      title: 'Analytics Dashboard',
      description: 'View detailed reports',
      icon: BarChart3,
      color: 'text-success',
      bgGradient: 'bg-gradient-to-r from-success to-accent'
    },
    {
      title: 'Student Management',
      description: 'Manage enrolled students',
      icon: Users,
      color: 'text-warning',
      bgGradient: 'bg-gradient-to-r from-warning to-success'
    }
  ];

  const recentActivity = [
    {
      title: 'Advanced Mathematics Exam Created',
      description: '45 questions • Multiple choice',
      time: '2 hours ago',
      status: 'completed',
      icon: CheckCircle2
    },
    {
      title: '156 Students Completed Physics Basics',
      description: 'Average score: 87%',
      time: '4 hours ago',
      status: 'success',
      icon: Star
    },
    {
      title: 'Chemistry Lab Assessment Scheduled',
      description: 'Tomorrow at 10:00 AM',
      time: '6 hours ago',
      status: 'pending',
      icon: Clock
    },
    {
      title: 'New Batch of 45 Students Enrolled',
      description: 'Spring 2024 Computer Science',
      time: '1 day ago',
      status: 'info',
      icon: Users
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'success': return 'bg-accent/10 text-accent border-accent/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'info': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <Layout title="Admin Dashboard">
      <div className="space-y-8">
        {/* Hero Section with Gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-heading font-bold mb-2">
                      Welcome Back, Admin! 
                    </h1>
                    <p className="text-white/90 text-lg">
                      Create amazing exams and track student success with our powerful tools.
                    </p>
                  </div>
                </div>
                <Button 
                  className="btn-glass text-white border-white/20 hover:bg-white/20"
                  onClick={() => setActiveTab('create-exam')}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Start Creating
                </Button>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-white/80 text-sm">System Uptime</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-white/80 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-20">
            <div className="w-32 h-32 bg-white rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="interactive-card hover-scale group overflow-hidden border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-success text-sm font-medium">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground/80">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="create-exam"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Exam
            </TabsTrigger>
            <TabsTrigger 
              value="manage-exams"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Manage Exams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 mt-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-heading">Quick Actions</CardTitle>
                    <CardDescription>Jump into the most common tasks</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    4 Available
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={action.title}
                      onClick={action.action}
                      className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white border border-border/50"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className={`inline-flex p-3 rounded-xl mb-4 ${action.color === 'text-primary' ? 'bg-primary/10' : action.color === 'text-accent' ? 'bg-accent/10' : action.color === 'text-success' ? 'bg-success/10' : 'bg-warning/10'}`}>
                          <action.icon className={`h-6 w-6 ${action.color}`} />
                        </div>
                        <h3 className="font-heading font-semibold mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border/30 hover:bg-white/80 transition-all duration-300"
                    >
                      <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm mb-1">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-exam" className="mt-8">
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-gradient-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-heading gradient-text">Create Your Perfect Exam</CardTitle>
                  <CardDescription>Choose your preferred method to build engaging assessments</CardDescription>
                </CardHeader>
              </Card>

              <Tabs defaultValue="csv" className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm">
                  <TabsTrigger 
                    value="csv" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="font-medium">Upload CSV</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="manual" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">Manual Entry</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="csv" className="mt-8">
                  <CreateExamCSV />
                </TabsContent>
                
                <TabsContent value="manual" className="mt-8">
                  <CreateExamManual />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="manage-exams" className="mt-8">
            <Card className="border-0 shadow-lg bg-gradient-card">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-3xl">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-heading">Exam Management Hub</CardTitle>
                <CardDescription>
                  Comprehensive exam management features coming in the next release
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-white/50 border border-border/30">
                    <div className="bg-primary/10 p-3 rounded-xl w-fit mx-auto mb-3">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Detailed performance insights</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/50 border border-border/30">
                    <div className="bg-accent/10 p-3 rounded-xl w-fit mx-auto mb-3">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Student Groups</h3>
                    <p className="text-sm text-muted-foreground">Organize and manage cohorts</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/50 border border-border/30">
                    <div className="bg-success/10 p-3 rounded-xl w-fit mx-auto mb-3">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="font-semibold mb-2">Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Advanced exam scheduling</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                  Coming Soon in v2.0
                </Badge>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;