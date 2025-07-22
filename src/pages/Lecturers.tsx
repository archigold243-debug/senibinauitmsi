
import React from 'react';
import { useRoomContext } from '@/contexts/RoomContext';

const Lecturers: React.FC = () => {
  const { lecturers, lecturersLoading, lecturersError } = useRoomContext();

  if (lecturersLoading) return <div style={{ color: 'blue', fontSize: 24 }}>Loading lecturers...</div>;
  if (lecturersError) return <div style={{ color: 'red', fontSize: 24 }}>Error: {lecturersError}</div>;
  if (!lecturers.length) return <div style={{ color: 'gray', fontSize: 24 }}>No lecturers found.</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Lecturers</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {lecturers.map((lect) => (
          <div
            key={lect.id}
            style={{
              border: '2px solid red',
              background: 'yellow',
              color: 'black',
              padding: 16,
              borderRadius: 12,
              minWidth: 200,
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 18,
            }}
          >
            <img
              src={lect.photo?.startsWith('http') ? lect.photo : `/${lect.photo}`}
              alt={lect.displayName}
              style={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
            />
            <div>{lect.displayName}</div>
            <div style={{ fontSize: 14, color: 'gray' }}>{lect.surname}</div>
            <div style={{ fontSize: 12, color: 'black' }}>{lect.floor} - {lect.roomID}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lecturers;
