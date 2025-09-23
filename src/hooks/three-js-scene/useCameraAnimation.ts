
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Animates the camera from an architectural front view to a target.
 * - Starts at (0, 15, -45) looking at (0, 0, 0)
 * - Animates both camera position and look target to room
 * - Ends so the camera is viewing *from the front* (model's negative Z direction)
 */
export function focusCameraOnPosition(
  camera: THREE.PerspectiveCamera | null,
  controls: OrbitControls | null,
  target: [number, number, number],
  desiredDistance: number = 38,
  yOffset: number = 20,
  durationMs: number = 850,
  onComplete?: () => void
) {
  if (!camera || !controls) return;

  // --- Animation starting point (architectural view from the actual front, which is negative Z) ---
  const overviewStartPos = new THREE.Vector3(0, 15, -45); // -45 Z = actual front
  const overviewStartTarget = new THREE.Vector3(0, 0, 0);

  // --- Animation end: room target and camera relative to it ---
  const lookTarget = new THREE.Vector3(...target);

  // Place camera at desiredDistance "in front" of the room (along local -Z),
  // then offset Y. This ensures you view the room as you would from in front of building.
  const direction = new THREE.Vector3(0, 0, -1); // Negative Z = model's front in this system
  const newCameraPos = lookTarget.clone().add(direction.multiplyScalar(desiredDistance));
  newCameraPos.y += yOffset;

  let start: number | null = null;

  function easeInOut(t: number) {
    // Simple smoothing (sinusoidal)
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function animate(now: number) {
    if (start === null) start = now;
    const elapsed = now - start;
    let t = Math.min(1, elapsed / durationMs);
    t = easeInOut(t);

    // Interpolate camera position and controls target
    camera.position.lerpVectors(overviewStartPos, newCameraPos, t);
    controls.target.lerpVectors(overviewStartTarget, lookTarget, t);

    controls.update();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      // Snap to final
      camera.position.copy(newCameraPos);
      controls.target.copy(lookTarget);
      controls.update();
      onComplete && onComplete();
    }
  }

  // Instantly place camera at architectural front view at start of animation.
  camera.position.copy(overviewStartPos);
  controls.target.copy(overviewStartTarget);
  controls.update();

  requestAnimationFrame(animate);
}

