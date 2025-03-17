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
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const loadingRef = useRef<boolean>(true);
  
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const resizeRendererToDisplaySize = () => {
    resizeRenderer(containerRef, cameraRef.current, rendererRef.current, onHotspotUpdate);
  };

  const retryLoadModel = () => {
    if (retryCount < 3) {
      setRetryCount(prevCount => prevCount + 1);
      setError(null);
      setIsLoading(true);
      loadingRef.current = true;
      
      if (sceneRef.current && modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    setIsLoading(true);
    loadingRef.current = true;
    setError(null);

    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x595959);
      sceneRef.current = scene;
    }

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

    if (!rendererRef.current && containerRef.current) {
      const renderer = setupRenderer(containerRef.current);
      
      // Enable WebXR on the renderer
      renderer.xr.enabled = true;
      renderer.setAnimationLoop(() => {
        if (sceneRef.current && cameraRef.current) {
          renderer.render(sceneRef.current, cameraRef.current);
        }
      });
      
      rendererRef.current = renderer;
    }

    if (!controlsRef.current && cameraRef.current && rendererRef.current) {
      const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;
      controls.maxDistance = 100;
      
      if (onHotspotUpdate) {
        controls.addEventListener('change', onHotspotUpdate);
      }
      controlsRef.current = controls;
    }

    if (sceneRef.current && !sceneRef.current.children.length) {
      setupLighting(sceneRef.current);
    }

    if (sceneRef.current && cameraRef.current && controlsRef.current && containerRef.current) {
      let fixedModelSrc = modelSrc;
      if (!fixedModelSrc.startsWith('/') && !fixedModelSrc.startsWith('http')) {
        fixedModelSrc = `/${modelSrc}`;
      }
      
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

    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
    };

    const onMouseClick = () => {
      if (!modelRef.current || !cameraRef.current) return;
      
      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(modelRef.current.children, true);
      if (intersects.length > 0 && onObjectClick) {
        onObjectClick(intersects[0].object);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', onMouseMove);
      containerRef.current.addEventListener('click', onMouseClick);
    }

    const handleResize = () => {
      resizeRendererToDisplaySize();
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        controlsRef.current?.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        if (onHotspotUpdate) {
          onHotspotUpdate();
        }
      }
    };
    
    if (!animationFrameRef.current) {
      animate();
    }

    // Add a basic WebXR button
    const xrButton = document.createElement('button');
    xrButton.textContent = 'Enter XR';
    xrButton.style.position = 'absolute';
    xrButton.style.top = '10px';
    xrButton.style.left = '10px';
    xrButton.style.padding = '10px';
    xrButton.style.backgroundColor = '#fff';
    xrButton.style.border = '1px solid #000';
    document.body.appendChild(xrButton);

    xrButton.addEventListener('click', () => {
      if (rendererRef.current?.xr.isPresenting) {
        rendererRef.current.xr.getSession()?.end();
      } else {
        navigator.xr?.requestSession('immersive-vr').then(session => {
          rendererRef.current?.xr.setSession(session);
        });
      }
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
        containerRef.current.removeEventListener('click', onMouseClick);
      }
      
      if (controlsRef.current && onHotspotUpdate) {
        controlsRef.current.removeEventListener('change', onHotspotUpdate);
      }

      if (sceneRef.current && modelRef.current) {
        sceneRef.current.remove(modelRef.current);
        modelRef.current = null;
      }

      if (xrButton) {
        document.body.removeChild(xrButton);
      }
    };
  }, [modelSrc, retryCount]);

  return {
    isLoading,
    error,
    refs: {
      scene: sceneRef.current,
      camera: cameraRef.current,
      renderer: rendererRef.current,
      controls: controlsRef.current,
      model: modelRef.current,
      animationFrame: animationFrameRef.current
    },
    resizeRendererToDisplaySize,
    retryLoadModel
  };
};

