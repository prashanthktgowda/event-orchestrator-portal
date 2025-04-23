
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import EventSidebar from "@/components/EventSidebar";
import { EventDetails } from "@/components/EventDetails";
import { mockEvents, CateringEvent } from "@/data/mock-events";
import CreateEventDialog from "@/components/CreateEventDialog";
import { useToast } from "@/hooks/use-toast";
import EventPageHeader from "@/components/EventPageHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState<CateringEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedEvent = events.find(event => event.id === selectedEventId) || events[0];

  const handleUpdateEvent = (updatedEvent: CateringEvent) => {
    setEvents(events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    toast({
      title: "Event updated",
      description: "The event has been updated successfully.",
    });
  };

  const handleCreateEvent = (newEvent: CateringEvent) => {
    setEvents([...events, newEvent]);
    setSelectedEventId(newEvent.id);
    setIsCreateDialogOpen(false);
    toast({
      title: "Event created",
      description: "New event has been created successfully.",
    });
  };

  const showBackButton = !!location.state?.from || location.key !== "default";

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-[#f6f6f7] to-white">
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-col h-full min-h-screen">
          <EventPageHeader 
            onCreateClick={() => setIsCreateDialogOpen(true)}
            showBackButton={showBackButton}
          />
          <div className="flex flex-1 h-[calc(100vh-73px)]">
            <aside className="bg-white/95 border-r border-gray-200 w-[350px] min-w-[280px] hidden md:block p-0 pt-1">
              <div className="p-4">
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-full text-base font-semibold bg-[#9b2cff] hover:bg-[#7D26D8] text-white rounded-lg mb-4 py-3"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" /> Add New Event
                </Button>
                <EventSidebar
                  events={events}
                  selectedEventId={selectedEventId}
                  onSelectEvent={setSelectedEventId}
                />
              </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-2 md:p-8">
              {selectedEvent ? (
                <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
                  <EventDetails
                    event={selectedEvent}
                    onUpdateEvent={handleUpdateEvent}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      No events selected
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Select an event from the sidebar or create a new one
                    </p>
                    <Button 
                      onClick={() => setIsCreateDialogOpen(true)}
                      size="lg"
                      className="gap-2 bg-[#9b2cff] hover:bg-[#7D26D8] text-white rounded-lg"
                    >
                      <Plus className="h-4 w-4" />
                      Create New Event
                    </Button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>
      <CreateEventDialog 
        isOpen={isCreateDialogOpen} 
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default Events;
