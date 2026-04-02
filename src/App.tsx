import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Learn from "./pages/Learn";
import Exercises from "./pages/Exercises";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import MobileNav from "./components/MobileNav";
import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./lib/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MobileNav />
        <Routes>
          <Route path={routes.pocetna} element={<Landing />} />
          <Route path={routes.upitnik} element={<Questionnaire />} />
          <Route path={routes.rezultati} element={<Results />} />
          <Route path={routes.edukacija} element={<Learn />} />
          <Route path={routes.vezbe} element={<Exercises />} />
          <Route path={routes.istorija} element={<History />} />
          <Route path="/questionnaire" element={<Navigate to={routes.upitnik} replace />} />
          <Route path="/results" element={<Navigate to={routes.rezultati} replace />} />
          <Route path="/learn" element={<Navigate to={routes.edukacija} replace />} />
          <Route path="/exercises" element={<Navigate to={routes.vezbe} replace />} />
          <Route path="/history" element={<Navigate to={routes.istorija} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
