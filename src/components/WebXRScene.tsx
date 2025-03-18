import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const WebXRScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // black background
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3); // Position camera at human eye height
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Enable WebXR (VR mode)
    rendererRef.current = renderer;

    // Append VRButton for entering VR mode
    document.body.appendChild(VRButton.createButton(renderer));

    // Add some lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    // Add some 3D objects to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Append the renderer to the container
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = renderer.setAnimationLoop(() => {
        if (sceneRef.current && cameraRef.current && rendererRef.current) {
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;

          renderer.render(sceneRef.current, cameraRef.current);
        }
      });
    };

    // Start animation loop
    animate();

    // Handle cleanup
    return () => {
      if (animationFrameRef.current) {
        renderer.setAnimationLoop(null); // Stop the animation loop
      }

      if (rendererRef.current) {
        containerRef.current?.removeChild(rendererRef.current.domElement); // Remove the WebGL canvas
      }

      // Cleanup VRButton
      const vrButton = document.querySelector('.vr-button');
      vrButton?.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default WebXRScene;
