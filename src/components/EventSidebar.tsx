
import { Calendar, CheckCircle, Timer, XCircle } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import { CateringEvent } from "@/data/mock-events";

// Get corporate status style as attractive colored accent card border and gently colored background
function getStatusStyles(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch (status) {
    case "upcoming":
      return "border-l-[5px] border-[#7E69AB] bg-gradient-to-r from-[#ede6fc] to-white shadow-sm";
    case "in-progress":
      return "border-l-[5px] border-yellow-500 bg-gradient-to-r from-yellow-50 to-white shadow-sm";
    case "completed":
      return "border-l-[5px] border-green-500 bg-gradient-to-r from-green-50 to-white shadow-sm";
    case "cancelled":
      return "border-l-[5px] border-red-400 bg-gradient-to-r from-red-50 to-white shadow-sm";
    default:
      return "border-l-[5px] border-gray-200 bg-gradient-to-r from-gray-100 to-white shadow-sm";
  }
}
// Use distinct, professional icon accent
function getStatusIcon(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch (status) {
    case "upcoming":
      return <Timer className="h-4 w-4 mr-2 text-[#7E69AB]" />;
    case "in-progress":
      return <Calendar className="h-4 w-4 mr-2 text-yellow-500" />;
    case "completed":
      return <CheckCircle className="h-4 w-4 mr-2 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 mr-2 text-red-400" />;
    default:
      return null;
  }
}

interface EventSidebarProps {
  events: CateringEvent[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
}

export function EventSidebar({ events, selectedEventId, onSelectEvent }: EventSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {events.map((event) => {
                const isActive = selectedEventId === event.id;
                return (
                  <SidebarMenuItem key={event.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onSelectEvent(event.id)}
                      className={`
                        transition-all duration-200 
                        rounded-xl 
                        group 
                        mb-3
                        overflow-hidden
                        px-3 py-4
                        flex flex-col shadow-md
                        ${getStatusStyles(event.status as any)}
                        ${isActive
                          ? "ring-2 ring-[#7E69AB] scale-[1.02] bg-gradient-to-r from-[#e5deff] to-white"
                          : "hover:ring-2 hover:ring-[#9b87f5]/80 hover:bg-white/80 hover:scale-[1.01]"
                        }
                        animate-fade-in
                      `}
                    >
                      <div className="flex items-center mb-1">
                        {getStatusIcon(event.status as any)}
                        <span className="font-bold text-base text-[#403E43] group-hover:text-[#7E69AB] transition-colors">{event.clientName}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground ml-6 pb-1">
                        Event Time:&nbsp;
                        <span className="font-semibold text-[#7E69AB]">{new Date(event.eventTime).toLocaleDateString()} {new Date(event.eventTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center mt-1 ml-6">
                        <span className="bg-gray-50 border rounded px-2 py-0.5 mr-2 text-xs text-gray-600">{event.status.replace(/-/g, " ")}</span>
                        <span className="text-xs text-gray-500">
                          {event.location}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
