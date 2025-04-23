
import { useState } from "react";
import { EventDetails } from "@/components/EventDetails";
import { mockEvents, CateringEvent } from "@/data/mock-events";
import CreateEventDialog from "@/components/CreateEventDialog";
import { useToast } from "@/hooks/use-toast";
import EventPageHeader from "@/components/EventPageHeader";
import UserAuthMenu from "@/components/UserAuthMenu";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Events = () => {
  const [events, setEvents] = useState<CateringEvent[]>(mockEvents);
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || "");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setConfirmDeleteId(null);
    toast({
      title: "Event deleted",
      description: "The event has been removed.",
    });
    // If the deleted event was selected, pick another or clear
    if (selectedEventId === id) {
      if (events.length > 1) {
        const other = events.find(e => e.id !== id);
        setSelectedEventId(other ? other.id : "");
      } else {
        setSelectedEventId("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f6f7] to-white overflow-x-hidden">
      <EventPageHeader
        showBackButton={false}
        onCreateClick={() => setIsCreateDialogOpen(true)}
        userMenu={<UserAuthMenu />}
      />

      <div className="max-w-7xl mx-auto pt-8 pb-12 px-2 flex flex-col items-center min-h-[70vh]">
        {/* New Event Button (hidden on mobile to avoid double action) */}
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="mb-6 mt-2 bg-[#9b2cff] hover:bg-[#7D26D8] text-white font-semibold rounded-lg px-6 py-3 shadow-lg flex gap-2 hidden sm:flex"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          Create New Event
        </Button>

        {/* Horizontal scrollable event cards */}
        {events.length > 0 ? (
          <div className="w-full">
            <div className="flex gap-6 overflow-x-auto pb-3 hide-scrollbar snap-x snap-mandatory">
              {events.map(event => (
                <div
                  key={event.id}
                  className={`relative min-w-[325px] sm:min-w-[400px] max-w-[95vw] p-6 bg-white rounded-xl border shadow-sm transition-all snap-center ${
                    selectedEventId === event.id
                      ? "ring-2 ring-[#9b2cff] scale-[1.01]"
                      : ""
                  } hover:border-[#9b2cff]/40 cursor-pointer flex-shrink-0`}
                  onClick={() => setSelectedEventId(event.id)}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[#7E69AB] truncate">
                        {event.clientName}
                      </h3>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                        <span>{new Date(event.eventTime).toLocaleString()}</span>
                        <span>
                          {event.deliveryAddress.city}, {event.deliveryAddress.state}
                        </span>
                        <span className={`inline-block px-2 rounded-full text-xs ml-0.5 ${event.status === "upcoming" ? "bg-blue-200 text-blue-800" : event.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="ml-4"
                      onClick={e => {
                        e.stopPropagation();
                        setConfirmDeleteId(event.id);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  {/* Show details for selected */}
                  {selectedEventId === event.id && (
                    <EventDetails event={event} onUpdateEvent={handleUpdateEvent} />
                  )}
                  {/* Delete confirm modal */}
                  {confirmDeleteId === event.id && (
                    <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center rounded-xl">
                      <div className="bg-white p-6 rounded-lg border shadow-lg flex flex-col items-center gap-6">
                        <span className="font-bold text-lg text-red-700">Delete this event?</span>
                        <span className="text-sm text-muted-foreground mb-2">This action cannot be undone.</span>
                        <div className="flex gap-4">
                          <Button
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* Add New Event "card" on mobile */}
              <div className="relative min-w-[200px] sm:min-w-[260px] max-w-[80vw] flex items-center justify-center">
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-full h-full flex flex-col items-center justify-center py-8 px-2 bg-[#f6f4fb] hover:bg-[#e9e5f9] border-2 border-dashed border-[#9b2cff] text-[#7E69AB] font-bold rounded-2xl text-xl"
                >
                  <Plus className="h-8 w-8 mb-1" />
                  New Event
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center w-full flex flex-col items-center justify-center min-h-[40vh]">
            <p className="text-xl font-semibold mb-2 text-gray-800">No events found.</p>
            <p className="text-muted-foreground mb-6">
              Get started by creating a new event.
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="gap-2 bg-[#9b2cff] hover:bg-[#7D26D8] text-white rounded-lg"
              size="lg"
            >
              <Plus className="h-4 w-4" />
              Create New Event
            </Button>
          </div>
        )}

        {/* Create Event Dialog */}
        <CreateEventDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      </div>
      {/* Visually hidden horizontal scroll for accessibility */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Events;
