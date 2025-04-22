
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import EventSidebar from "@/components/EventSidebar";
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
    <div className="h-full w-full min-h-screen bg-gradient-to-br from-[#f6f6f7] to-white">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-full min-h-screen w-full">
          <div className="bg-white/95 border-r border-gray-200 min-w-[325px] hidden md:block pt-6 pl-3 pr-2">
            <EventSidebar
              events={events}
              selectedEventId={selectedEventId}
              onSelectEvent={setSelectedEventId}
            />
          </div>
          <div className="flex-1 h-full flex flex-col overflow-hidden px-0 md:px-8 pt-0 md:pt-10 pb-10">
            {selectedEvent ? (
              <div className="flex-1 max-w-4xl mx-auto w-full bg-white/95 shadow-xl rounded-2xl p-1 sm:p-2 md:p-6 animate-fade-in">
                <EventDetails
                  event={selectedEvent}
                  onUpdateEvent={handleUpdateEvent}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">No events selected</h2>
                  <p className="text-muted-foreground">Select an event from the sidebar to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Events;
