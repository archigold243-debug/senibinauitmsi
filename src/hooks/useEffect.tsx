useEffect(() => {
  if (!containerRef.current) return;

  // Reset loading state when model source changes
  setIsLoading(true);
  loadingRef.current = true;
  setError(null);

  // Clean up previous scene and setup new if necessary
  if (!sceneRef.current) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    sceneRef.current = scene;
  }

  if (!cameraRef.current && containerRef.current) {
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
  }

  if (!rendererRef.current && containerRef.current) {
    const renderer = setupRenderer(containerRef.current);
    rendererRef.current = renderer;
  }

  if (!controlsRef.current && cameraRef.current && rendererRef.current) {
    const controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.maxDistance = 100;
    
    if (onHotspotUpdate) {
      controls.addEventListener('change', onHotspotUpdate);
    }
    controlsRef.current = controls;
  }

  if (sceneRef.current && cameraRef.current && controlsRef.current && containerRef.current) {
    loadModel(modelSrc, sceneRef.current, cameraRef.current, controlsRef.current, containerRef.current, () => {
      setIsLoading(false);
      loadingRef.current = false;
      if (onModelLoaded) {
        onModelLoaded();
      }
    });
  }

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Handle mouse move and update mouse position
  const onMouseMove = (event: MouseEvent) => {
    if (!containerRef.current) return;

    // Normalize mouse coordinates (-1 to +1 range for raycasting)
    mouse.x = (event.clientX / containerRef.current.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / containerRef.current.clientHeight) * 2 + 1;
  };

  // Handle mouse click and raycast for object interaction
  const onMouseClick = () => {
    if (!modelRef.current || !cameraRef.current) return;

    // Update raycaster based on the camera and mouse position
    raycaster.setFromCamera(mouse, cameraRef.current);

    // Check for intersections with objects in the scene
    const intersects = raycaster.intersectObjects(modelRef.current.children, true);
    if (intersects.length > 0 && onObjectClick) {
      onObjectClick(intersects[0].object); // Invoke callback with the clicked object
    }
  };

  containerRef.current.addEventListener('mousemove', onMouseMove);
  containerRef.current.addEventListener('click', onMouseClick);

  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;

    cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);

    if (onHotspotUpdate) {
      onHotspotUpdate();
    }
  };

  window.addEventListener('resize', handleResize);

  const animate = () => {
    animationFrameRef.current = requestAnimationFrame(animate);
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    if (controlsRef.current) controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);

    if (onHotspotUpdate) {
      onHotspotUpdate();
    }
  };

  animate();

  // Cleanup function to remove event listeners and cancel animation
  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    containerRef.current?.removeEventListener('mousemove', onMouseMove);
    containerRef.current?.removeEventListener('click', onMouseClick);
    window.removeEventListener('resize', handleResize);

    if (controlsRef.current && onHotspotUpdate) {
      controlsRef.current.removeEventListener('change', onHotspotUpdate);
    }

    if (sceneRef.current && modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }
  };
}, [modelSrc]);
