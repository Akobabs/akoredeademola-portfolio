
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AdminSettings = () => {
  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-foreground text-lg md:text-xl">System Settings</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Configure system-wide settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Site Title</label>
              <Input 
                defaultValue="Akorede Ademola Portfolio" 
                className="bg-background text-foreground text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Site Description</label>
              <Input 
                defaultValue="Data Scientist & Game Developer" 
                className="bg-background text-foreground text-sm" 
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm" className="w-full md:w-auto">
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
