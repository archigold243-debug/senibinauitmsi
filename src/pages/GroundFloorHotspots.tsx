import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface GroundFloorHotspotsProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const GroundFloorHotspots: React.FC<GroundFloorHotspotsProps> = ({ roomIdToPosition, targetRoomId }) => {
  const { lecturers, studios } = useRoomContext();

  const getLecturerByRoomId = (roomId: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomId.toLowerCase());

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  return (
    <>
      <HoverDetails
        title={getStudioName('studio-08b')}
        roomId="studio-08b"
        description="Max Pax= 30. Fixed Workstation, 3 AC, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-08b"]}
        isHighlighted={targetRoomId === "studio-08b"}
        autoOpen={targetRoomId === "studio-08b"}
      />
      <HoverDetails
        title={getStudioName('studio-master-01')}
        roomId="studio-master-01"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-master-01"]}
        isHighlighted={targetRoomId === "studio-master-01"}
        autoOpen={targetRoomId === "studio-master-01"}
      />
      <HoverDetails
        title={getStudioName('studio-master-03')}
        roomId="studio-master-03"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-master-03"]}
        isHighlighted={targetRoomId === "studio-master-03"}
        autoOpen={targetRoomId === "studio-master-03"}
      />
      <HoverDetails
        title={getStudioName('studio-08a')}
        roomId="studio-08a"
        description="Max Pax= 30. Fixed Workstation, 3 AC, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-08a"]}
        isHighlighted={targetRoomId === "studio-08a"}
        autoOpen={targetRoomId === "studio-08a"}
      />
      <HoverDetails
        title="Arc.Lab"
        roomId="arclab"
        description="Laser Cutter"
        position="top"
        modelPosition={roomIdToPosition["arclab"]}
        isHighlighted={targetRoomId === "arclab"}
        autoOpen={targetRoomId === "arclab"}
      />
      <HoverDetails
        title={getStudioName('studio-master-04')}
        roomId="studio-master-04"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-master-04"]}
        isHighlighted={targetRoomId === "studio-master-04"}
        autoOpen={targetRoomId === "studio-master-04"}
      />
      <HoverDetails
        title={getStudioName('studio-master-02')}
        roomId="studio-master-02"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-master-02"]}
        isHighlighted={targetRoomId === "studio-master-02"}
        autoOpen={targetRoomId === "studio-master-02"}
       />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 022"
        position="right"
        modelPosition={roomIdToPosition["classroom-022"]}
        roomId="classroom-022"
        isHighlighted={targetRoomId === "classroom-022"}
        autoOpen={targetRoomId === "classroom-022"}
       />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 002"
        position="right"
        modelPosition={roomIdToPosition["classroom-002"]}
        roomId="classroom-002"
        isHighlighted={targetRoomId === "classroom-002"}
        autoOpen={targetRoomId === "classroom-002"}
       />
      {/* Lecturer Hotspots using dynamic data */}
      {["ap1-019", "ap1-004", "ap1-017", "ap1-023"].map((id) => {
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

export default GroundFloorHotspots;
