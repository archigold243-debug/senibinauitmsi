
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Helper function to setup lighting
export const setupLighting = (scene: THREE.Scene) => {
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
export const setupRenderer = (container: HTMLDivElement) => {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Update to use the correct properties for newer Three.js versions
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0); // Optional: makes background transparent
  
  container.appendChild(renderer.domElement);
  return renderer;
};

// Helper function to handle renderer resize
export const resizeRenderer = (
  containerRef: React.RefObject<HTMLDivElement>,
  camera: THREE.PerspectiveCamera | null,
  renderer: THREE.WebGLRenderer | null,
  onHotspotUpdate?: () => void
) => {
  if (!containerRef.current || !camera || !renderer) return;
  
  camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
  
  if (onHotspotUpdate) {
    onHotspotUpdate();
  }
};
