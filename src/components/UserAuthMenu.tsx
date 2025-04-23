
import { useState } from "react";
import { User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserAuthMenu = () => {
  // Simulate authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-[#7E69AB]" />
        <Button
          variant="ghost"
          size="sm"
          className="flex gap-1"
          onClick={() => setIsAuthenticated(false)}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    );
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1"
      onClick={() => setIsAuthenticated(true)}
    >
      <LogIn className="h-4 w-4" />
      Login
    </Button>
  );
};

export default UserAuthMenu;
