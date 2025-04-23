
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface EventPageHeaderProps {
  onCreateClick: () => void;
  showBackButton?: boolean;
  userMenu?: ReactNode;
}

const EventPageHeader = ({ onCreateClick, showBackButton, userMenu }: EventPageHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b px-2 md:px-0 shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-2 md:px-6">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-[#7E69AB]">Events</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={onCreateClick} size="sm" className="gap-2 bg-[#9b2cff] hover:bg-[#7D26D8] text-white font-semibold rounded-lg shadow">
            <Plus className="h-4 w-4" />
            New Event
          </Button>
          {userMenu}
        </div>
      </div>
    </header>
  );
};

export default EventPageHeader;
