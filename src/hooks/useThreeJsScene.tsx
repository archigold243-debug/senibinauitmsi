
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface UseThreeJsSceneProps {
  modelSrc: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onModelLoaded?: () => void;
  onHotspotUpdate?: () => void;
  onObjectClick?: (object: THREE.Object3D) => void;
  onObjectHover?: (object: THREE.Object3D | null) => void; // Added hover callback
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
  onHotspotUpdate,
  onObjectClick,
  onObjectHover
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

  const raycaster = useRef(new THREE.Raycaster()); // Raycaster instance
  const mouse = useRef(new THREE.Vector2()); // Store mouse position
  const hoveredObject = useRef<THREE.Object3D | null>(null); // Track currently hovered object

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Reset loading state when model source changes
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
      scene.background = new THREE.Color(0x333333);
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
      loadModel(modelSrc, sceneRef.current, cameraRef.current, controlsRef.current, containerRef.current, () => {
        setIsLoading(false);
        loadingRef.current = false;
        if (onModelLoaded) {
          onModelLoaded();
        }
      });
    }

    // Handle raycasting for mouse interactions (click and hover)
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !modelRef.current) return;
      
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // Handle hover state with raycasting
      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(modelRef.current.children, true);
      
      if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // If hovering a new object
        if (hoveredObject.current !== object && onObjectHover) {
          hoveredObject.current = object;
          onObjectHover(object);
          containerRef.current.style.cursor = 'pointer'; // Change cursor to indicate interactive element
        }
      } else if (hoveredObject.current !== null) {
        // If no longer hovering any object
        hoveredObject.current = null;
        if (onObjectHover) onObjectHover(null);
        containerRef.current.style.cursor = 'auto'; // Reset cursor
      }
    };

    const onMouseClick = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !modelRef.current) return;
      
      // Update the raycaster with the mouse position and camera
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      raycaster.current.setFromCamera(mouse.current, cameraRef.current);
      
      // Find intersects with objects
      const intersects = raycaster.current.intersectObjects(modelRef.current.children, true);
      if (intersects.length > 0 && onObjectClick) {
        // Call the callback with the clicked object
        onObjectClick(intersects[0].object);
      }
    };

    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('click', onMouseClick);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
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
      containerRef.current?.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeEventListener('click', onMouseClick);
      
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
  }, [modelSrc]);

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
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Use outputColorSpace instead of outputEncoding (for newer Three.js versions)
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0); // Optional: makes background transparent
    
    container.appendChild(renderer.domElement);
    return renderer;
  };

  // Helper function to load the model
  const loadModel = (
    modelSrc: string, 
    scene: THREE.Scene, 
    camera: THREE.PerspectiveCamera, 
    controls: OrbitControls,
    container: HTMLDivElement, 
    onLoaded: () => void
  ) => {
    const loader = new GLTFLoader();
    
    loader.load(
      modelSrc, 
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        
        // Log model structure to help with debugging
        const model = gltf.scene;
        console.log('Model structure:', model);
        
        // Add names to unnamed objects for better identification
        model.traverse((object) => {
          // If object has no name but has geometry, set a name based on material or index
          if (!object.name && (object as THREE.Mesh).geometry) {
            const mesh = object as THREE.Mesh;
            const materialName = mesh.material ? 
              (Array.isArray(mesh.material) ? mesh.material[0].name || 'Material' : mesh.material.name || 'Material') : 
              'Unknown';
            object.name = `Part_${materialName}_${Math.floor(Math.random() * 1000)}`;
            console.log('Named object:', object.name);
          }
        });
        
        model.scale.set(1, 1, 1); // Adjust scale if needed
        scene.add(model);
        modelRef.current = model;

        // Compute bounding box and center model
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 90); 
        let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));
        camera.position.set(size.x * 0.5, size.y * 2, size.z * 2);
        
        // Ensure the camera looks at the model
        const center = new THREE.Vector3();
        box.getCenter(center);
        camera.lookAt(center);
        
        controls.target.copy(center);
        controls.update();

        onLoaded(); // Invoke callback
      },
      (progress) => {
        console.log('Loading progress:', progress);
      }, 
      (error) => {
        console.error('Error loading model:', error);
        setError('An error occurred while loading the model.');
        setIsLoading(false);
        loadingRef.current = false;
      }
    );
  };

  // Function to resize renderer based on container size
  const resizeRendererToDisplaySize = () => {
    if (!rendererRef.current || !containerRef.current || !cameraRef.current) return false;
    
    const canvas = rendererRef.current.domElement;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    
    if (needResize) {
      rendererRef.current.setSize(width, height, false);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    }
    
    return needResize;
  };

  return {
    isLoading,
    error,
    refs,
    resizeRendererToDisplaySize
  };
};
