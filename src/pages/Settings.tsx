
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Email Notifications</label>
              <p className="text-sm text-muted-foreground">Configure your email notification preferences</p>
            </div>
            <Button variant="outline">Configure Notifications</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Company Information</label>
              <p className="text-sm text-muted-foreground">Update your company details and branding</p>
            </div>
            <Button variant="outline">Edit Details</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
