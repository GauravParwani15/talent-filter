
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Notifications from "./pages/Notifications";
import RecruiterAnalytics from "./pages/RecruiterAnalytics";
import UserProfile from "./pages/UserProfile";
import Profiles from "./pages/Profiles";
import ProfileDetail from "./pages/ProfileDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateProfile from "./pages/CreateProfile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout><Index /></MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute requireAuth={true}>
                <MainLayout><Notifications /></MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute requireAuth={true}>
                <MainLayout><RecruiterAnalytics /></MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requireAuth={true}>
                <MainLayout><UserProfile /></MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profiles" 
            element={
              <MainLayout><Profiles /></MainLayout>
            } 
          />
          <Route 
            path="/profiles/:profileId" 
            element={
              <MainLayout><ProfileDetail /></MainLayout>
            } 
          />
          <Route path="/sign-in" element={<MainLayout><SignIn /></MainLayout>} />
          <Route path="/sign-up" element={<MainLayout><SignUp /></MainLayout>} />
          <Route 
            path="/create-profile" 
            element={
              <ProtectedRoute requireAuth={true}>
                <MainLayout><CreateProfile /></MainLayout>
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
