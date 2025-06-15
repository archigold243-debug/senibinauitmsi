import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LECTURERS } from './lecturers-data';
import LecturerCard from './LecturerCard';

const Lecturers: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (floor: string, roomId: string) => {
    navigate(`/${floor}?room=${roomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LECTURERS.map((lect, idx) => (
            <LecturerCard
              key={lect.displayName}
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
