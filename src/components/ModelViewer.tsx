import React, { useRef, useEffect, useState } from 'react';
import { useThreeJsScene } from '@/hooks/useThreeJsScene';
import { useHotspotPositioning } from '@/hooks/useHotspotPositioning';
import LoadingState from './model-viewer/LoadingState';
import WebXRScene from './WebXRScene'; // Import the new WebXR scene

interface ModelViewerProps {
  modelSrc: string;
  children?: React.ReactNode;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelSrc, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isARActive, setIsARActive] = useState(false); // Track AR/VR mode

  // Create a callback for when hotspot positions need to be updated
  const onHotspotUpdateRef = useRef<() => void>(() => {});

  // Initialize the Three.js scene
  const { isLoading, error, refs, resizeRendererToDisplaySize, retryLoadModel, toggleXR } = useThreeJsScene({
    modelSrc,
    containerRef,
    onModelLoaded: () => {
      // Force update positions after model loaded
      setTimeout(() => onHotspotUpdateRef.current(), 100);
    },
    onHotspotUpdate: () => onHotspotUpdateRef.current(),
    isARActive, // Pass AR/VR state to scene
  });

  // Setup hotspot positioning
  const { updateHotspotPositions } = useHotspotPositioning({
    containerRef,
    cameraRef: { current: refs.camera },
    sceneRef: { current: refs.scene },
    isLoading,
  });

  // Assign the update function to the ref so the ThreeJS scene can call it
  onHotspotUpdateRef.current = updateHotspotPositions;

  // Add useEffect for resizing
  useEffect(() => {
    const handleResize = () => {
      resizeRendererToDisplaySize();
    };

    window.addEventListener('resize', handleResize);

    // Log the model source for debugging
    console.log(`ModelViewer attempting to load: ${modelSrc}`);
    console.log(`Current origin: ${window.location.origin}`);
    console.log(`Full expected URL: ${new URL(modelSrc, window.location.origin).href}`);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeRendererToDisplaySize, modelSrc]);

  const handleToggleARVR = () => {
    setIsARActive(!isARActive); // Toggle AR/VR mode
    toggleXR(!isARActive); // Call the XR toggle function in the Three.js scene
  };

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[700px]" ref={containerRef}>
      <LoadingState 
        isLoading={isLoading} 
        error={error} 
        onRetry={retryLoadModel} 
        modelSrc={modelSrc} 
      />

      {/* AR/VR Toggle Button */}
      <button
        onClick={handleToggleARVR}
        className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg z-10"
      >
        {isARActive ? 'Exit AR/VR' : 'Enter AR/VR'}
      </button>

      {/* Render WebXR scene or regular Three.js scene */}
      {isARActive ? (
        <WebXRScene modelSrc={modelSrc} />  // Render WebXR scene when AR/VR mode is active
      ) : (
        <>
          {/* Interactive elements positioned over the 3D scene */}
          <div className="absolute inset-0 pointer-events-none">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default ModelViewer;
