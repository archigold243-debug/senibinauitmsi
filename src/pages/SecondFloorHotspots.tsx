
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface SecondFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const SecondFloorHotspots: React.FC<SecondFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
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
      <HoverDetails
        title="Staff Lounge"
        roomID="staff-lounge"
        description="Max Pax =30, 2 AC split unit, Projector, AP1 232"
        position="bottom"
        modelPosition={roomIdToPosition["staff-lounge"]}
        isHighlighted={targetRoomId === "staff-lounge"}
        autoOpen={targetRoomId === "staff-lounge"}
      />
      <HoverDetails
        title="Studio 02C"
        roomID="studio-02c"
        description="Max Pax =35, 4 AC, Projector"
        position="bottom"
        modelPosition={roomIdToPosition["studio-02c"]}
        isHighlighted={targetRoomId === "studio-02c"}
        autoOpen={targetRoomId === "studio-02c"}
      />
      <HoverDetails
        title="Studio 02D"
        roomID="studio-02d"
        description="Max Pax =28, 3 AC split unit, Projector."
        position="right"
        modelPosition={roomIdToPosition["studio-02d"]}
        isHighlighted={targetRoomId === "studio-02d"}
        autoOpen={targetRoomId === "studio-02d"}
      />
      <HoverDetails
        title={getRoomName('crit-main')}
        roomID="crit-main"
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
      <HoverDetails
        title="unoccupied"
        description="Senior Lecturer"
        position="right"
        modelPosition={roomIdToPosition["unoccupied"]}
        roomID="unoccupied"
        isHighlighted={targetRoomId === "unoccupied"}
        autoOpen={targetRoomId === "unoccupied"}
      />
    </>
  );
};

export default SecondFloorHotspots;
