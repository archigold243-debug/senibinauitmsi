
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface SecondFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const SecondFloorHotspots: React.FC<SecondFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { namedRooms, lecturers } = useRoomContext();

  const getRoomName = (id: string) => {
    const room = namedRooms.find(r => r.id === id);
    return room ? room.currentName : '';
  };

  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  return (
    <>
      <HoverDetails
        title="Studio 02A"
        roomId="studio-02a"
        description="Max Pax =30, 2 AC split unit, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-02a"]}
        isHighlighted={targetRoomId === "studio-02a"}
        autoOpen={targetRoomId === "studio-02a"}
      />
      <HoverDetails
        title="Studio 02B"
        roomId="studio-02b"
        description="Max Pax =30, 2 AC split unit, Non projector"
        position="right"
        modelPosition={roomIdToPosition["studio-02b"]}
        isHighlighted={targetRoomId === "studio-02b"}
        autoOpen={targetRoomId === "studio-02b"}
      />
      <HoverDetails
        title="Staff Lounge"
        roomId="staff-lounge"
        description="Max Pax =30, 2 AC split unit, Projector, AP1 232"
        position="bottom"
        modelPosition={roomIdToPosition["staff-lounge"]}
        isHighlighted={targetRoomId === "staff-lounge"}
        autoOpen={targetRoomId === "staff-lounge"}
      />
      <HoverDetails
        title="Studio 02C"
        roomId="studio-02c"
        description="Max Pax =35, 4 AC, Projector"
        position="bottom"
        modelPosition={roomIdToPosition["studio-02c"]}
        isHighlighted={targetRoomId === "studio-02c"}
        autoOpen={targetRoomId === "studio-02c"}
      />
      <HoverDetails
        title="Studio 02D"
        roomId="studio-02d"
        description="Max Pax =28, 3 AC split unit, Projector."
        position="right"
        modelPosition={roomIdToPosition["studio-02d"]}
        isHighlighted={targetRoomId === "studio-02d"}
        autoOpen={targetRoomId === "studio-02d"}
      />
      <HoverDetails
        title={getRoomName('crit-main')}
        roomId="crit-main"
        description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 224"
        position="bottom"
        modelPosition={roomIdToPosition["crit-main"]}
        isHighlighted={targetRoomId === "crit-main"}
        autoOpen={targetRoomId === "crit-main"}
      />
      {/* Dynamic Lecturer Hotspots */}
      {[
        "ap1-218", // Dr FAZIDAH HANIM
        "ap1-219", // En MOHAMMAD NAZRIN
        "ap1-215", // Dr MAYAMIN
        "ap1-222", // Ar. IZNNY
        "ap1-213", // En MD ANWAR
        "ap1-207", // Dr NOR SYAMIMI
        "ap1-209", // Dr FADHLIZIL FARIZ
        "ap1-212", // En AMIRUL AMIN
        "ap1-211", // En AMRAN
        "ap1-206", // En ADEEB
        "ap1-208"  // Dr IRYANI
      ].map((id) => {
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
      <HoverDetails
        title="unoccupied"
        description="Senior Lecturer"
        position="right"
        modelPosition={roomIdToPosition["unoccupied"]}
        roomId="unoccupied"
        isHighlighted={targetRoomId === "unoccupied"}
        autoOpen={targetRoomId === "unoccupied"}
      />
    </>
  );
};

export default SecondFloorHotspots;
