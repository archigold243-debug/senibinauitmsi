
import { useEffect, useState } from 'react';
import * as THREE from 'three';

interface UseHotspotPositioningProps {
  containerRef: React.RefObject<HTMLDivElement>;
  cameraRef: React.RefObject<THREE.PerspectiveCamera | null>;
  sceneRef: React.RefObject<THREE.Scene | null>;
  isLoading: boolean;
}

export const useHotspotPositioning = ({
  containerRef,
  cameraRef,
  sceneRef,
  isLoading
}: UseHotspotPositioningProps) => {
  const [hotspots, setHotspots] = useState<HTMLDivElement[]>([]);
  
  // Update hotspot positions when camera or controls change
  const updateHotspotPositions = () => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current || hotspots.length === 0) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Update each hotspot's position
    hotspots.forEach(hotspot => {
      const dataPos = hotspot.dataset.position;
      if (!dataPos) return;
      
      // Parse the 3D position from the data attribute
      const [x, y, z] = dataPos.split(',').map(Number);
      
      // Create a 3D vector for the hotspot position
      const position = new THREE.Vector3(x, y, z);
      
      // Project the 3D position to 2D screen coordinates
      position.project(cameraRef.current!);
      
      // Convert to CSS coordinates
      const widthHalf = containerRect.width / 2;
      const heightHalf = containerRect.height / 2;
      const posX = (position.x * widthHalf) + widthHalf;
      const posY = - (position.y * heightHalf) + heightHalf;
      
      // Only show hotspots that are in front of the camera
      if (position.z < 1) {
        hotspot.style.left = `${posX}px`;
        hotspot.style.top = `${posY}px`;
        hotspot.style.display = 'block';
      } else {
        hotspot.style.display = 'none';
      }
    });
  };

  // Find hotspots and set them up for positioning
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      // Get all hotspots after model loads
      const hotspotElements = containerRef.current.querySelectorAll('.hotspot') as NodeListOf<HTMLDivElement>;
      setHotspots(Array.from(hotspotElements || []));
    }
  }, [isLoading, containerRef]);

  // Update hotspot positions when they change
  useEffect(() => {
    if (hotspots.length > 0 && !isLoading) {
      updateHotspotPositions();
    }
  }, [hotspots, isLoading]);

  return { updateHotspotPositions };
};
