
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface FirstFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const FirstFloorHotspots: React.FC<FirstFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { rooms, lecturers } = useRoomContext();

  const getRoomName = (id: string) => {
    const room = rooms.find(r => r.roomID === id);
    return room ? room.room_name : id;
  };

  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  return (
    <>
      {rooms.map(room => (
        <HoverDetails
          key={room.roomID}
          title={room.room_name}
          roomID={room.roomID}
          description={`Capacity: ${room.capacity ?? '-'} | Type: ${room.room_type ?? '-'}`}
          position="right"
          modelPosition={room.position ?? [0, 0, 0]}
          isHighlighted={targetRoomId === room.roomID}
          autoOpen={targetRoomId === room.roomID}
        />
      ))}
      {lecturers.map(lect => (
        <HoverDetails
          key={lect.id}
          title={lect.displayName}
          surname={lect.surname}
          description="Lecturer Office"
          position="right"
          modelPosition={rooms.find(r => r.roomID === lect.roomID)?.position ?? [0,0,0]}
          imageSrc={lect.photo}
          roomID={lect.roomID}
          isHighlighted={targetRoomId === lect.roomID}
          autoOpen={targetRoomId === lect.roomID}
        />
      ))}
    </>
  );
};

export default FirstFloorHotspots;
