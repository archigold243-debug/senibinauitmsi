import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface GroundFloorHotspotsProps {
  roomIDToPosition: Record<string, [number, number, number]>;
  targetRoomID?: string;
}

const GroundFloorHotspots: React.FC<GroundFloorHotspotsProps> = ({ roomIDToPosition, targetRoomID }) => {
  const { lecturers, studios } = useRoomContext();

  const getLecturerByRoomID = (roomID: string) =>
    lecturers.find((lect) => lect.roomID?.toLowerCase() === roomID.toLowerCase());

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  return (
    <>
      <HoverDetails
        title={getStudioName('studio-08b')}
        roomID="studio-08b"
        description="Max Pax= 30. Fixed Workstation, 3 AC, Projector"
        position="right"
        modelPosition={roomIDToPosition["studio-08b"]}
        isHighlighted={targetRoomID === "studio-08b"}
        autoOpen={targetRoomID === "studio-08b"}
      />
      <HoverDetails
        title={getStudioName('studio-master-01')}
        roomID="studio-master-01"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIDToPosition["studio-master-01"]}
        isHighlighted={targetRoomID === "studio-master-01"}
        autoOpen={targetRoomID === "studio-master-01"}
      />
      <HoverDetails
        title={getStudioName('studio-master-03')}
        roomID="studio-master-03"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIDdToPosition["studio-master-03"]}
        isHighlighted={targetRoomID === "studio-master-03"}
        autoOpen={targetRoomID === "studio-master-03"}
      />
      <HoverDetails
        title={getStudioName('studio-08a')}
        roomID="studio-08a"
        description="Max Pax= 30. Fixed Workstation, 3 AC, Projector"
        position="right"
        modelPosition={roomIDToPosition["studio-08a"]}
        isHighlighted={targetRoomID === "studio-08a"}
        autoOpen={targetRoomID === "studio-08a"}
      />
      <HoverDetails
        title="Arc.Lab"
        roomID="arclab"
        description="Laser Cutter"
        position="top"
        modelPosition={roomIDToPosition["arclab"]}
        isHighlighted={targetRoomID === "arclab"}
        autoOpen={targetRoomID === "arclab"}
      />
      <HoverDetails
        title={getStudioName('studio-master-04')}
        roomID="studio-master-04"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIDToPosition["studio-master-04"]}
        isHighlighted={targetRoomID === "studio-master-04"}
        autoOpen={targetRoomID === "studio-master-04"}
      />
      <HoverDetails
        title={getStudioName('studio-master-02')}
        roomID="studio-master-02"
        description="Max Pax= 25. 24 hours operational Studio, Fixed Workstation, Projector"
        position="right"
        modelPosition={roomIdToPosition["studio-master-02"]}
        isHighlighted={targetRoomID === "studio-master-02"}
        autoOpen={targetRoomID === "studio-master-02"}
       />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 022"
        position="right"
        modelPosition={roomIDToPosition["classroom-022"]}
        roomID="classroom-022"
        isHighlighted={targetRoomID === "classroom-022"}
        autoOpen={targetRoomID === "classroom-022"}
       />
      <HoverDetails
        title="Classroom"
        description="Max Pax= 40. Projector, AP1 002"
        position="right"
        modelPosition={roomIDToPosition["classroom-002"]}
        roomID="classroom-002"
        isHighlighted={targetRoomID === "classroom-002"}
        autoOpen={targetRoomID === "classroom-002"}
       />
      {/* Lecturer Hotspots using dynamic data */}
      {["ap1-019", "ap1-004", "ap1-017", "ap1-023"].map((id) => {
        const lect = getLecturerByRoomID(id);
        if (!lect) return null;
        return (
          <HoverDetails
            key={id}
            title={lect.displayName}
            surname={lect.surname}
            position="right"
            modelPosition={roomIDToPosition[id]}
            imageSrc={lect.photo}
            roomID={id}
            isHighlighted={targetRoomID === id}
            autoOpen={targetRoomID === id}
          />
        );
      })}
    </>
  );
};

export default GroundFloorHotspots;
