import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface WebXRSceneProps {
  modelSrc: string;
}

const WebXRScene: React.FC<WebXRSceneProps> = ({ modelSrc }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null); // Store the model

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3); // Adjust position for better viewing in AR/VR
    cameraRef.current = camera;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Enable WebXR
    rendererRef.current = renderer;
    document.body.appendChild(renderer.domElement);

    // Set up the lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 1, 0);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 6, 0);
    scene.add(directionalLight);

    // Load the model
    const loader = new GLTFLoader();
    loader.load(modelSrc, (gltf) => {
      modelRef.current = gltf.scene;
      modelRef.current.scale.set(0.2, 0.2, 0.2); // Scale model to fit in AR/VR view
      modelRef.current.position.set(0, 0, -2); // Position it in front of the camera
      scene.add(modelRef.current);
    });

    // Set up WebXR controllers
    const controller1 = renderer.xr.getController(0);
    const controller2 = renderer.xr.getController(1);
    scene.add(controller1, controller2);

    const controllerModelFactory = new XRControllerModelFactory();
    const controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
    scene.add(controllerGrip1);

    const controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
    scene.add(controllerGrip2);

    // Animation loop
    const animate = () => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera); // No manual model rotation; rely on AR/VR device rotation
      });
    };

    animate();

    // Clean up when component unmounts
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        document.body.removeChild(rendererRef.current.domElement);
      }
    };
  }, [modelSrc]);

  // Handle window resize to adjust aspect ratio
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null; // WebXR content is rendered via Three.js; no need to return JSX
};

export default WebXRScene;
