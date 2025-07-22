import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LecturerCard from './LecturerCard';
import { useRoomContext } from '@/contexts/RoomContext';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();

  const handleClick = (floor: string, roomId: string) => {
    const path = `/${floor.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(`${path}?room=${roomId}`);
  };

  if (lecturersLoading) {
    return <div className="text-blue-600 text-xl text-center py-10">Loading lecturers...</div>;
  }

  if (lecturersError) {
    return <div className="text-red-600 text-xl text-center py-10">Error: {lecturersError}</div>;
  }

  if (!lecturers.length) {
    return <div className="text-gray-500 text-xl text-center py-10">No lecturers found.</div>;
  }

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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>

        {/* Grid of Lecturer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lecturers.map((lect, idx) => (
            <LecturerCard
              key={lect.id}
              photo={lect.photo}
              displayName={lect.displayName}
              surname={lect.surname}
              floor={lect.floor}
              roomID={lect.roomID || lect.roomId} // supports either key
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
