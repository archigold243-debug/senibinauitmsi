import React from 'react';
import { useRoomContext } from '@/contexts/RoomContext';
import { Button } from '@/components/ui/button';

const Lecturers: React.FC = () => {
  const { lecturers, lecturersLoading, lecturersError, handleCardClick } = useRoomContext();

  if (lecturersLoading)
    return <div style={{ color: 'blue', fontSize: 24 }}>Loading lecturers...</div>;
  if (lecturersError)
    return <div style={{ color: 'red', fontSize: 24 }}>Error: {lecturersError}</div>;
  if (!lecturers.length)
    return <div style={{ color: 'gray', fontSize: 24 }}>No lecturers found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Lecturers</h1>
      <div className="flex flex-wrap gap-6">
        {lecturers.map((lect) => (
          <div
            key={lect.id}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
            style={{ border: '2px solid red', background: 'purple', color: 'black', zIndex: 9999 }}
          >
            <div className="w-24 h-32 flex-shrink-0">
              <img
                src={lect.photo?.startsWith('http') ? lect.photo : `/${lect.photo}`}
                alt={lect.displayName}
                className="w-full h-full object-cover rounded-lg border border-muted"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">{lect.displayName}</div>
              <div className="text-sm text-gray-600">{lect.surname}</div>
              <Button
                size="sm"
                className="mt-1"
                variant="secondary"
                onClick={() => handleCardClick(lect.floor, lect.roomID)}
              >
                Go to Room
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lecturers;
