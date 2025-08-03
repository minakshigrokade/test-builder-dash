import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Settings, Database, BarChart3, Clock } from 'lucide-react';

const SuperAdminDashboard = () => {
  const comingSoonFeatures = [
    {
      title: 'User Management',
      description: 'Manage all system users, roles, and permissions',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'System Analytics',
      description: 'View comprehensive system usage and performance metrics',
      icon: BarChart3,
      color: 'text-accent'
    },
    {
      title: 'Database Management',
      description: 'Monitor and manage system database operations',
      icon: Database,
      color: 'text-warning'
    },
    {
      title: 'System Configuration',
      description: 'Configure global system settings and parameters',
      icon: Settings,
      color: 'text-success'
    }
  ];

  return (
    <Layout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-white/90 text-lg">
                Complete system control and monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="h-12 w-12 text-warning" />
              <div>
                <h2 className="text-2xl font-bold text-warning">Coming Soon</h2>
                <p className="text-muted-foreground">
                  Super Admin functionality is currently under development. 
                  Advanced system management features will be available in the next release.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planned Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comingSoonFeatures.map((feature) => (
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

        {/* Current Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle>Current Capabilities</CardTitle>
            <CardDescription>
              What's available in this release
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Access to Admin Dashboard functionality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Role-based authentication system</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Enhanced user management (Coming Soon)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>System monitoring tools (Coming Soon)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;