
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


  return (
    <>
      {rooms.map(room => (
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

  return (
    <>
      {/* Studio and Surau */}
      <HoverDetails
        title={getRoomName('studio-4c')}
        roomID="studio-4c"
        description="Max Pax =28. Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-4c"]}
        isHighlighted={targetRoomId === "studio-4c"}
        autoOpen={targetRoomId === "studio-4c"}
      />
      <HoverDetails
        title={getRoomName('surau-l')}
        roomID="surau-l"
        description="5 times Appoinment with Allah"
        position="left"
        modelPosition={roomIdToPosition["surau-l"]}
        isHighlighted={targetRoomId === "surau-l"}
        autoOpen={targetRoomId === "surau-l"}
      />
      <HoverDetails
        title={getRoomName('surau-p')}
        roomID="surau-p"
        description="5 times Appoinment with Allah"
        position="top"
        modelPosition={roomIdToPosition["surau-p"]}
        isHighlighted={targetRoomId === "surau-p"}
        autoOpen={targetRoomId === "surau-p"}
      />
      {/* Dynamic Lecturer Hotspots */}
      {lecturerRoomIds.map((id) => {
        const lect = getLecturerByRoomId(id);
        if (!lect) return null;
        return (
          <HoverDetails
            key={id}
            title={lect.displayName}
            surname={lect.surname}
            description="Lecturer Office"
            position="right"
            modelPosition={roomIdToPosition[id]}
            imageSrc={lect.photo}
            roomID={id}
            isHighlighted={targetRoomId === id}
            autoOpen={targetRoomId === id}
          />
        );
      })}
      {/* ... unoccupied case + classrooms ... */}
      <HoverDetails
        title="unoccupied"
        surname="-"
        description="-"
        position="right"
        modelPosition={roomIdToPosition["unoccupied"]}
        roomID="unoccupied"
        isHighlighted={targetRoomId === "unoccupied"}
        autoOpen={targetRoomId === "unoccupied"}
      />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 403"
        position="right"
        modelPosition={roomIdToPosition["classroom-403"]}
        roomID="classroom-403"
        isHighlighted={targetRoomId === "classroom-403"}
        autoOpen={targetRoomId === "classroom-403"}
      />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 439"
        position="right"
        modelPosition={roomIdToPosition["classroom-439"]}
        roomID="classroom-439"
        isHighlighted={targetRoomId === "classroom-439"}
        autoOpen={targetRoomId === "classroom-439"}
      />
    </>
  );
};

export default FourthFloorHotspots;
