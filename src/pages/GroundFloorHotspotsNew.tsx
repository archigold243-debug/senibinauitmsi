import React from 'react';
import DynamicHotspots from '@/components/DynamicHotspots';

interface GroundFloorHotspotsNewProps {
  roomIdToPosition: Record<string, [number, number, number]>;
  targetRoomId?: string;
}

const GroundFloorHotspotsNew: React.FC<GroundFloorHotspotsNewProps> = ({ targetRoomId }) => {
  return (
    <DynamicHotspots 
      floor="Ground Floor" 
      targetRoomId={targetRoomId} 
    />
  );
};

export default GroundFloorHotspotsNew;