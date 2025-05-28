
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./contexts/AppContext";
import RoleSelection from "./pages/RoleSelection";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployerProfile from "./pages/EmployerProfile";
import RecruiterDashboard from '@/components/RecruiterDashboard';
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { initTelegram } from "./lib/telegram";

const queryClient = new QueryClient();

const RequireProfile = ({ children }: { children: React.ReactNode }) => {
  const { userRole, employeeProfile, employerProfile } = useApp();
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (userRole === 'employee' && !employeeProfile) {
    return <Navigate to="/employee-profile" replace />;
  }
  
  if (userRole === 'employer' && !employerProfile) {
    return <Navigate to="/employer-profile" replace />;
  }
  
  return <>{children}</>;
};

const RequireEmployer = ({ children }: { children: React.ReactNode }) => {
  const { userRole } = useApp();
  
  if (userRole !== 'employer') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { userRole, isInitialized } = useApp();
  
  useEffect(() => {
    initTelegram();
  }, []);
  
  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading EasyCrew</h2>
          <p className="text-muted-foreground">Please wait...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={userRole ? <Navigate to="/dashboard" replace /> : <RoleSelection />} 
      />
      <Route path="/recruiters" element={<RecruiterDashboard />} />
      <Route path="/employee-profile" element={<EmployeeProfile />} />
      <Route path="/employer-profile" element={<EmployerProfile />} />
      <Route 
        path="/dashboard" 
        element={
          <RequireProfile>
            <Dashboard />
          </RequireProfile>
        } 
      />
      <Route 
        path="/create-job" 
        element={
          <RequireProfile>
            <RequireEmployer>
              <CreateJob />
            </RequireEmployer>
          </RequireProfile>
        } 
      />
      <Route 
        path="/edit-job/:jobId" 
        element={
          <RequireProfile>
            <RequireEmployer>
              <EditJob />
            </RequireEmployer>
          </RequireProfile>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
