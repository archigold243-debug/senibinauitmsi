
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface ThirdFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const ThirdFloorHotspots: React.FC<ThirdFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { studios, lecturers } = useRoomContext();

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  // Helper for future lecturer support if needed
  const getLecturerByRoomId = (roomID: string) => 
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomID);

  return (
    <>
      <HoverDetails
        title="Classroom"
        roomId="classroom-0303"
        description="Max pax= 40, AC split unit, AP1 0303"
        position="right"
        modelPosition={roomIdToPosition["classroom-0303"]}
        isHighlighted={targetRoomId === "classroom-0303"}
        autoOpen={targetRoomId === "classroom-0303"}
      />
      <HoverDetails
        title={getStudioName('studio-3a')}
        roomId="studio-3a"
        description="Fixed Work Station 3 AC split unit, Projector"
        position="top"
        modelPosition={roomIdToPosition["studio-3a"]}
        isHighlighted={targetRoomId === "studio-3a"}
        autoOpen={targetRoomId === "studio-3a"}
      />
      <HoverDetails
        title={getStudioName('studio-3b')}
        roomId="studio-3b"
        description="Fixed Work Station 3 AC split unit, Projector"
        position="top"
        modelPosition={roomIdToPosition["studio-3b"]}
        isHighlighted={targetRoomId === "studio-3b"}
        autoOpen={targetRoomId === "studio-3b"}
      />
      <HoverDetails
        title="Floating Studio 05"
        roomId="floating-studio-05"
        description="Open Layout, 2 AC Split Unit"
        position="right"
        modelPosition={roomIdToPosition["floating-studio-05"]}
        isHighlighted={targetRoomId === "floating-studio-05"}
        autoOpen={targetRoomId === "floating-studio-05"}
      />
      <HoverDetails
        title="Classroom"
        roomId="classroom-0313"
        description="Max pax= 40, AC split unit, AP1 0313"
        position="left"
        modelPosition={roomIdToPosition["classroom-0313"]}
        isHighlighted={targetRoomId === "classroom-0313"}
        autoOpen={targetRoomId === "classroom-0313"}
      />
      <HoverDetails
        title="Studio 05B"
        roomId="studio-05b"
        description="Max Pax= 25, Fixed Work Station 3 AC split unit, Projector"
        position="bottom"
        modelPosition={roomIdToPosition["studio-05b"]}
        isHighlighted={targetRoomId === "studio-05b"}
        autoOpen={targetRoomId === "studio-05b"}
      />
      <HoverDetails
        title="Studio 04B"
        roomId="studio-04b"
        description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-04b"]}
        isHighlighted={targetRoomId === "studio-04b"}
        autoOpen={targetRoomId === "studio-04b"}
      />
      <HoverDetails
        title="Floating Studio 04"
        roomId="floating-studio-04"
        description="Open Layout, 2 AC Split Unit"
        position="right"
        modelPosition={roomIdToPosition["floating-studio-04"]}
        isHighlighted={targetRoomId === "floating-studio-04"}
        autoOpen={targetRoomId === "floating-studio-04"}
      />
    </>
  );
};

export default ThirdFloorHotspots;
