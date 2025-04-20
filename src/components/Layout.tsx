
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarProvider, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Calendar, Home, Users, Settings, LayoutGrid, PieChart, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
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
                        <Link to={item.path}>
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
        <main className="flex-1 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
