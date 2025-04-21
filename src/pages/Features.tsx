
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, FileText, Calendar as CalendarDays } from "lucide-react";
import { useState } from "react";
import { FeatureModal } from "@/components/FeatureModal";

const featureButtons = [
  {
    group: "Item Management",
    title: "Add New Item",
    desc: "Add items to your catering inventory.",
    buttonColor: "bg-[#8B5CF6] text-white hover:bg-[#7E69AB]",
    modalDesc: "Here you can add a new catering item. (Functionality not implemented.)"
  },
  {
    group: "Item Management",
    title: "View Item Catalog",
    desc: "Browse and manage available items.",
    buttonColor: "bg-[#E5DEFF] text-[#333] hover:bg-[#d6bcfa]",
    modalDesc: "This would show your item catalog. (Functionality not implemented.)"
  },
  {
    group: "System Configuration",
    title: "General Settings",
    desc: "Update general system preferences.",
    buttonColor: "bg-[#7E69AB] text-white hover:bg-[#6E59A5]",
    modalDesc: "Access to general system configuration. (Functionality not implemented.)"
  },
  {
    group: "System Configuration",
    title: "Notification Rules",
    desc: "Configure notification triggers.",
    buttonColor: "bg-[#FEC6A1] text-[#403E43] hover:bg-[#FEC6A1]/80",
    modalDesc: "Notification rule settings (not implemented)."
  },
  {
    group: "Event Templates",
    title: "Create Template",
    desc: "Design a new event template.",
    buttonColor: "bg-[#FDE1D3] text-[#403E43] hover:bg-[#fcd1af]",
    modalDesc: "Create and save new event templates here. (Functionality not implemented.)"
  },
  {
    group: "Event Templates",
    title: "View Templates",
    desc: "View and manage event templates.",
    buttonColor: "bg-[#D3E4FD] text-[#403E43] hover:bg-[#D6BCFA]",
    modalDesc: "See all your saved event templates. (Functionality not implemented.)"
  },
  {
    group: "Schedule Management",
    title: "Business Hours",
    desc: "Set available hours for scheduling.",
    buttonColor: "bg-[#F2FCE2] text-[#403E43] hover:bg-[#D6BCFA]",
    modalDesc: "Manage your business hours here. (Functionality not implemented.)"
  },
  {
    group: "Schedule Management",
    title: "Blackout Dates",
    desc: "Block out dates for scheduling.",
    buttonColor: "bg-[#FEF7CD] text-[#403E43] hover:bg-[#FDE1D3]",
    modalDesc: "Configure unavailable dates (blackout dates). (Functionality not implemented.)"
  }
];

const featureGroups = [
  {
    icon: <Plus className="h-5 w-5" />,
    group: "Item Management",
    desc: "Add, edit, and manage catering items and equipment"
  },
  {
    icon: <Settings className="h-5 w-5" />,
    group: "System Configuration",
    desc: "Configure system settings and preferences"
  },
  {
    icon: <FileText className="h-5 w-5" />,
    group: "Event Templates",
    desc: "Manage event templates and presets"
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    group: "Schedule Management",
    desc: "Configure scheduling rules and availability"
  }
];

export default function Features() {
  // Modal state
  const [modal, setModal] = useState<{open: boolean, idx: number | null}>({open: false, idx: null});

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Features & Configuration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureGroups.map(g => (
          <Card key={g.group} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {g.icon}
                {g.group}
              </CardTitle>
              <CardDescription>{g.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureButtons.filter(b => b.group === g.group).map((b, idx) => {
                  // Index for modal: use order in the featureButtons array
                  const modalIdx = featureButtons.findIndex(btn => btn.title === b.title && btn.group === b.group);
                  return (
                    <Button
                      key={b.title}
                      className={`w-full ${b.buttonColor} transition-all`}
                      variant="outline"
                      onClick={() => setModal({open: true, idx: modalIdx})}
                    >
                      {b.title}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {modal.open && modal.idx !== null && (
        <FeatureModal
          open={modal.open}
          onOpenChange={open => setModal({open, idx: open ? modal.idx : null})}
          title={featureButtons[modal.idx].title}
          description={featureButtons[modal.idx].modalDesc}
        />
      )}
    </div>
  );
}

