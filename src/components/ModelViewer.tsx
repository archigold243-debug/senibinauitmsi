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

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.useLegacyLights = false;
  
  containerRef.current.appendChild(renderer.domElement);
  rendererRef.current = renderer;

  // Controls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxDistance = 100;
  
  controls.addEventListener('change', updateHotspotPositions); // Keep this for user interaction
  controlsRef.current = controls;

  // Load the model
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

      // Get all hotspots after model loads
      const hotspotElements = containerRef.current?.querySelectorAll('.hotspot') as NodeListOf<HTMLDivElement>;
      setHotspots(Array.from(hotspotElements || []));
      setTimeout(updateHotspotPositions, 100);
    },
    (xhr) => {
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

    // Ensure hotspots are updated with every frame
    updateHotspotPositions();

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

useEffect(() => {
  if (hotspots.length > 0 && !isLoading) {
    updateHotspotPositions();
  }
}, [hotspots, isLoading]);

