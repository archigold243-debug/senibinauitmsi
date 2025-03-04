
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const useThreeJsScene = (modelPath: string, canvasRef: React.RefObject<HTMLCanvasElement>, setLoadingProgress: (progress: number) => void) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(0xf0f0f0);

    // Set up camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.set(5, 5, 5);

    // Set up renderer
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    rendererRef.current.outputColorSpace = THREE.SRGBColorSpace;

    // Set up controls
    controlsRef.current = new OrbitControls(
      cameraRef.current,
      rendererRef.current.domElement
    );
    controlsRef.current.enableDamping = true;
    controlsRef.current.dampingFactor = 0.05;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    sceneRef.current.add(directionalLight);

    // Load 3D model
    const loader = new GLTFLoader();
    
    // Ensure we're using the correct path format
    // Use relative paths instead of absolute URLs
    const correctedModelPath = `./${modelPath}`;
    
    console.log("Loading model from path:", correctedModelPath);
    
    loader.load(
      correctedModelPath,
      (gltf) => {
        if (sceneRef.current) {
          sceneRef.current.add(gltf.scene);
          setIsModelLoaded(true);
          setLoadingProgress(100);
          
          // Reset camera and controls for better view
          if (cameraRef.current && controlsRef.current) {
            // Position camera to better view the model
            cameraRef.current.position.set(8, 8, 8);
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
          }
        }
      },
      (progress) => {
        const percentComplete = Math.round(
          (progress.loaded / progress.total) * 100
        );
        setLoadingProgress(percentComplete);
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [modelPath, canvasRef, setLoadingProgress]);

  return { isModelLoaded };
};
