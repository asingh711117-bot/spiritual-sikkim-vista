import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VirtualTours from "./pages/VirtualTours";
import InteractiveMap from "./pages/InteractiveMap";
import DigitalArchive from "./pages/DigitalArchive";
import CulturalCalendar from "./pages/CulturalCalendar";
import BookingPage from "./pages/BookingPage";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-subtle">
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<VirtualTours />} />
            <Route path="/map" element={<InteractiveMap />} />
            <Route path="/archive" element={<DigitalArchive />} />
            <Route path="/calendar" element={<CulturalCalendar />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
