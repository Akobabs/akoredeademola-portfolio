import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Shield, Home, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminAnalyticsSection from './AdminAnalyticsSection';
import AdminOverview from './AdminOverview';
import AdminRouteManagement from './AdminRouteManagement';
import AdminContentManagement from './AdminContentManagement';
import AdminSettings from './AdminSettings';
import ChangeAdminPasswordModal from './modals/ChangeAdminPasswordModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const analytics = {
    totalVisitors: 12543,
    pageViews: 45621,
    bounceRate: '24.3%',
    avgSessionDuration: '3m 42s'
  };

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const MobileNavigation = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <div className="flex flex-col space-y-4 mt-6">
          <Button variant="outline" onClick={() => navigate('/')} className="justify-start">
            <Home className="h-4 w-4 mr-2" />
            Back to Site
          </Button>
          <Button variant="outline" onClick={onLogout} className="justify-start">
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Get current admin user email for modal
  const adminUserJson = typeof window !== "undefined" ? localStorage.getItem("admin_user") : null;
  const adminUser = adminUserJson ? JSON.parse(adminUserJson) : null;
  const adminEmail = adminUser ? adminUser.email : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-14 md:h-16 items-center px-3 md:px-6">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            <h1 className="text-lg md:text-xl font-semibold text-foreground">
              {isMobile ? 'Admin' : 'Admin Dashboard'}
            </h1>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            {isMobile ? (
              <MobileNavigation />
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/')} size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
                <Button variant="outline" onClick={onLogout} size="sm">
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-3 md:p-6 lg:p-8">
        {/* Analytics Overview */}
        <AdminOverview analytics={analytics} />

        <div className="flex justify-end mb-2">
          <Button variant="outline" size="sm" onClick={() => setChangePasswordOpen(true)}>
            Change Password
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="bg-muted w-full md:w-auto">
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-background text-xs md:text-sm px-2 md:px-3"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="routes" 
                className="data-[state=active]:bg-background text-xs md:text-sm px-2 md:px-3"
              >
                Routes
              </TabsTrigger>
              <TabsTrigger 
                value="content" 
                className="data-[state=active]:bg-background text-xs md:text-sm px-2 md:px-3"
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:bg-background text-xs md:text-sm px-2 md:px-3"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="analytics" className="space-y-4">
            <AdminAnalyticsSection />
          </TabsContent>
          
          <TabsContent value="routes" className="space-y-4">
            <AdminRouteManagement />
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <AdminContentManagement />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
      <ChangeAdminPasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        adminEmail={adminEmail}
      />
    </div>
  );
};

export default AdminDashboard;
