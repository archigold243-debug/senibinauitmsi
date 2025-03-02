
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelViewerProps {
  modelSrc: string;
  children?: React.ReactNode;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelSrc, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<HTMLDivElement[]>([]);
  
  // Store Three.js objects for use in subsequent renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Update to use the correct properties for newer Three.js versions
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Note: physicallyCorrectLights is deprecated and has been replaced
    // We'll set the legacy lighting mode to false to use the new lighting model
    renderer.useLegacyLights = false;
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxDistance = 100;
    
    // Add event listener to update hotspot positions when user interacts
    controls.addEventListener('change', updateHotspotPositions);
    controlsRef.current = controls;

    // Load model
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
        
        // Get all hotspots after model loads
        const hotspotElements = containerRef.current?.querySelectorAll('.hotspot') as NodeListOf<HTMLDivElement>;
        setHotspots(Array.from(hotspotElements || []));
        
        // Update hotspot positions initially
        setTimeout(updateHotspotPositions, 100);
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

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      updateHotspotPositions();
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (controlsRef.current) {
        controlsRef.current.removeEventListener('change', updateHotspotPositions);
        controlsRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [modelSrc]);

  // Update hotspot positions when they change
  useEffect(() => {
    if (hotspots.length > 0 && !isLoading) {
      updateHotspotPositions();
    }
  }, [hotspots, isLoading]);

  return (
    <div className="relative w-full h-full min-h-[500px] md:min-h-[700px]" ref={containerRef}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500">Loading model...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <p className="text-lg text-red-500 mb-2">{error}</p>
            <p className="text-sm text-gray-500">
              Please check that the model file exists and is in the correct format.
            </p>
          </div>
        </div>
      )}
      
      {/* This is where interactive elements would be placed */}
      <div className="model-container absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default ModelViewer;
