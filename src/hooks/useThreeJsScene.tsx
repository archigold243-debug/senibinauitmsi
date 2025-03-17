import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UseThreeJsSceneProps, ThreeJsSceneRefs } from './three-js-scene/types';
import { setupLighting, setupRenderer, resizeRenderer } from './three-js-scene/sceneUtils';
import { loadModel } from './three-js-scene/modelLoader';

export const useThreeJsScene = ({
  modelSrc,
  containerRef,
  onModelLoaded,
  onHotspotUpdate,
  onObjectClick
}: UseThreeJsSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isARSupported, setIsARSupported] = useState(false); // AR Support State
  
  // Store Three.js objects for use in subsequent renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadingRef = useRef<boolean>(true);
  
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Expose the ThreeJS objects for external use (like updating hotspot positions)
  const refs: ThreeJsSceneRefs = {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
    model: modelRef.current,
    animationFrame: animationFrameRef.current
  };

  const resizeRendererToDisplaySize = () => {
    resizeRenderer(containerRef, cameraRef.current, rendererRef.current, onHotspotUpdate);
  };

  const retryLoadModel = () => {
    if (retryCount < 3) {
      console.log(`Retrying model load (attempt ${retryCount + 1}/3)...`);
      setRetryCount(prevCount => prevCount + 1);
      setError(null);
      setIsLoading(true);
      loadingRef.current = true;

      // Clear the current model if any
      if (sceneRef.current && modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }
    }
  };

  // Handle WebXR AR session creation
  const startARSession = () => {
    if (rendererRef.current) {
      rendererRef.current.xr.enabled = true;
      rendererRef.current.xr.setReferenceSpaceType('local');
      
      navigator.xr?.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] })
        .then(session => {
          rendererRef.current!.xr.setSession(session);
        })
        .catch(error => {
          console.error("Failed to start AR session:", error);
        });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if AR is supported
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then(supported => {
        setIsARSupported(supported);
      });
    }

    // Scene setup
    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x595959);
      sceneRef.current = scene;
    }

    // Camera setup
    if (!cameraRef.current && containerRef.current) {
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 50;
      cameraRef.current = camera;
    }

    // Renderer setup
    if (!rendererRef.current && containerRef.current) {
      const renderer = setupRenderer(containerRef.current);
      rendererRef.current = renderer;
      renderer.xr.enabled = true; // Enable WebXR
    }

    // Lighting setup
    if (sceneRef.current && !sceneRef.current.children.length) {
      setupLighting(sceneRef.current);
    }

    // Load the model
    if (sceneRef.current && cameraRef.current && containerRef.current) {
      loadModel(
        modelSrc,
        sceneRef.current,
        cameraRef.current,
        controlsRef.current!,
        containerRef.current,
        () => {
          setIsLoading(false);
          loadingRef.current = false;
          if (onModelLoaded) onModelLoaded();
        },
        (errorMsg) => {
          setError(errorMsg);
          setIsLoading(false);
          loadingRef.current = false;
        }
      );
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      if (onHotspotUpdate) onHotspotUpdate();
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [modelSrc]);

  return {
    isLoading,
    error,
    refs,
    resizeRendererToDisplaySize,
    retryLoadModel,
    isARSupported, // New state for AR support
    startARSession // New function to start AR session
  };
};
