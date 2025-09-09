import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface DynamicHotspotsProps {
  floor?: string;
  targetRoomId?: string;
}

const DynamicHotspots: React.FC<DynamicHotspotsProps> = ({ floor, targetRoomId }) => {
  const { rooms, lecturers, roomIdToPosition } = useRoomContext();

  // Filter rooms by floor if specified (strict equality)
  const floorRooms = floor 
    ? rooms.filter(room => room.floor === floor)
    : rooms;

  // Debug: Log filtered rooms and available positions
  React.useEffect(() => {
    console.log('[DynamicHotspots] floor:', floor);
    console.log('[DynamicHotspots] Filtered rooms:', floorRooms);
    console.log('[DynamicHotspots] roomIdToPosition:', roomIdToPosition);
  }, [floor, floorRooms, roomIdToPosition]);

  // Get lecturer by room ID
  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  return (
    <>
      {/* Render room hotspots */}
      {floorRooms.map((room) => {
        const position = roomIdToPosition[room.roomID];
        if (!position) return null;

        const lecturer = getLecturerByRoomId(room.roomID);
        
        // If there's a lecturer in this room, show lecturer details
        if (lecturer) {
          return (
            <HoverDetails
              key={room.roomID}
              title={lecturer.username}
              surname={lecturer.surname}
              description={Array.isArray(lecturer.expertise) && lecturer.expertise.length > 0 ? lecturer.expertise.join(", ") : (typeof lecturer.expertise === 'string' && lecturer.expertise ? lecturer.expertise : "Lecturer")}
              position="right"
              modelPosition={position}
              imageSrc={lecturer.photo_url}
              roomID={room.roomID}
              isHighlighted={targetRoomId === room.roomID}
              autoOpen={targetRoomId === room.roomID}
            />
          );
        }

        // Otherwise show room details
        return (
          <HoverDetails
            key={room.roomID}
            title={room.room_name}
            description={room.description || ''}
            position="right"
            modelPosition={position}
            roomID={room.roomID}
            isHighlighted={targetRoomId === room.roomID}
            autoOpen={targetRoomId === room.roomID}
          />
        );
      })}
    </>
  );
};

export default DynamicHotspots;
