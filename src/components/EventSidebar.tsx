
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EventSidebarProps {
  events: {
    id: string;
    clientName: string;
    eventTime: string;
    deliveryAddress: {
      city: string;
      state: string;
    };
    status: string;
  }[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
}

const EventSidebar = ({ 
  events,
  selectedEventId,
  onSelectEvent,
}: EventSidebarProps) => {
  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 -mr-4 pr-4">
        <div className="space-y-2">
          {events.map((event) => {
            const isSelected = event.id === selectedEventId;
            const statusColor = event.status === "upcoming" 
              ? "bg-blue-500" 
              : event.status === "completed"
              ? "bg-green-500"
              : "bg-red-500";

            return (
              <Button
                key={event.id}
                variant="ghost"
                className={`w-full h-auto p-3 justify-start text-left transition-all duration-200 ${
                  isSelected 
                    ? "bg-primary/10 hover:bg-primary/15" 
                    : "hover:bg-secondary/80"
                }`}
                onClick={() => onSelectEvent(event.id)}
              >
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex justify-between items-start w-full">
                    <h3 className="font-medium truncate">{event.clientName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${statusColor} ml-2`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="truncate">{event.deliveryAddress.city}, {event.deliveryAddress.state}</p>
                    <p className="truncate">{new Date(event.eventTime).toLocaleDateString()}</p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventSidebar;
