
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface UseThreeJsSceneProps {
  modelSrc: string;
  containerRef: React.RefObject<HTMLDivElement>;
  onModelLoaded?: () => void;
  onHotspotUpdate?: () => void;
  onObjectClick?: (object: THREE.Object3D) => void;
}

export interface ThreeJsSceneRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  controls: OrbitControls | null;
  model: THREE.Group | null;
  animationFrame: number | null;
}
