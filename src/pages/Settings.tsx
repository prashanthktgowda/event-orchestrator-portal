
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bell, Building2, Calendar, FileCheck, ShieldCheck, Users } from "lucide-react";

const Settings = () => {
  const settingsCategories = [
    {
      title: "Organization Details",
      description: "Update your company details and branding",
      icon: <Building2 className="h-5 w-5" />,
      link: "/general-settings"
    },
    {
      title: "Notification Settings",
      description: "Configure your email notification preferences",
      icon: <Bell className="h-5 w-5" />,
      link: "/notification-rules"
    },
    {
      title: "Blackout Dates",
      description: "Block specific dates from being booked",
      icon: <Calendar className="h-5 w-5" />,
      link: "/blackout-dates"
    },
    {
      title: "Templates",
      description: "Manage your event templates",
      icon: <FileCheck className="h-5 w-5" />,
      link: "/view-templates"
    },
    {
      title: "Item Catalog",
      description: "Manage your catering items",
      icon: <ShieldCheck className="h-5 w-5" />,
      link: "/item-catalog"
    },
    {
      title: "Staff Management",
      description: "Manage your catering staff",
      icon: <Users className="h-5 w-5" />,
      link: "/staff"
    }
  ];

  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {settingsCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
              <Button variant="outline" asChild>
                <Link to={category.link}>Configure</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
