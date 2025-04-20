
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EventSidebar } from "@/components/EventSidebar";
import { EventDetails } from "@/components/EventDetails";
import { mockEvents, CateringEvent } from "@/data/mock-events";

const Events = () => {
  const [events, setEvents] = useState<CateringEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || null);
  const selectedEvent = events.find(event => event.id === selectedEventId) || events[0];
  
  const handleUpdateEvent = (updatedEvent: CateringEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return (
    <div className="h-full">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-full w-full">
          <EventSidebar 
            events={events}
            selectedEventId={selectedEventId}
            onSelectEvent={setSelectedEventId}
          />
          {selectedEvent ? (
            <div className="flex-1 h-full overflow-hidden">
              <EventDetails 
                event={selectedEvent}
                onUpdateEvent={handleUpdateEvent}  
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-medium">No events selected</h2>
                <p className="text-muted-foreground">Select an event from the sidebar to view details</p>
              </div>
            </div>
          )}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Events;
