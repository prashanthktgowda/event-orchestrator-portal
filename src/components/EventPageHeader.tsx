
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface EventPageHeaderProps {
  onCreateClick: () => void;
  showBackButton?: boolean;
  userMenu?: ReactNode;
}

const navLinks = [
  { title: "Events", path: "/events" },
  { title: "Calendar", path: "/calendar" },
  { title: "Staff", path: "/staff" },
  { title: "Reports", path: "/reports" },
  { title: "Features", path: "/features" },
  { title: "Settings", path: "/settings" },
];

const EventPageHeader = ({ onCreateClick, showBackButton, userMenu }: EventPageHeaderProps) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b px-2 md:px-0 shadow-sm">
      <div className="max-w-full mx-auto flex items-center justify-between py-3 px-2 md:px-6">
        <div className="flex items-center gap-3">
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
          <Link to="/events">
            <h1 className="text-2xl font-bold tracking-tight text-[#7E69AB]">Event Orchestrator</h1>
          </Link>
          {/* Inline navigation moved to header */}
          <nav className="hidden md:flex gap-1 ml-4">
            {navLinks.map(link => (
              <Link
                to={link.path}
                key={link.path}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  location.pathname === link.path
                    ? "bg-[#e9e5f9] text-[#7E69AB]"
                    : "hover:bg-[#f6f4fb] text-gray-600"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            onClick={onCreateClick}
            size="sm"
            className="gap-2 bg-[#9b2cff] hover:bg-[#7D26D8] text-white font-semibold rounded-lg shadow"
          >
            + New Event
          </Button>
          {userMenu}
        </div>
      </div>
      {/* Mobile nav */}
      <nav className="flex md:hidden gap-1 px-2 pt-1 pb-2 w-full overflow-x-auto">
        {navLinks.map(link => (
          <Link
            to={link.path}
            key={link.path}
            className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 transition ${
              location.pathname === link.path
                ? "bg-[#e9e5f9] text-[#7E69AB]"
                : "hover:bg-[#f6f4fb] text-gray-600"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default EventPageHeader;
