import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelViewerProps {
  modelSrc: string;
  children?: React.ReactNode;
  hotspotsData?: { id: string; position: [number, number, number]; label: string }[];
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelSrc, children, hotspotsData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hotspots, setHotspots] = useState<HTMLDivElement[]>([]);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  const updateHotspotPositions = () => {
    if (!containerRef.current || !cameraRef.current || !sceneRef.current || hotspots.length === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    hotspots.forEach(hotspot => {
      const dataPos = hotspot.dataset.position;
      if (!dataPos) return;

      const [x, y, z] = dataPos.split(',').map(Number);
      const position = new THREE.Vector3(x, y, z);
      position.project(cameraRef.current!);

      const widthHalf = containerRect.width / 2;
      const heightHalf = containerRect.height / 2;
      const posX = (position.x * widthHalf) + widthHalf;
      const posY = -(position.y * heightHalf) + heightHalf;

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

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.useLegacyLights = false;

    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxDistance = 100;

    controls.addEventListener('change', updateHotspotPositions);
    controlsRef.current = controls;

    const loader = new GLTFLoader();
    loader.load(
      modelSrc,
      (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5;
        camera.position.z = cameraZ;

        controls.target.set(0, 0, 0);
        controls.update();

        modelRef.current = gltf.scene;
        scene.add(gltf.scene);
        setIsLoading(false);

        const hotspotElements = containerRef.current?.querySelectorAll('.hotspot') as NodeListOf<HTMLDivElement>;
        setHotspots(Array.from(hotspotElements || []));

        setTimeout(updateHotspotPositions, 100);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + '% loaded'),
      (error) => {
        console.error('An error happened while loading the model:', error);
        setError('Failed to load 3D model. Please try again later.');
        setIsLoading(false);
      }
    );

    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      updateHotspotPositions();
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    animate();

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
      
      <div className="model-container absolute inset-0 pointer-events-none">
        {children}
        {hotspotsData?.map((hotspot) => (
          <div
            key={hotspot.id}
            className="hotspot absolute bg-red-500 p-2 rounded-full text-white text-sm"
            data-position={hotspot.position.toString()}
            style={{ display: 'none' }}
          >
            {hotspot.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelViewer;
