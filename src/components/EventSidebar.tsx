
import { useState } from "react";
import { CateringEvent } from "@/data/mock-events";
import { format } from "date-fns";
import { MapPin, Calendar, Clock } from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EventSidebarProps {
  events: CateringEvent[];
  selectedEventId: string | null;
  onSelectEvent: (eventId: string) => void;
}

export function EventSidebar({ events, selectedEventId, onSelectEvent }: EventSidebarProps) {
  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime()
  );
  
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">Today's Events</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2 pr-1">
            {sortedEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                isSelected={event.id === selectedEventId}
                onClick={() => onSelectEvent(event.id)} 
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface EventCardProps {
  event: CateringEvent;
  isSelected: boolean;
  onClick: () => void;
}

function EventCard({ event, isSelected, onClick }: EventCardProps) {
  const eventDate = new Date(event.eventTime);
  
  // Function to get status indicator color
  const getStatusColor = (status: CateringEvent['status']) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-500';
      case 'in-progress': return 'bg-amber-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Card 
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-md overflow-hidden",
        isSelected ? "ring-2 ring-primary" : "hover:border-gray-300"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium line-clamp-1">{event.clientName}</h3>
        <div className={cn("w-2.5 h-2.5 rounded-full", getStatusColor(event.status))} />
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground gap-1 mb-1.5">
        <Clock className="h-3.5 w-3.5" />
        <span>{format(eventDate, 'h:mm a')}</span>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground gap-1 mb-2 line-clamp-1">
        <MapPin className="h-3.5 w-3.5 shrink-0" />
        <span>{event.deliveryAddress.street}, {event.deliveryAddress.city}</span>
      </div>
      
      <Progress value={event.progress} className="h-1.5 mb-1" />
      <div className="text-xs text-right text-muted-foreground">
        {event.progress}% Complete
      </div>
    </Card>
  );
}
