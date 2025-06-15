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
  
  // Store Three.js objects for use in subsequent renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadingRef = useRef<boolean>(true);
  
  // Expose the ThreeJS objects for external use (like updating hotspot positions)
  const refs: ThreeJsSceneRefs = {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
    model: modelRef.current,
    animationFrame: animationFrameRef.current
  };

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Method to handle renderer resize
  const resizeRendererToDisplaySize = () => {
    resizeRenderer(containerRef, cameraRef.current, rendererRef.current, onHotspotUpdate);
  };

  // Function to retry loading the model
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

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Reset loading state when model source changes or when retrying
    setIsLoading(true);
    loadingRef.current = true;
    setError(null);

    // Clean up previous scene
    if (sceneRef.current) {
      // Clear existing model if any
      if (modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }
    } else {
      // Scene setup (only if not already created)
      const scene = new THREE.Scene();
      // Correct scene background color syntax
      scene.background = new THREE.Color(0x595959);
      sceneRef.current = scene;
    }

    // Camera setup (only if not already created)
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

    // Renderer setup (only if not already created)
    if (!rendererRef.current && containerRef.current) {
      const renderer = setupRenderer(containerRef.current);
      rendererRef.current = renderer;
    }

    // Controls setup (only if not already created)
    if (!controlsRef.current && cameraRef.current && rendererRef.current) {
      const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxDistance = 100;
      
      // Add event listener to update hotspot positions when user interacts
      if (onHotspotUpdate) {
        controls.addEventListener('change', onHotspotUpdate);
      }
      controlsRef.current = controls;
    }

    // Setup lighting (only if scene is newly created)
    if (sceneRef.current && !sceneRef.current.children.length) {
      setupLighting(sceneRef.current);
    }

    // Load model
    if (sceneRef.current && cameraRef.current && controlsRef.current && containerRef.current) {
      // Ensure model path is correct - try both with and without leading slash
      let fixedModelSrc = modelSrc;
      if (!fixedModelSrc.startsWith('/') && !fixedModelSrc.startsWith('http')) {
        fixedModelSrc = `/${modelSrc}`;
      }
      
      console.log(`Loading model from: ${fixedModelSrc}`);
      
      loadModel(
        fixedModelSrc, 
        sceneRef.current, 
        cameraRef.current, 
        controlsRef.current, 
        containerRef.current, 
        () => {
          setIsLoading(false);
          loadingRef.current = false;
          if (onModelLoaded) {
            onModelLoaded();
          }
        },
        (errorMsg) => {
          setError(errorMsg);
          setIsLoading(false);
          loadingRef.current = false;
        }
      );
    }

    // Handle raycasting for mouse click events
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current) return;
      
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
    };

    const onMouseClick = () => {
      if (!modelRef.current || !cameraRef.current) return;
      
      // Update the raycaster with the mouse position and camera
      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      
      // Find intersects with objects
      const intersects = raycaster.current.intersectObjects(modelRef.current.children, true);
      if (intersects.length > 0 && onObjectClick) {
        // Call the callback with the clicked object
        onObjectClick(intersects[0].object);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', onMouseMove);
      containerRef.current.addEventListener('click', onMouseClick);
    }

    // Handle window resize
    const handleResize = () => {
      resizeRendererToDisplaySize();
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      if (controlsRef.current) controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Update hotspot positions in every frame
      if (onHotspotUpdate) {
        onHotspotUpdate();
      }
    };
    
    // Start animation only if it's not already running
    if (!animationFrameRef.current) {
      animate();
    }

    // Cleanup
    return () => {
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('click', onMouseClick);
      }
      
      // Remove controls event listener
      if (controlsRef.current && onHotspotUpdate) {
        controlsRef.current.removeEventListener('change', onHotspotUpdate);
      }
      
      // We'll keep the renderer, camera, and scene for reuse
      // but remove the model to save memory
      if (sceneRef.current && modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }
    };
  }, [modelSrc, retryCount]);

  // Camera focus/animation for deep link
  const focusCameraOnPosition = (target: [number, number, number]) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Target to look at
    const lookTarget = new THREE.Vector3(...target);

    // Calculate a position offset (back 38 units, up 10 units)
    const direction = new THREE.Vector3().subVectors(camera.position, lookTarget).normalize();
    // Distance can be tuned for desired FOV
    const desiredDistance = 38;
    const newCameraPos = new THREE.Vector3().copy(lookTarget).add(direction.multiplyScalar(desiredDistance));
    newCameraPos.y += 10;

    // Animate camera (simple lerp)
    const duration = 850; // ms
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    let start: number | null = null;

    function animate(now: number) {
      if (start === null) start = now;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);

      // Interpolate position and controls target
      camera.position.lerpVectors(startPos, newCameraPos, t);
      controls.target.lerpVectors(startTarget, lookTarget, t);

      controls.update();

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        // Snap to end
        camera.position.copy(newCameraPos);
        controls.target.copy(lookTarget);
        controls.update();
      }
    }
    requestAnimationFrame(animate);
  };

  return {
    isLoading,
    error,
    refs,
    resizeRendererToDisplaySize,
    retryLoadModel,
    focusCameraOnPosition // NEW!
  };
};
