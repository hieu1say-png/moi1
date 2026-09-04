/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - CAMERA MANAGER (DEFAULT_CAMERA & INTERACTION_CAMERA)
 * Manages dual camera paradigm:
 * 1. DEFAULT_CAMERA: Immutable SGK standard viewpoint reference.
 * 2. INTERACTION_CAMERA: User orbit/zoom/pan with collision avoidance.
 * 3. Smooth animated return to SGK default camera.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SGK_DEFAULT_CAMERA_CONFIG } from './cameraConfig';

export class CameraManager {
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private defaultCameraState: {
    position: THREE.Vector3;
    target: THREE.Vector3;
    fov: number;
  };
  private isAnimating: boolean = false;
  private animFrameId: number | null = null;

  constructor(camera: THREE.PerspectiveCamera, controls: OrbitControls) {
    this.camera = camera;
    this.controls = controls;
    this.defaultCameraState = {
      position: new THREE.Vector3(12, 8, 14),
      target: new THREE.Vector3(0, 0, 0),
      fov: SGK_DEFAULT_CAMERA_CONFIG.fov
    };

    this.configureInteractionControls();
  }

  private configureInteractionControls(): void {
    const controls = this.controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };
    controls.maxPolarAngle = Math.PI - 0.05; // Prevent flipping under ground
    controls.minPolarAngle = 0.05;
  }

  /**
   * Recalculates and locks DEFAULT_CAMERA snapshot to fit the model perfectly in SGK proportion
   */
  public updateDefaultCameraSnapshot(
    modelRadius: number,
    modelHeight: number,
    aspect: number,
    immediateApply: boolean = false
  ): void {
    const modelSpan = Math.max(modelRadius * 2, modelHeight);
    const fovRad = (SGK_DEFAULT_CAMERA_CONFIG.fov * Math.PI) / 180;
    
    // Fit geometry to occupy ~70% of viewport
    const distForFov = (modelSpan / 2) / Math.tan(fovRad / 2);
    const distForAspect = (modelSpan / 2) / (Math.tan(fovRad / 2) * aspect);
    const requiredDistance = (Math.max(distForFov, distForAspect) / 0.72);

    const defaultPos = SGK_DEFAULT_CAMERA_CONFIG.relativeDirection
      .clone()
      .multiplyScalar(requiredDistance);

    this.defaultCameraState = {
      position: defaultPos,
      target: new THREE.Vector3(0, 0, 0),
      fov: SGK_DEFAULT_CAMERA_CONFIG.fov
    };

    // Update control limits to prevent camera from passing through the model
    this.controls.minDistance = Math.max(2.5, modelRadius * 1.4);
    this.controls.maxDistance = requiredDistance * SGK_DEFAULT_CAMERA_CONFIG.maxZoomDistanceFactor;

    if (immediateApply) {
      this.resetToDefaultView(false);
    }
  }

  /**
   * Animates or immediately sets the camera back to DEFAULT_CAMERA
   */
  public resetToDefaultView(smooth: boolean = true, onComplete?: () => void): void {
    if (this.isAnimating && this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.isAnimating = false;
    }

    const targetPos = this.defaultCameraState.position.clone();
    const targetCenter = this.defaultCameraState.target.clone();

    if (!smooth) {
      this.camera.position.copy(targetPos);
      this.controls.target.copy(targetCenter);
      this.camera.fov = this.defaultCameraState.fov;
      this.camera.updateProjectionMatrix();
      this.controls.update();
      if (onComplete) onComplete();
      return;
    }

    this.isAnimating = true;
    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();
    const startTime = performance.now();
    const duration = SGK_DEFAULT_CAMERA_CONFIG.animationDurationMs;

    const animateStep = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);

      this.camera.position.lerpVectors(startPos, targetPos, ease);
      this.controls.target.lerpVectors(startTarget, targetCenter, ease);
      this.controls.update();

      if (t < 1) {
        this.animFrameId = requestAnimationFrame(animateStep);
      } else {
        this.camera.position.copy(targetPos);
        this.controls.target.copy(targetCenter);
        this.controls.update();
        this.isAnimating = false;
        if (onComplete) onComplete();
      }
    };

    this.animFrameId = requestAnimationFrame(animateStep);
  }

  public update(): void {
    if (!this.isAnimating) {
      this.controls.update();
    }
  }

  public dispose(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.controls.dispose();
  }
}
