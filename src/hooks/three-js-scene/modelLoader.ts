
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Helper function to load the model
export const loadModel = (
  modelSrc: string, 
  scene: THREE.Scene, 
  camera: THREE.PerspectiveCamera, 
  controls: OrbitControls,
  container: HTMLDivElement, 
  onLoaded: () => void,
  onError: (error: string) => void
) => {
  const loader = new GLTFLoader();
  
  // Add cache busting query parameter to prevent browser caching
  const cacheBustingSrc = `${modelSrc}?t=${new Date().getTime()}`;
  console.log(`Requesting model with cache busting: ${cacheBustingSrc}`);
  
  loader.load(
    cacheBustingSrc, 
    (gltf) => {
      console.log("Model loaded successfully:", modelSrc);
      const model = gltf.scene;
      model.scale.set(1, 1, 1); // Adjust scale if needed
      scene.add(model);

      // Compute bounding box and center model
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180); // Convert to radians
      let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));
      camera.position.set(100, size.y * 5, -size.z * 5);
      
      // Ensure the camera looks at the model
      const center = new THREE.Vector3();
      box.getCenter(center);
      camera.lookAt(center);
      
      controls.target.copy(center);
      controls.update();

      onLoaded(); // Invoke callback
      return model;
    },
    (progressEvent) => {
      // Log loading progress
      if (progressEvent.lengthComputable) {
        const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
        console.log(`Model loading progress: ${Math.round(percentComplete)}%`);
      }
    }, 
    (error) => {
      console.error("Error loading model:", error);
      console.error("Model source:", modelSrc);
      onError(`Failed to load model: ${modelSrc}`);
    }
  );
};
