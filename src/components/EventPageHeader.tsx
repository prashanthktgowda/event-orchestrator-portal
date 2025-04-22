
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventPageHeaderProps {
  onCreateClick: () => void;
  showBackButton?: boolean;
}

const EventPageHeader = ({ onCreateClick, showBackButton }: EventPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 md:p-6 border-b bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
        <h1 className="text-2xl font-semibold">Events</h1>
      </div>
      <Button onClick={onCreateClick} size="sm" className="gap-2">
        <Plus className="h-4 w-4" />
        New Event
      </Button>
    </div>
  );
};

export default EventPageHeader;
