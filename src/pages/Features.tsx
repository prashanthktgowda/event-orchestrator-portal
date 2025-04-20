
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, FileText, CalendarDays } from "lucide-react";

const Features = () => {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Features & Configuration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Items Management */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Item Management
            </CardTitle>
            <CardDescription>
              Add, edit, and manage catering items and equipment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Add New Item
              </Button>
              <Button className="w-full" variant="outline">
                View Item Catalog
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
            <CardDescription>
              Configure system settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                General Settings
              </Button>
              <Button className="w-full" variant="outline">
                Notification Rules
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Event Templates
            </CardTitle>
            <CardDescription>
              Manage event templates and presets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Create Template
              </Button>
              <Button className="w-full" variant="outline">
                View Templates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Management */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Schedule Management
            </CardTitle>
            <CardDescription>
              Configure scheduling rules and availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Business Hours
              </Button>
              <Button className="w-full" variant="outline">
                Blackout Dates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Features;
