
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GroundFloor from "./pages/GroundFloor";
import FirstFloor from "./pages/FirstFloor";
import SecondFloor from "./pages/SecondFloor";
import ThirdFloor from "./pages/ThirdFloor";
import FourthFloor from "./pages/FourthFloor";
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
          <Route path="/ground-floor" element={<GroundFloor />} />
          <Route path="/first-floor" element={<FirstFloor />} />
          <Route path="/second-floor" element={<SecondFloor />} />
          <Route path="/third-floor" element={<ThirdFloor />} />
          <Route path="/fourth-floor" element={<FourthFloor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
