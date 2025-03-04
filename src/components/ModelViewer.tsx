
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useThreeJsScene } from '@/hooks/useThreeJsScene';
import { useHotspotPositioning } from '@/hooks/useHotspotPositioning';
import LoadingState from './model-viewer/LoadingState';
import * as THREE from 'three';

interface ModelViewerProps {
  modelSrc: string;
  children?: React.ReactNode;
  onModelPartHover?: (info: {
    object: THREE.Object3D;
    position: THREE.Vector3;
    name: string;
  } | null) => void;
  onModelPartClick?: (info: {
    object: THREE.Object3D;
    position: THREE.Vector3;
    name: string;
  }) => void;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  modelSrc, 
  children,
  onModelPartHover,
  onModelPartClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<{
    position: [number, number];
    info: { title: string; description: string } | null;
  } | null>(null);

  // Create a callback for when hotspot positions need to be updated
  const onHotspotUpdateRef = useRef<() => void>(() => {});

  // Initialize the Three.js scene
  const { isLoading, error, refs, resizeRendererToDisplaySize } = useThreeJsScene({
    modelSrc,
    containerRef,
    onHotspotUpdate: () => onHotspotUpdateRef.current(),
    onObjectHover: (object) => {
      if (onModelPartHover && object) {
        const position = new THREE.Vector3();
        object.getWorldPosition(position);
        onModelPartHover({
          object,
          position,
          name: object.name || 'Unknown part'
        });
      } else if (onModelPartHover && !object) {
        onModelPartHover(null);
      }
    },
    onObjectClick: (object) => {
      if (onModelPartClick) {
        const position = new THREE.Vector3();
        object.getWorldPosition(position);
        onModelPartClick({
          object,
          position,
          name: object.name || 'Unknown part'
        });
      }
    }
  });

  // Setup hotspot positioning
  const { updateHotspotPositions } = useHotspotPositioning({
    containerRef,
    cameraRef: { current: refs.camera },
    sceneRef: { current: refs.scene },
    isLoading
  });

  // Assign the update function to the ref so the ThreeJS scene can call it
  onHotspotUpdateRef.current = updateHotspotPositions;

  // Add useEffect for resizing
  useEffect(() => {
    const handleResize = () => {
      resizeRendererToDisplaySize();
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeRendererToDisplaySize]);

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[700px]" ref={containerRef}>
      <LoadingState isLoading={isLoading} error={error} />
      
      {/* This is where interactive elements would be placed */}
      <div className="model-container absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default ModelViewer;
