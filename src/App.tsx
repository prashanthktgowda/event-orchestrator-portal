
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import AddItem from "./pages/AddItem";
import ItemCatalog from "./pages/ItemCatalog";
import GeneralSettings from "./pages/GeneralSettings";
import NotificationRules from "./pages/NotificationRules";
import CreateTemplate from "./pages/CreateTemplate";
import ViewTemplates from "./pages/ViewTemplates";
import BusinessHours from "./pages/BusinessHours";
import BlackoutDates from "./pages/BlackoutDates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/features" element={<Features />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/item-catalog" element={<ItemCatalog />} />
            <Route path="/general-settings" element={<GeneralSettings />} />
            <Route path="/notification-rules" element={<NotificationRules />} />
            <Route path="/create-template" element={<CreateTemplate />} />
            <Route path="/view-templates" element={<ViewTemplates />} />
            <Route path="/business-hours" element={<BusinessHours />} />
            <Route path="/blackout-dates" element={<BlackoutDates />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
