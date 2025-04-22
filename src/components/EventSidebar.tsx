import React from "react";

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
    <div className="h-full w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Events</h2>
      </div>
      
      <div className="space-y-4 overflow-auto max-h-[calc(100vh-12rem)] pr-2">
        {events.map((event) => {
          const isSelected = event.id === selectedEventId;
          const statusColor = event.status === "upcoming" 
            ? "bg-blue-500" 
            : event.status === "completed"
            ? "bg-green-500"
            : "bg-red-500";

          return (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className={`w-full text-left transition-all duration-200 ${
                isSelected 
                  ? "scale-[1.02] shadow-lg" 
                  : "hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              <div className={`
                p-4 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm
                ${isSelected ? "ring-2 ring-purple-500" : ""}
              `}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium truncate">{event.clientName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColor}`}>
                    {event.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{event.deliveryAddress.city}, {event.deliveryAddress.state}</p>
                  <p>{new Date(event.eventTime).toLocaleString()}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventSidebar;
