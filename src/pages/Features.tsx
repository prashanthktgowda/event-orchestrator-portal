
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FileText, Settings, Bell, FilePlus, List, Calendar, CalendarX } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: <Plus className="h-6 w-6 text-purple-700"/>,
    group: "Item Management",
    desc: "Add, edit, and manage catering items and equipment",
    features: [
      {
        title: "Add New Item",
        url: "/add-item",
        buttonClass: "bg-[#9b87f5] text-white hover:bg-[#8B5CF6]",
      },
      {
        title: "View Item Catalog",
        url: "/item-catalog",
        buttonClass: "bg-[#ede6fc] text-[#6E59A5] hover:bg-[#d6bcfa]",
      },
    ],
  },
  {
    icon: <Settings className="h-6 w-6 text-purple-900"/>,
    group: "System Configuration",
    desc: "Configure system settings and preferences",
    features: [
      {
        title: "General Settings",
        url: "/general-settings",
        buttonClass: "bg-[#7E69AB] text-white hover:bg-[#6E59A5]",
      },
      {
        title: "Notification Rules",
        url: "/notification-rules",
        buttonClass: "bg-[#FEC6A1] text-[#403E43] hover:bg-[#FEC6A1]/80",
      },
    ]
  },
  {
    icon: <FileText className="h-6 w-6 text-blue-600"/>,
    group: "Event Templates",
    desc: "Manage event templates and presets",
    features: [
      {
        title: "Create Template",
        url: "/create-template",
        buttonClass: "bg-[#FDE1D3] text-[#403E43] hover:bg-[#fcd1af]",
      },
      {
        title: "View Templates",
        url: "/view-templates",
        buttonClass: "bg-[#D3E4FD] text-[#403E43] hover:bg-[#bad3f7]",
      },
    ]
  },
  {
    icon: <Calendar className="h-6 w-6 text-green-700"/>,
    group: "Schedule Management",
    desc: "Configure scheduling rules and availability",
    features: [
      {
        title: "Business Hours",
        url: "/business-hours",
        buttonClass: "bg-[#F2FCE2] text-[#27662D] hover:bg-[#e9f9cf]",
      },
      {
        title: "Blackout Dates",
        url: "/blackout-dates",
        buttonClass: "bg-[#FEF7CD] text-[#705E2A] hover:bg-[#FFF7B2]",
      }
    ]
  },
];

export default function Features() {
  return (
    <div className="container py-8 space-y-10">
      <h1 className="text-3xl font-bold">Features & Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <div className="space-y-8">
          {cards.slice(0, 2).map((g) => (
            <Card key={g.group} className="rounded-xl border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-extrabold">{g.icon} {g.group}</CardTitle>
                <CardDescription className="text-base">{g.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {g.features.map((f) => (
                    <Link to={f.url} key={f.title}>
                      <button
                        className={`w-full h-11 rounded-md font-semibold text-base focus:outline-none focus:ring-2 transition-all mb-1 ${f.buttonClass}`}
                      >
                        {f.title}
                      </button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-8">
          {cards.slice(2).map((g) => (
            <Card key={g.group} className="rounded-xl border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-extrabold">{g.icon} {g.group}</CardTitle>
                <CardDescription className="text-base">{g.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {g.features.map((f) => (
                    <Link to={f.url} key={f.title}>
                      <button
                        className={`w-full h-11 rounded-md font-semibold text-base focus:outline-none focus:ring-2 transition-all mb-1 ${f.buttonClass}`}
                      >
                        {f.title}
                      </button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
