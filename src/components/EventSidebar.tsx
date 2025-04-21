
import { Calendar, CheckCircle, Timer, XCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { CateringEvent } from "@/data/mock-events";

function getStatusStyles(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch (status) {
    case "upcoming":
      return "border-l-[5px] border-[#7E69AB] bg-gradient-to-r from-[#ede6fc] to-white shadow-lg";
    case "in-progress":
      return "border-l-[5px] border-yellow-500 bg-gradient-to-r from-yellow-50 to-white shadow-lg";
    case "completed":
      return "border-l-[5px] border-green-500 bg-gradient-to-r from-green-50 to-white shadow-lg";
    case "cancelled":
      return "border-l-[5px] border-red-400 bg-gradient-to-r from-red-50 to-white opacity-80 shadow-lg";
    default:
      return "border-l-[5px] border-gray-200 bg-gradient-to-r from-gray-100 to-white";
  }
}

function getStatusIcon(status: "upcoming" | "in-progress" | "completed" | "cancelled") {
  switch (status) {
    case "upcoming":
      return <Timer className="h-5 w-5 mr-3 text-[#7E69AB]" />;
    case "in-progress":
      return <Calendar className="h-5 w-5 mr-3 text-yellow-500" />;
    case "completed":
      return <CheckCircle className="h-5 w-5 mr-3 text-green-500" />;
    case "cancelled":
      return <XCircle className="h-5 w-5 mr-3 text-red-400" />;
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
                        rounded-2xl
                        transition-all duration-200 group mb-4
                        px-4 py-4 flex flex-col gap-1
                        overflow-hidden
                        ${getStatusStyles(event.status as any)}
                        ${isActive
                          ? "ring-2 ring-[#7E69AB] scale-[1.03] bg-gradient-to-r from-[#e5deff] to-white"
                          : "hover:ring-2 hover:ring-[#9b87f5]/60 hover:bg-white/90 hover:scale-[1.01]"
                        }
                        animate-fade-in
                        shadow-md
                      `}
                      style={{
                        minHeight: 96,
                      }}
                    >
                      <div className="flex items-center mb-0.5">
                        {getStatusIcon(event.status as any)}
                        <span className="font-bold text-lg text-[#403E43] group-hover:text-[#7E69AB] transition-colors">
                          {event.clientName}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground ml-8 font-medium pb-0.5">
                        <span className="mr-1">Event Time:</span>
                        <span className="text-[#7E69AB]">
                          {new Date(event.eventTime).toLocaleDateString()}{" "}
                          {new Date(event.eventTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div className="flex items-center mt-0.5 ml-8 text-xs">
                        <span className={`
                          px-2 py-0.5 rounded-full font-semibold capitalize
                          mr-3
                          ${event.status === "completed" ? "bg-green-100 text-green-700" :
                            event.status === "in-progress" ? "bg-yellow-100 text-yellow-700" :
                            event.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-[#ede6fc] text-[#7E69AB]"}
                        `}>
                          {event.status.replace(/-/g, " ")}
                        </span>
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          <svg width="10" height="10" className="inline mr-0.5" fill="#7E69AB" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>
                          {event.deliveryAddress.city}, {event.deliveryAddress.state}
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
