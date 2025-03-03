
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface UseThreeJsSceneProps {
  modelSrc: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onModelLoaded?: () => void;
  onHotspotUpdate?: () => void;
}

interface ThreeJsSceneRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  controls: OrbitControls | null;
  model: THREE.Group | null;
  animationFrame: number | null;
}

export const useThreeJsScene = ({
  modelSrc,
  containerRef,
  onModelLoaded,
  onHotspotUpdate
}: UseThreeJsSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Store Three.js objects for use in subsequent renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Expose the ThreeJS objects for external use (like updating hotspot positions)
  const refs: ThreeJsSceneRefs = {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    controls: controlsRef.current,
    model: modelRef.current,
    animationFrame: animationFrameRef.current
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    setIsLoading(true);
    setError(null);

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Enhanced lighting setup
    setupLighting(scene);

    // Renderer
    const renderer = setupRenderer(containerRef.current);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxDistance = 100;
    
    // Add event listener to update hotspot positions when user interacts
    if (onHotspotUpdate) {
      controls.addEventListener('change', onHotspotUpdate);
    }
    controlsRef.current = controls;

    // Load model
    loadModel(modelSrc, scene, camera, controls, containerRef.current, onModelLoaded);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      if (onHotspotUpdate) {
        onHotspotUpdate();
      }
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
    
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (controlsRef.current && onHotspotUpdate) {
        controlsRef.current.removeEventListener('change', onHotspotUpdate);
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [modelSrc, onHotspotUpdate, onModelLoaded]);

  // Helper function to setup lighting
  const setupLighting = (scene: THREE.Scene) => {
    // Stronger ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Add multiple directional lights from different angles
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-1, 2, -1);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight3.position.set(0, -1, 0);
    scene.add(directionalLight3);

    // Add a hemisphere light for more natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);
  };

  // Helper function to setup renderer
  const setupRenderer = (container: HTMLDivElement) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Update to use the correct properties for newer Three.js versions
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Note: physicallyCorrectLights is deprecated and has been replaced
    // We'll set the legacy lighting mode to false to use the new lighting model
    renderer.useLegacyLights = false;
    
    container.appendChild(renderer.domElement);
    return renderer;
  };

  // Helper function to load the 3D model
  const loadModel = (
    modelSrc: string, 
    scene: THREE.Scene, 
    camera: THREE.PerspectiveCamera, 
    controls: OrbitControls, 
    container: HTMLDivElement,
    onModelLoaded?: () => void
  ) => {
    const loader = new GLTFLoader();
    loader.load(
      modelSrc,
      (gltf) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Reset position to center
        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;
        
        // Adjust camera position based on model size
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Add some margin
        camera.position.z = cameraZ;
        
        // Set controls target to model center
        controls.target.set(0, 0, 0);
        controls.update();
        
        modelRef.current = gltf.scene;
        scene.add(gltf.scene);
        setIsLoading(false);
        
        // Notify that model has loaded
        if (onModelLoaded) {
          onModelLoaded();
        }
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened while loading the model:', error);
        setError('Failed to load 3D model. Please try again later.');
        setIsLoading(false);
      }
    );
  };

  return { isLoading, error, refs };
};
