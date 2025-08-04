
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
  const { studios, namedRooms, lecturers } = useRoomContext();

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  const getRoomName = (id: string) => {
    const room = namedRooms.find(r => r.id === id);
    return room ? room.currentName : '';
  };

  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  // Lecturer office hotspots -- UPDATED to match new IDs
  const lecturerRoomIds = [
    "ap1-412", // Dr Farid
    "ap1-414", // Mamoo
    "ap1-422", // Syathir
    "ap1-424", // Saha
    "ap1-428", // Jamal
    "ap1-430", // Aiman
    "ap1-432", // Izzat
    "ap1-413", // AR (Abdul Rahman)
    "ap1-415", // Mizi
    "ap1-421", // Shahin
    "ap1-429", // Baa
  ];

  return (
    <>
      {/* Studio and Surau */}
      <HoverDetails
        title={getStudioName('studio-4c')}
        roomId="studio-4c"
        description="Max Pax =28. Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-4c"]}
        isHighlighted={targetRoomId === "studio-4c"}
        autoOpen={targetRoomId === "studio-4c"}
      />
      <HoverDetails
        title={getRoomName('surau-l')}
        roomId="surau-l"
        description="5 times Appoinment with Allah"
        position="left"
        modelPosition={roomIdToPosition["surau-l"]}
        isHighlighted={targetRoomId === "surau-l"}
        autoOpen={targetRoomId === "surau-l"}
      />
      <HoverDetails
        title={getRoomName('surau-p')}
        roomId="surau-p"
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
            position="right"
            modelPosition={roomIdToPosition[id]}
            imageSrc={lect.photo}
            roomId={id}
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
        roomId="unoccupied"
        isHighlighted={targetRoomId === "unoccupied"}
        autoOpen={targetRoomId === "unoccupied"}
      />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 403"
        position="right"
        modelPosition={roomIdToPosition["classroom-403"]}
        roomId="classroom-403"
        isHighlighted={targetRoomId === "classroom-403"}
        autoOpen={targetRoomId === "classroom-403"}
      />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 439"
        position="right"
        modelPosition={roomIdToPosition["classroom-439"]}
        roomId="classroom-439"
        isHighlighted={targetRoomId === "classroom-439"}
        autoOpen={targetRoomId === "classroom-439"}
      />
    </>
  );
};

export default FourthFloorHotspots;
