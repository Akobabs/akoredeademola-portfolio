
import { useState } from 'react';
import { Home, Users, FileText, BarChart3, Settings, Globe, Edit, Eye, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminRouteManagement = () => {
  const [routes] = useState([
    { id: 1, path: '/', name: 'Home', icon: Home, status: 'active', views: 2543, order: 1 },
    { id: 2, path: '/about', name: 'About', icon: Users, status: 'active', views: 1876, order: 2 },
    { id: 3, path: '/blog', name: 'Blog', icon: FileText, status: 'active', views: 1432, order: 3 },
    { id: 4, path: '/projects', name: 'Projects', icon: BarChart3, status: 'active', views: 2109, order: 4 },
    { id: 5, path: '/skills', name: 'Skills', icon: Settings, status: 'active', views: 1654, order: 5 },
    { id: 6, path: '/publications', name: 'Publications', icon: FileText, status: 'active', views: 987, order: 6 },
    { id: 7, path: '/contact', name: 'Contact', icon: Globe, status: 'active', views: 1321, order: 7 },
  ]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Route Management</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monitor and manage all application routes and their performance
            </CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Route
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {routes.map((route) => {
            const IconComponent = route.icon;
            return (
              <div
                key={route.path}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">{route.name}</div>
                    <div className="text-sm text-muted-foreground">{route.path}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                    {route.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {route.views.toLocaleString()} views
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRouteManagement;
