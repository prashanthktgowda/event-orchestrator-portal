
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EventSidebar } from "@/components/EventSidebar";
import { EventDetails } from "@/components/EventDetails";
import { mockEvents, CateringEvent } from "@/data/mock-events";

const Index = () => {
  // State for managing events and selected event
  const [events, setEvents] = useState<CateringEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || null);
  
  // Find the selected event
  const selectedEvent = events.find(event => event.id === selectedEventId) || events[0];
  
  // Update event handler
  const handleUpdateEvent = (updatedEvent: CateringEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      <div className="h-12 bg-primary flex items-center px-4 shadow-sm">
        <h1 className="text-lg font-semibold text-primary-foreground">Event Orchestrator Portal</h1>
      </div>
      <div className="h-[calc(100vh-3rem)]">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-full w-full">
          {/* Sidebar with event list */}
          <EventSidebar 
            events={events}
            selectedEventId={selectedEventId}
            onSelectEvent={setSelectedEventId}
          />
          
          {/* Main content area */}
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
    </div>
  );
};

export default Index;
