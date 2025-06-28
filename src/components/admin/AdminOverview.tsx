
import { BarChart3, Users, Eye, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminOverviewProps {
  analytics: {
    totalVisitors: number;
    pageViews: number;
    bounceRate: string;
    avgSessionDuration: string;
  };
}

const AdminOverview = ({ analytics }: AdminOverviewProps) => {
  return (
    <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
          <CardTitle className="text-xs md:text-sm font-medium text-foreground truncate">
            Total Visitors
          </CardTitle>
          <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <div className="text-lg md:text-2xl font-bold text-foreground">
            {analytics.totalVisitors.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
          <CardTitle className="text-xs md:text-sm font-medium text-foreground truncate">
            Page Views
          </CardTitle>
          <Eye className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <div className="text-lg md:text-2xl font-bold text-foreground">
            {analytics.pageViews.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
          <CardTitle className="text-xs md:text-sm font-medium text-foreground truncate">
            Bounce Rate
          </CardTitle>
          <Activity className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <div className="text-lg md:text-2xl font-bold text-foreground">
            {analytics.bounceRate}
          </div>
          <p className="text-xs text-muted-foreground">-2% from last month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 md:p-6">
          <CardTitle className="text-xs md:text-sm font-medium text-foreground truncate">
            Avg. Session
          </CardTitle>
          <BarChart3 className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-0">
          <div className="text-lg md:text-2xl font-bold text-foreground">
            {analytics.avgSessionDuration}
          </div>
          <p className="text-xs text-muted-foreground">+15s from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
