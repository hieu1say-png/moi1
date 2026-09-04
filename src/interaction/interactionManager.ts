/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - 3D INTERACTION MANAGER
 * Raycasting and interactive object selection for Cylinder components.
 */

import * as THREE from 'three';
import { CylinderComponentKey, CYLINDER_NODE_NAMES } from '../geometry/cylinder/cylinderTypes';

export class InteractionManager {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: THREE.PerspectiveCamera;
  private rootGroup: THREE.Group;

  constructor(camera: THREE.PerspectiveCamera, rootGroup: THREE.Group) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.rootGroup = rootGroup;
  }

  public detectComponentAtScreen(
    clientX: number,
    clientY: number,
    containerRect: DOMRect
  ): CylinderComponentKey | null {
    this.mouse.x = ((clientX - containerRect.left) / containerRect.width) * 2 - 1;
    this.mouse.y = -((clientY - containerRect.top) / containerRect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.rootGroup.children, true);

    if (intersects.length === 0) return null;

    let targetObj: THREE.Object3D | null = intersects[0].object;

    // Traverse up to direct child of root
    while (targetObj && targetObj.parent !== this.rootGroup && targetObj.parent !== null) {
      targetObj = targetObj.parent;
    }

    if (!targetObj) return null;

    switch (targetObj.name) {
      case CYLINDER_NODE_NAMES.TOP_BASE:
        return 'top_base';
      case CYLINDER_NODE_NAMES.BOTTOM_BASE:
        return 'bottom_base';
      case CYLINDER_NODE_NAMES.SIDE_SURFACE:
        return 'side_surface';
      case CYLINDER_NODE_NAMES.AXIS_OO_PRIME:
        return 'axis';
      case CYLINDER_NODE_NAMES.RADIUS_R:
        return 'radius';
      case CYLINDER_NODE_NAMES.GENERATRIX_L:
        return 'generatrix';
      case CYLINDER_NODE_NAMES.HEIGHT_H:
        return 'height';
      case CYLINDER_NODE_NAMES.POINT_O:
        return 'point_o';
      case CYLINDER_NODE_NAMES.POINT_O_PRIME:
        return 'point_o_prime';
      default:
        return null;
    }
  }
}
