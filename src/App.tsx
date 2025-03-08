
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Notifications from "./pages/Notifications";
import RecruiterAnalytics from "./pages/RecruiterAnalytics";
import UserProfile from "./pages/UserProfile";
import Profiles from "./pages/Profiles";
import ProfileDetail from "./pages/ProfileDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<RecruiterAnalytics />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/:profileId" element={<ProfileDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
