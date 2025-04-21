
import { Calendar, CheckCircle, Timer, XCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { CateringEvent } from "@/data/mock-events";

interface EventSidebarProps {
  events: CateringEvent[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
}

function getStatusStyles(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch(status) {
    case "upcoming":
      return "bg-blue-50 border-blue-500 text-blue-700";
    case "in-progress":
      return "bg-yellow-50 border-yellow-500 text-yellow-700";
    case "completed":
      return "bg-green-50 border-green-500 text-green-700";
    case "cancelled":
      return "bg-red-50 border-red-500 text-red-700";
    default:
      return "bg-gray-100 border-gray-300 text-gray-700";
  }
}
function getStatusIcon(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch(status) {
    case "upcoming":
      return <Timer className="h-4 w-4 mr-1 text-blue-500" />;
    case "in-progress":
      return <Calendar className="h-4 w-4 mr-1 text-yellow-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 mr-1 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 mr-1 text-red-500" />;
    default:
      return null;
  }
}

export function EventSidebar({ events, selectedEventId, onSelectEvent }: EventSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {events.map((event) => (
                <SidebarMenuItem key={event.id}>
                  <SidebarMenuButton
                    isActive={selectedEventId === event.id}
                    onClick={() => onSelectEvent(event.id)}
                    className={`mb-2 border-l-4 px-2 py-3 text-left ${getStatusStyles(event.status as any)}`}
                  >
                    <div className="flex items-center">
                      {getStatusIcon(event.status as any)}
                      <span className="font-semibold">{event.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
