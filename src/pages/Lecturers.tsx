
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LecturerCard from './LecturerCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRoomContext } from '@/contexts/RoomContext';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers } = useRoomContext();

  const handleClick = (floor: string, roomId: string) => {
    // NOTE: Use the url format that matches existing routes (e.g., /ground-floor)
    // Assume floor value in context is like "Ground Floor" and convert to "ground-floor"
    const path = `/${floor.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(`${path}?room=${roomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <div className="mb-4">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="flex items-center gap-2"
            aria-label="Go back"
          >
            <ArrowLeft className="mr-1" />
            Back
          </Button>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lecturers.map((lect, idx) => (
            <LecturerCard
              key={lect.id}
              photo={lect.photo}
              displayName={lect.displayName}
              surname={lect.surname}
              role={lect.role}
              floor={lect.floor}
              roomId={lect.roomId}
              onClick={handleClick}
              loadingPriority={idx < 6}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
