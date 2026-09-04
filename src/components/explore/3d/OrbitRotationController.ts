/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * UNIFIED ORBIT ROTATION CONTROLLER (GEOMETRY LAB)
 * Shared across Cylinder, Cone, and Sphere 3D Modules.
 *
 * Features:
 * - State Machine: IDLE | AUTO | USER_INTERACTION | PAUSED_BY_LESSON | 360_ANIMATION
 * - Camera Orbit around Target (using Three.js OrbitControls.autoRotate)
 * - Three Speed Presets: SLOW (0.8), NORMAL (1.6), FAST (2.8)
 * - Seamless user interaction: pause on drag, resume after delay (1500ms)
 * - Smooth 360° spin animation revolving camera around target
 * - Clean event listener management & leak-free disposal
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export type RotationState =
  | 'IDLE'
  | 'AUTO'
  | 'USER_INTERACTION'
  | 'PAUSED_BY_LESSON'
  | '360_ANIMATION';

export type RotationSpeedPreset = 'slow' | 'normal' | 'fast';

export const ROTATION_SPEEDS: Record<RotationSpeedPreset, number> = {
  slow: 0.8,
  normal: 1.6,
  fast: 2.8
};

export interface OrbitRotationControllerConfig {
  speedPreset?: RotationSpeedPreset;
  customSpeed?: number;
  pauseOnInteraction?: boolean;
  resumeDelay?: number; // ms, default: 1500
  moduleName?: string;
  onStateChange?: (state: RotationState) => void;
}

export class OrbitRotationController {
  private controls: OrbitControls | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private moduleName: string = 'GEOMETRY_3D';

  // State Machine
  private state: RotationState = 'IDLE';
  private wasAutoRotatingBeforeInteraction: boolean = false;
  private wasAutoRotatingBeforeLessonPause: boolean = false;
  private wasAutoRotatingBefore360: boolean = false;

  // Config
  private speedPreset: RotationSpeedPreset = 'normal';
  private speed: number = ROTATION_SPEEDS.normal;
  private pauseOnInteraction: boolean = true;
  private resumeDelay: number = 1500;
  private onStateChangeCallback?: (state: RotationState) => void;

  // Timers & Anim references
  private resumeTimer: ReturnType<typeof setTimeout> | null = null;
  private spin360StartTime: number | null = null;
  private spin360StartAzimuth: number = 0;
  private spin360Duration: number = 1600;
  private spin360OnComplete?: () => void;

  // Bound listeners
  private boundOnStart = this.handleInteractionStart.bind(this);
  private boundOnEnd = this.handleInteractionEnd.bind(this);

  constructor(config?: OrbitRotationControllerConfig) {
    if (config?.speedPreset) {
      this.speedPreset = config.speedPreset;
      this.speed = ROTATION_SPEEDS[config.speedPreset];
    }
    if (config?.customSpeed !== undefined) {
      this.speed = config.customSpeed;
    }
    if (config?.pauseOnInteraction !== undefined) {
      this.pauseOnInteraction = config.pauseOnInteraction;
    }
    if (config?.resumeDelay !== undefined) {
      this.resumeDelay = config.resumeDelay;
    }
    if (config?.moduleName) {
      this.moduleName = config.moduleName;
    }
    if (config?.onStateChange) {
      this.onStateChangeCallback = config.onStateChange;
    }
  }

  /**
   * Attach Three.js OrbitControls and PerspectiveCamera
   */
  public attach(controls: OrbitControls, camera: THREE.PerspectiveCamera): void {
    // Detach any previous instance first
    this.detach();

    this.controls = controls;
    this.camera = camera;

    // Standard OrbitControls configuration
    this.controls.enableDamping = true;
    this.controls.autoRotateSpeed = this.speed;
    this.controls.autoRotate = this.state === 'AUTO';

    // Register interaction event listeners
    if (this.pauseOnInteraction) {
      this.controls.addEventListener('start', this.boundOnStart);
      this.controls.addEventListener('end', this.boundOnEnd);
    }
  }

  /**
   * Detach and clean up all listeners
   */
  public detach(): void {
    this.clearResumeTimer();
    this.spin360StartTime = null;

    if (this.controls) {
      this.controls.removeEventListener('start', this.boundOnStart);
      this.controls.removeEventListener('end', this.boundOnEnd);
      this.controls.autoRotate = false;
    }

    this.controls = null;
    this.camera = null;
  }

  /**
   * Set Auto Rotate State (from UI Button [TỰ XOAY] / [DỪNG XOAY])
   */
  public setAutoRotate(enabled: boolean): void {
    this.clearResumeTimer();

    if (enabled) {
      this.setState('AUTO');
      if (this.controls) {
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = this.speed;
      }
    } else {
      this.setState('IDLE');
      this.wasAutoRotatingBeforeInteraction = false;
      this.wasAutoRotatingBeforeLessonPause = false;
      this.wasAutoRotatingBefore360 = false;
      if (this.controls) {
        this.controls.autoRotate = false;
      }
    }
  }

  public isAutoRotating(): boolean {
    return this.state === 'AUTO' || this.wasAutoRotatingBeforeInteraction || this.wasAutoRotatingBeforeLessonPause;
  }

  public getState(): RotationState {
    return this.state;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public getSpeedPreset(): RotationSpeedPreset {
    return this.speedPreset;
  }

  /**
   * Change speed preset
   */
  public setSpeedPreset(preset: RotationSpeedPreset): void {
    this.speedPreset = preset;
    this.speed = ROTATION_SPEEDS[preset];
    if (this.controls) {
      this.controls.autoRotateSpeed = this.speed;
    }
  }

  public setSpeed(customSpeed: number): void {
    this.speed = customSpeed;
    if (this.controls) {
      this.controls.autoRotateSpeed = this.speed;
    }
  }

  /**
   * Trigger single 360° rotation animation
   */
  public trigger360Spin(durationMs: number = 1600, onComplete?: () => void): void {
    if (!this.controls || !this.camera) return;

    this.clearResumeTimer();
    this.wasAutoRotatingBefore360 = this.state === 'AUTO' || this.wasAutoRotatingBeforeInteraction;

    // Temporarily disable OrbitControls autoRotate during the scripted 360 spin
    this.controls.autoRotate = false;
    this.setState('360_ANIMATION');

    this.spin360StartTime = performance.now();
    this.spin360StartAzimuth = this.controls.getAzimuthalAngle();
    this.spin360Duration = durationMs;
    this.spin360OnComplete = onComplete;
  }

  /**
   * Pause rotation when lesson animation runs (e.g. unfold, fold, liquid pour)
   */
  public setPausedByLesson(paused: boolean): void {
    if (paused) {
      if (this.state === 'AUTO' || this.state === 'USER_INTERACTION') {
        this.wasAutoRotatingBeforeLessonPause = true;
      }
      this.setState('PAUSED_BY_LESSON');
      if (this.controls) {
        this.controls.autoRotate = false;
      }
    } else {
      if (this.state === 'PAUSED_BY_LESSON') {
        if (this.wasAutoRotatingBeforeLessonPause) {
          this.wasAutoRotatingBeforeLessonPause = false;
          this.setAutoRotate(true);
        } else {
          this.setState('IDLE');
        }
      }
    }
  }

  /**
   * Update per animation frame — MUST be called inside requestAnimationFrame
   */
  public update(now: number): void {
    if (!this.controls || !this.camera) return;

    // 1. Handle Scripted 360 Spin Animation
    if (this.state === '360_ANIMATION' && this.spin360StartTime !== null) {
      const elapsed = now - this.spin360StartTime;
      const progress = Math.min(1, elapsed / this.spin360Duration);

      // Ease in-out cubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentAzimuth = this.spin360StartAzimuth + ease * Math.PI * 2;

      // Rotate camera horizontally around target maintaining height and distance
      const target = this.controls.target;
      const offset = new THREE.Vector3().subVectors(this.camera.position, target);
      const horizontalRadius = Math.hypot(offset.x, offset.z);

      offset.x = horizontalRadius * Math.sin(currentAzimuth);
      offset.z = horizontalRadius * Math.cos(currentAzimuth);

      this.camera.position.copy(target).add(offset);
      this.camera.lookAt(target);

      if (progress >= 1) {
        this.spin360StartTime = null;
        const cb = this.spin360OnComplete;
        this.spin360OnComplete = undefined;

        if (this.wasAutoRotatingBefore360) {
          this.wasAutoRotatingBefore360 = false;
          this.setAutoRotate(true);
        } else {
          this.setState('IDLE');
        }

        if (cb) cb();
      }
    }

    // 2. Call OrbitControls update (handles damping & autoRotate)
    this.controls.update();
  }

  /**
   * OrbitControls 'start' event handler (user began dragging/zooming)
   */
  private handleInteractionStart(): void {
    this.clearResumeTimer();

    // If in 360 spin animation, cancel animation in favor of user interaction
    if (this.state === '360_ANIMATION') {
      this.spin360StartTime = null;
    }

    if (this.state === 'AUTO') {
      this.wasAutoRotatingBeforeInteraction = true;
    }

    this.setState('USER_INTERACTION');

    if (this.controls) {
      this.controls.autoRotate = false;
    }
  }

  /**
   * OrbitControls 'end' event handler (user released mouse/touch)
   */
  private handleInteractionEnd(): void {
    if (this.wasAutoRotatingBeforeInteraction) {
      this.clearResumeTimer();

      this.resumeTimer = setTimeout(() => {
        if (this.state === 'USER_INTERACTION') {
          this.wasAutoRotatingBeforeInteraction = false;
          this.setAutoRotate(true);
        }
      }, this.resumeDelay);
    } else {
      this.setState('IDLE');
    }
  }

  private clearResumeTimer(): void {
    if (this.resumeTimer) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  private setState(nextState: RotationState): void {
    if (this.state !== nextState) {
      this.state = nextState;
      if (this.onStateChangeCallback) {
        this.onStateChangeCallback(nextState);
      }
    }
  }
}
