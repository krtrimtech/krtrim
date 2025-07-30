import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import HowPage from "./pages/HowPage";
import WhyPage from "./pages/WhyPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="transition-opacity duration-300 animate-fade-in">
      {children}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PageTransition>
            <Index />
          </PageTransition>
        } 
      />
      <Route 
        path="/why" 
        element={
          <PageTransition>
            <WhyPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/how" 
        element={
          <PageTransition>
            <HowPage />
          </PageTransition>
        } 
      />
  
      <Route 
        path="*" 
        element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } 
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Navbar />
              <AppRoutes />
            </div>
          </BrowserRouter>
        </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;