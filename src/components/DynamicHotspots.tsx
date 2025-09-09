import React from 'react';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';

interface DynamicHotspotsProps {
  floor?: string;
  targetRoomId?: string;
}

const DynamicHotspots: React.FC<DynamicHotspotsProps> = ({ floor, targetRoomId }) => {
  const { lecturers, roomIdToPosition } = useRoomContext();

  // Filter lecturers by floor if specified
  const floorLecturers = floor 
    ? lecturers.filter(lecturer => lecturer.floor?.toLowerCase().includes(floor.toLowerCase()))
    : lecturers;

  return (
    <>
      {/* Render lecturer hotspots */}
      {floorLecturers.map((lecturer) => {
        const position = roomIdToPosition[lecturer.roomID];
        if (!position) return null;

        return (
          <HoverDetails
            key={lecturer.roomID}
            title={lecturer.username}
            surname={lecturer.surname}
            description={Array.isArray(lecturer.expertise) && lecturer.expertise.length > 0 ? lecturer.expertise.join(", ") : (typeof lecturer.expertise === 'string' && lecturer.expertise ? lecturer.expertise : "Lecturer")}
            position="right"
            modelPosition={position}
            imageSrc={lecturer.photo_url}
            roomID={lecturer.roomID}
            isHighlighted={targetRoomId === lecturer.roomID}
            autoOpen={targetRoomId === lecturer.roomID}
          />
        );
      })}
    </>
  );
};

export default DynamicHotspots;
