
import { Outlet, useLocation } from "react-router-dom";

// Sidebar imports and navItems removed for a cleaner layout as requested.

const Layout = () => {
  const location = useLocation();
  // For landing page and events page, just render Outlet (header inside Events.tsx)
  if (location.pathname === "/" || location.pathname === "/events") {
    return <Outlet />;
  }

  // In all other routes, render only the Outlet (header will be rendered inside each page)
  return (
    <main className="flex-1 w-full min-h-screen bg-gray-50">
      <Outlet />
    </main>
  );
};

export default Layout;
