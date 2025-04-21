
import { Plus, Settings, FileText, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const cardSections = [
  {
    icon: <Plus className="h-7 w-7 mr-1 text-purple-700" />,
    title: "Item Management",
    desc: "Add, edit, and manage catering items and equipment",
    actions: [
      {
        text: "Add New Item",
        url: "/add-item",
        color: "bg-[#9b2cff] text-white hover:bg-[#7D26D8] focus:ring-2 focus:ring-[#9b2cff]",
      },
      {
        text: "View Item Catalog",
        url: "/item-catalog",
        color: "bg-[#ede6fc] text-[#6E59A5] hover:bg-[#d6bcfa] focus:ring-2 focus:ring-[#ede6fc]",
      },
    ],
  },
  {
    icon: <Settings className="h-7 w-7 mr-1 text-purple-900" />,
    title: "System Configuration",
    desc: "Configure system settings and preferences",
    actions: [
      {
        text: "General Settings",
        url: "/general-settings",
        color: "bg-[#7E69AB] text-white hover:bg-[#6E59A5] focus:ring-2 focus:ring-[#7E69AB]",
      },
      {
        text: "Notification Rules",
        url: "/notification-rules",
        color: "bg-[#FEC6A1] text-[#403E43] hover:bg-[#FEC6A1]/80 focus:ring-2 focus:ring-[#FEC6A1]",
      },
    ],
  },
  {
    icon: <FileText className="h-7 w-7 mr-1 text-blue-700" />,
    title: "Event Templates",
    desc: "Manage event templates and presets",
    actions: [
      {
        text: "Create Template",
        url: "/create-template",
        color: "bg-[#ffe2d1] text-[#403E43] hover:bg-[#fcd1af] focus:ring-2 focus:ring-[#ffe2d1]",
      },
      {
        text: "View Templates",
        url: "/view-templates",
        color: "bg-[#D3E4FD] text-[#403E43] hover:bg-[#bad3f7] focus:ring-2 focus:ring-[#D3E4FD]",
      },
    ],
  },
  {
    icon: <Calendar className="h-7 w-7 mr-1 text-green-700" />,
    title: "Schedule Management",
    desc: "Configure scheduling rules and availability",
    actions: [
      {
        text: "Business Hours",
        url: "/business-hours",
        color: "bg-[#F2FCE2] text-[#27662D] hover:bg-[#e9f9cf] focus:ring-2 focus:ring-[#F2FCE2]",
      },
      {
        text: "Blackout Dates",
        url: "/blackout-dates",
        color: "bg-[#FEF7CD] text-[#705E2A] hover:bg-[#FFF7B2] focus:ring-2 focus:ring-[#FEF7CD]",
      },
    ],
  },
];

export default function Features() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-extrabold mb-8">Features & Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cardSections.map((section) => (
          <Card
            key={section.title}
            className="rounded-xl border shadow-none animate-fade-in transition-all"
          >
            <CardContent className="p-7">
              <div className="flex items-center mb-1">
                <div>{section.icon}</div>
                <div className="text-xl font-extrabold ml-1">{section.title}</div>
              </div>
              <div className="text-muted-foreground font-medium mb-6 ml-[2.5rem] -mt-1">{section.desc}</div>
              <div className="flex flex-col gap-3 mt-2">
                {section.actions.map((action) => (
                  <Button
                    asChild
                    key={action.text}
                    className={`rounded-md font-semibold text-base w-full h-12 transition-all ${action.color} hover-scale`}
                  >
                    <Link to={action.url}>{action.text}</Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
