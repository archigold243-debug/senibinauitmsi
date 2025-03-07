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
  
  // Ensure modelSrc has the correct format for browser loading
  let normalizedModelSrc = modelSrc.replace(/^\/+/, '');
  
  console.log(`Original model path: ${modelSrc}`);
  console.log(`Normalized model path: ${normalizedModelSrc}`);
  
  try {
    if (normalizedModelSrc.startsWith('http')) {
      loader.load(
        normalizedModelSrc,
        handleSuccess,
        handleProgress,
        handleError
      );
    } else {
      loader.load(
        normalizedModelSrc, 
        handleSuccess,
        handleProgress,
        (error) => {
          console.log(`Failed to load model directly: ${normalizedModelSrc}. Trying with origin prefix...`);
          const originPrefixed = `${window.location.origin}/${normalizedModelSrc}`;
          console.log(`Attempting with origin prefix: ${originPrefixed}`);
          loader.load(
            originPrefixed,
            handleSuccess,
            handleProgress,
            (error) => {
              const publicPrefixed = `${window.location.origin}/public/${normalizedModelSrc}`;
              console.log(`Attempting with public folder prefix: ${publicPrefixed}`);
              loader.load(
                publicPrefixed,
                handleSuccess,
                handleProgress,
                (finalError) => handleError(finalError, [normalizedModelSrc, originPrefixed, publicPrefixed])
              );
            }
          );
        }
      );
    }
  } catch (err) {
    const error = err as Error;
    console.error("Exception when setting up model loading:", error);
    onError(`Failed to set up model loading: ${error.message}`);
  }
  
  function handleSuccess(gltf: any) {
    console.log("Model loaded successfully:", gltf);
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust scale if needed

    // Enable casting and receiving shadows
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;  // Make the model cast shadows
        child.receiveShadow = true; // Make the model receive shadows
      }
    });

    scene.add(model);

    // Compute bounding box and center model
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Convert FOV from degrees to radians before using in calculations
    const fovRadians = (camera.fov * Math.PI) / 180;
    
    // Calculate camera position based on model size and FOV
    let cameraZ = Math.abs(maxDim / (2 * Math.tan(fovRadians / 2)));
    
    // Adjust camera position
    camera.position.set(0, cameraZ * 0.5, -cameraZ * 2);
    
    // Ensure the camera looks at the model
    const center = new THREE.Vector3();
    box.getCenter(center);
    camera.lookAt(center);
    
    // Update controls target
    controls.target.copy(center);
    controls.update();

    // Notify that the model is loaded
    onLoaded();
    return model;
  }
  
  function handleProgress(progressEvent: any) {
    if (progressEvent.lengthComputable) {
      const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
      console.log(`Model loading progress: ${Math.round(percentComplete)}%`);
    }
  }
  
  function handleError(error: any, attemptedPaths: string[] = [normalizedModelSrc]) {
    console.error("Error loading model:", error);
    const pathsMessage = attemptedPaths.map(path => `- ${path}`).join('\n');
    const errorMessage = `
Failed to load model: ${modelSrc}
Attempted to load from:
${pathsMessage}
Please check if:
1. The file exists in the public directory
2. The file name is spelled correctly (case-sensitive)
3. The file format is supported (.gltf or .glb)
`;
    console.error("Detailed error:", errorMessage);
    onError(errorMessage);
  }
};
