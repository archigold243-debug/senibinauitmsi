import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import GroundFloor from '@/pages/GroundFloor';
import FirstFloor from '@/pages/FirstFloor';
import SecondFloor from '@/pages/SecondFloor';
import ThirdFloor from '@/pages/ThirdFloor';
import FourthFloor from '@/pages/FourthFloor';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import { RoomProvider } from '@/contexts/RoomContext';
import './App.css';
import Lecturers from '@/pages/Lecturers';
import StudioPlan from '@/pages/StudioPlan';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoomProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ground-floor" element={<GroundFloor />} />
            <Route path="/first-floor" element={<FirstFloor />} />
            <Route path="/second-floor" element={<SecondFloor />} />
            <Route path="/third-floor" element={<ThirdFloor />} />
            <Route path="/fourth-floor" element={<FourthFloor />} />
            <Route path="/lecturers" element={<Lecturers />} />
            <Route path="/studio-plan" element={<StudioPlan />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </RoomProvider>
    </QueryClientProvider>
  );
}

export default App;
