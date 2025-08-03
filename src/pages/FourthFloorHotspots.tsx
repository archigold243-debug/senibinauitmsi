
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

/**
 * Props:
 * - roomIdToPosition: mapping of room IDs to hotspot positions
 * - targetRoomId: the current highlighted room (from search params)
 * - targetRoomPosition: camera focus position
 */
interface FourthFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const FourthFloorHotspots: React.FC<FourthFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { rooms, lecturers } = useRoomContext();
  const floorRooms = rooms.filter(room => room.floor === 'Fourth Floor');

  return (
    <>
      {floorRooms.map(room => (
        <HoverDetails
          key={room.roomID}
          title={room.room_name}
          roomID={room.roomID}
          description={`Capacity: ${room.capacity ?? '-'} | Type: ${room.room_type ?? '-'}`}
          position="right"
          modelPosition={room.position ?? [0,0,0]}
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

export default FourthFloorHotspots;
