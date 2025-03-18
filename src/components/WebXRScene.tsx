import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory';

interface WebXRSceneProps {
  modelSrc: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

const WebXRScene: React.FC<WebXRSceneProps> = ({ modelSrc, containerRef }) => {
  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    // Attach renderer to the same container
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Add lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 1, 0);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 6, 0);
    scene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(modelSrc, (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.2, 0.2, 0.2);
      model.position.set(0, 0, -2);
      scene.add(model);
    });

    // XR Controllers setup
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

    // Animate scene
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up when component unmounts
    return () => {
      renderer.setAnimationLoop(null);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [modelSrc, containerRef]);

  return null;
};

export default WebXRScene;

