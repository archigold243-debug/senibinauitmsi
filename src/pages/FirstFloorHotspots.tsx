
import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface FirstFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const FirstFloorHotspots: React.FC<FirstFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { studios, namedRooms, lecturers } = useRoomContext();

  const getRoomName = (id: string) => {
    const room = namedRooms.find(r => r.id === id);
    return room ? room.currentName : '';
  };

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  return (
    <>
      <HoverDetails
        title={getStudioName('studio-01a')}
        roomId="studio-01a"
        description="Max Pax =30, 2 AC split unit, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-01a"]}
        isHighlighted={targetRoomId === "studio-01a"}
        autoOpen={targetRoomId === "studio-01a"}
      />
      <HoverDetails
        title={getStudioName('studio-03a-extended')}
        roomId="studio-03a-extended"
        description="Max Pax =30, 2 AC split unit, Non projector"
        position="right"
        modelPosition={roomIdToPosition["studio-03a-extended"]}
        isHighlighted={targetRoomId === "studio-03a-extended"}
        autoOpen={targetRoomId === "studio-03a-extended"}
      />
      <HoverDetails
        title={getStudioName('studio-03a')}
        roomId="studio-03a"
        description="Max Pax =30, 2 AC split unit, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-03a"]}
        isHighlighted={targetRoomId === "studio-03a"}
        autoOpen={targetRoomId === "studio-03a"}
      />
      <HoverDetails
        title={getRoomName('crit-tec')}
        roomId="crit-tec"
        description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 132"
        position="bottom"
        modelPosition={roomIdToPosition["crit-tec"]}
        isHighlighted={targetRoomId === "crit-tec"}
        autoOpen={targetRoomId === "crit-tec"}
      />
      <HoverDetails
        title={getStudioName('studio-07a')}
        roomId="studio-07a"
        description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector."
        position="right"
        modelPosition={roomIdToPosition["studio-07a"]}
        isHighlighted={targetRoomId === "studio-07a"}
        autoOpen={targetRoomId === "studio-07a"}
      />
      <HoverDetails
        title={getRoomName('crit-small')}
        roomId="crit-small"
        description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 104"
        position="bottom"
        modelPosition={roomIdToPosition["crit-small"]}
        isHighlighted={targetRoomId === "crit-small"}
        autoOpen={targetRoomId === "crit-small"}
      />
      {/* Dynamic Lecturer Details */}
      {["ap1-113", "ap1-118", "ap1-117"].map((id) => {
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
    </>
  );
};

export default FirstFloorHotspots;
