import { Outlet, Link, useLocation } from "react-router-dom";
import { Calendar, Home, Users, Settings, LayoutGrid, PieChart, List } from "lucide-react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Events", icon: LayoutGrid, path: "/events" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
  { title: "Staff", icon: Users, path: "/staff" },
  { title: "Reports", icon: PieChart, path: "/reports" },
  { title: "Features", icon: List, path: "/features" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // For events page, do not render sidebar, just the outlet
  if (isLandingPage) {
    return <Outlet />;
  }

  // Remove sidebar from events route, just use Outlet and let Events.tsx handle layout
  if (location.pathname === "/events") {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild
                        isActive={location.pathname === item.path}
                      >
                        <Link to={item.path} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
