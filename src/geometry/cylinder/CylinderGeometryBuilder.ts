/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GATE 1.1 - CYLINDER THREE.JS GEOMETRY HIERARCHY BUILDER
 * Constructs and manages the strictly specified Object/Group tree:
 *
 * CylinderRoot
 * ├── TopBase
 * ├── BottomBase
 * ├── SideSurface
 * ├── AxisOOPrime
 * ├── RadiusR
 * ├── GeneratrixL
 * ├── HeightH
 * ├── PointO
 * └── PointOPrime
 */

import * as THREE from 'three';
import {
  CYLINDER_NODE_NAMES,
  CylinderGeometryConfig,
  CylinderVisibilityState,
  CylinderComponentKey
} from './cylinderTypes';
import { createSGKCylinderMaterials, CylinderMaterialSet } from '../../materials/cylinderMaterials';

export class CylinderGeometryBuilder {
  private rootGroup: THREE.Group;
  private materials: CylinderMaterialSet;
  private config: CylinderGeometryConfig;

  // Cached individual node references
  private topBaseGroup: THREE.Group;
  private bottomBaseGroup: THREE.Group;
  private sideSurfaceGroup: THREE.Group;
  private axisOOPrimeGroup: THREE.Group;
  private radiusRGroup: THREE.Group;
  private generatrixLGroup: THREE.Group;
  private heightHGroup: THREE.Group;
  private pointOGroup: THREE.Group;
  private pointOPrimeGroup: THREE.Group;

  constructor(config: CylinderGeometryConfig) {
    this.config = {
      radius: config.radius,
      height: config.height,
      radialSegments: config.radialSegments || 64,
      heightSegments: config.heightSegments || 32
    };

    this.materials = createSGKCylinderMaterials();
    this.rootGroup = new THREE.Group();
    this.rootGroup.name = CYLINDER_NODE_NAMES.ROOT;

    this.topBaseGroup = new THREE.Group();
    this.topBaseGroup.name = CYLINDER_NODE_NAMES.TOP_BASE;

    this.bottomBaseGroup = new THREE.Group();
    this.bottomBaseGroup.name = CYLINDER_NODE_NAMES.BOTTOM_BASE;

    this.sideSurfaceGroup = new THREE.Group();
    this.sideSurfaceGroup.name = CYLINDER_NODE_NAMES.SIDE_SURFACE;

    this.axisOOPrimeGroup = new THREE.Group();
    this.axisOOPrimeGroup.name = CYLINDER_NODE_NAMES.AXIS_OO_PRIME;

    this.radiusRGroup = new THREE.Group();
    this.radiusRGroup.name = CYLINDER_NODE_NAMES.RADIUS_R;

    this.generatrixLGroup = new THREE.Group();
    this.generatrixLGroup.name = CYLINDER_NODE_NAMES.GENERATRIX_L;

    this.heightHGroup = new THREE.Group();
    this.heightHGroup.name = CYLINDER_NODE_NAMES.HEIGHT_H;

    this.pointOGroup = new THREE.Group();
    this.pointOGroup.name = CYLINDER_NODE_NAMES.POINT_O;

    this.pointOPrimeGroup = new THREE.Group();
    this.pointOPrimeGroup.name = CYLINDER_NODE_NAMES.POINT_O_PRIME;

    // Attach all 9 designated child groups to CylinderRoot in exact hierarchy
    this.rootGroup.add(this.topBaseGroup);
    this.rootGroup.add(this.bottomBaseGroup);
    this.rootGroup.add(this.sideSurfaceGroup);
    this.rootGroup.add(this.axisOOPrimeGroup);
    this.rootGroup.add(this.radiusRGroup);
    this.rootGroup.add(this.generatrixLGroup);
    this.rootGroup.add(this.heightHGroup);
    this.rootGroup.add(this.pointOGroup);
    this.rootGroup.add(this.pointOPrimeGroup);

    this.buildGeometry();
  }

  public getRoot(): THREE.Group {
    return this.rootGroup;
  }

  public updateDimensions(radius: number, height: number): void {
    this.config.radius = radius;
    this.config.height = height;
    this.buildGeometry();
  }

  /**
   * Reconstructs all sub-nodes based on current R and h
   */
  public buildGeometry(): void {
    const { radius: R, height: h, radialSegments = 64 } = this.config;
    const halfH = h / 2;

    // 1. TOP BASE (Mặt đáy trên tại y = +halfH)
    this.clearGroup(this.topBaseGroup);
    const topCircleGeo = new THREE.CircleGeometry(R, radialSegments);
    const topCircleMesh = new THREE.Mesh(topCircleGeo, this.materials.topBase);
    topCircleMesh.rotation.x = -Math.PI / 2;
    topCircleMesh.position.y = halfH;
    this.topBaseGroup.add(topCircleMesh);

    // Top Base Rim Line
    const topRimPts: THREE.Vector3[] = [];
    for (let i = 0; i <= radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      topRimPts.push(new THREE.Vector3(R * Math.cos(theta), halfH, R * Math.sin(theta)));
    }
    const topRimGeo = new THREE.BufferGeometry().setFromPoints(topRimPts);
    const topRimLine = new THREE.Line(topRimGeo, this.materials.baseRimLine);
    this.topBaseGroup.add(topRimLine);

    // 2. BOTTOM BASE (Mặt đáy dưới tại y = -halfH)
    this.clearGroup(this.bottomBaseGroup);
    const bottomCircleGeo = new THREE.CircleGeometry(R, radialSegments);
    const bottomCircleMesh = new THREE.Mesh(bottomCircleGeo, this.materials.bottomBase);
    bottomCircleMesh.rotation.x = Math.PI / 2;
    bottomCircleMesh.position.y = -halfH;
    this.bottomBaseGroup.add(bottomCircleMesh);

    // Bottom Base Rim Line
    const bottomRimPts: THREE.Vector3[] = [];
    for (let i = 0; i <= radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      bottomRimPts.push(new THREE.Vector3(R * Math.cos(theta), -halfH, R * Math.sin(theta)));
    }
    const bottomRimGeo = new THREE.BufferGeometry().setFromPoints(bottomRimPts);
    const bottomRimLine = new THREE.Line(bottomRimGeo, this.materials.baseRimLine);
    this.bottomBaseGroup.add(bottomRimLine);

    // 3. SIDE SURFACE (Mặt xung quanh hình trụ)
    this.clearGroup(this.sideSurfaceGroup);
    const sideGeo = new THREE.CylinderGeometry(R, R, h, radialSegments, 1, true);
    const sideMesh = new THREE.Mesh(sideGeo, this.materials.sideSurface);
    sideMesh.castShadow = true;
    sideMesh.receiveShadow = true;
    this.sideSurfaceGroup.add(sideMesh);

    // 4. AXIS OO' (Trục hình trụ nối tâm O(0, -halfH, 0) và O'(0, +halfH, 0))
    this.clearGroup(this.axisOOPrimeGroup);
    const axisPts = [
      new THREE.Vector3(0, -halfH, 0),
      new THREE.Vector3(0, halfH, 0)
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
    const axisLine = new THREE.Line(axisGeo, this.materials.axisOOPrime);
    axisLine.computeLineDistances();
    this.axisOOPrimeGroup.add(axisLine);

    // Thin core tube for clear visibility
    const axisCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, -halfH, 0),
      new THREE.Vector3(0, halfH, 0)
    );
    const axisTubeGeo = new THREE.TubeGeometry(axisCurve, 12, 0.05, 8, false);
    const axisTubeMesh = new THREE.Mesh(axisTubeGeo, this.materials.axisOOPrimeTube);
    this.axisOOPrimeGroup.add(axisTubeMesh);

    // 5. RADIUS R (Bán kính đáy OA tại đáy dưới hoặc O'A' tại đáy trên)
    this.clearGroup(this.radiusRGroup);
    const radiusPts = [
      new THREE.Vector3(0, -halfH, 0),
      new THREE.Vector3(R, -halfH, 0)
    ];
    const radiusGeo = new THREE.BufferGeometry().setFromPoints(radiusPts);
    const radiusLine = new THREE.Line(radiusGeo, this.materials.radiusRLine);
    this.radiusRGroup.add(radiusLine);

    const radiusCurve = new THREE.LineCurve3(
      new THREE.Vector3(0, -halfH, 0),
      new THREE.Vector3(R, -halfH, 0)
    );
    const radiusTubeGeo = new THREE.TubeGeometry(radiusCurve, 16, 0.06, 8, false);
    const radiusTubeMesh = new THREE.Mesh(radiusTubeGeo, this.materials.radiusRTube);
    this.radiusRGroup.add(radiusTubeMesh);

    // Point A on bottom rim
    const ptAGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const ptAMesh = new THREE.Mesh(ptAGeo, this.materials.radiusRTube);
    ptAMesh.position.set(R, -halfH, 0);
    this.radiusRGroup.add(ptAMesh);

    // 6. GENERATRIX l (Đường sinh AA' song song với trục OO', l = h)
    this.clearGroup(this.generatrixLGroup);
    const generatrixPts = [
      new THREE.Vector3(R, -halfH, 0),
      new THREE.Vector3(R, halfH, 0)
    ];
    const generatrixGeo = new THREE.BufferGeometry().setFromPoints(generatrixPts);
    const generatrixLine = new THREE.Line(generatrixGeo, this.materials.generatrixLLine);
    this.generatrixLGroup.add(generatrixLine);

    const generatrixCurve = new THREE.LineCurve3(
      new THREE.Vector3(R, -halfH, 0),
      new THREE.Vector3(R, halfH, 0)
    );
    const generatrixTubeGeo = new THREE.TubeGeometry(generatrixCurve, 20, 0.06, 8, false);
    const generatrixTubeMesh = new THREE.Mesh(generatrixTubeGeo, this.materials.generatrixLTube);
    this.generatrixLGroup.add(generatrixTubeMesh);

    // Point A' on top rim
    const ptAPrimeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const ptAPrimeMesh = new THREE.Mesh(ptAPrimeGeo, this.materials.generatrixLTube);
    ptAPrimeMesh.position.set(R, halfH, 0);
    this.generatrixLGroup.add(ptAPrimeMesh);

    // 7. HEIGHT h (Ký hiệu chiều cao h = OO')
    this.clearGroup(this.heightHGroup);
    // Dimension line shifted slightly on the left for clear reading
    const heightOffsetX = -R * 1.25;
    const heightPts = [
      new THREE.Vector3(heightOffsetX, -halfH, 0),
      new THREE.Vector3(heightOffsetX, halfH, 0)
    ];
    const heightGeo = new THREE.BufferGeometry().setFromPoints(heightPts);
    const heightLine = new THREE.Line(heightGeo, this.materials.heightHLine);
    heightLine.computeLineDistances();
    this.heightHGroup.add(heightLine);

    // Extension lines from bases to dimension line
    const extBottomPts = [
      new THREE.Vector3(-R, -halfH, 0),
      new THREE.Vector3(heightOffsetX - 0.2, -halfH, 0)
    ];
    const extTopPts = [
      new THREE.Vector3(-R, halfH, 0),
      new THREE.Vector3(heightOffsetX - 0.2, halfH, 0)
    ];
    const extBottomLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(extBottomPts),
      this.materials.heightHLine
    );
    extBottomLine.computeLineDistances();
    const extTopLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(extTopPts),
      this.materials.heightHLine
    );
    extTopLine.computeLineDistances();
    this.heightHGroup.add(extBottomLine);
    this.heightHGroup.add(extTopLine);

    // 8. POINT O (Tâm đáy dưới tại (0, -halfH, 0))
    this.clearGroup(this.pointOGroup);
    const ptOGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const ptOMesh = new THREE.Mesh(ptOGeo, this.materials.pointO);
    ptOMesh.position.set(0, -halfH, 0);
    this.pointOGroup.add(ptOMesh);

    // 9. POINT O' (Tâm đáy trên tại (0, +halfH, 0))
    this.clearGroup(this.pointOPrimeGroup);
    const ptOPrimeGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const ptOPrimeMesh = new THREE.Mesh(ptOPrimeGeo, this.materials.pointOPrime);
    ptOPrimeMesh.position.set(0, halfH, 0);
    this.pointOPrimeGroup.add(ptOPrimeMesh);
  }

  public setVisibility(visibility: CylinderVisibilityState): void {
    this.topBaseGroup.visible = visibility.topBase;
    this.bottomBaseGroup.visible = visibility.bottomBase;
    this.sideSurfaceGroup.visible = visibility.sideSurface;
    this.axisOOPrimeGroup.visible = visibility.axisOOPrime;
    this.radiusRGroup.visible = visibility.radiusR;
    this.generatrixLGroup.visible = visibility.generatrixL;
    this.heightHGroup.visible = visibility.heightH;
    this.pointOGroup.visible = visibility.pointO;
    this.pointOPrimeGroup.visible = visibility.pointOPrime;
  }

  public highlightComponent(componentKey: CylinderComponentKey): void {
    const isAll = componentKey === 'all';
    
    // Scale or enhance visibility for selected component
    this.topBaseGroup.scale.setScalar(componentKey === 'top_base' ? 1.02 : 1.0);
    this.bottomBaseGroup.scale.setScalar(componentKey === 'bottom_base' ? 1.02 : 1.0);
    this.sideSurfaceGroup.scale.setScalar(componentKey === 'side_surface' ? 1.02 : 1.0);
    this.axisOOPrimeGroup.scale.setScalar(componentKey === 'axis' ? 1.08 : 1.0);
    this.radiusRGroup.scale.setScalar(componentKey === 'radius' ? 1.08 : 1.0);
    this.generatrixLGroup.scale.setScalar(componentKey === 'generatrix' ? 1.08 : 1.0);
    this.heightHGroup.scale.setScalar(componentKey === 'height' ? 1.08 : 1.0);
    this.pointOGroup.scale.setScalar(componentKey === 'point_o' ? 1.25 : 1.0);
    this.pointOPrimeGroup.scale.setScalar(componentKey === 'point_o_prime' ? 1.25 : 1.0);
  }

  public getNodeWorldPositions(): {
    pointO: THREE.Vector3;
    pointOPrime: THREE.Vector3;
    radiusR: THREE.Vector3;
    generatrixL: THREE.Vector3;
    heightH: THREE.Vector3;
  } {
    const halfH = this.config.height / 2;
    const R = this.config.radius;

    return {
      pointO: new THREE.Vector3(0, -halfH, 0),
      pointOPrime: new THREE.Vector3(0, halfH, 0),
      radiusR: new THREE.Vector3(R / 2, -halfH - 0.35, 0),
      generatrixL: new THREE.Vector3(R + 0.45, 0, 0),
      heightH: new THREE.Vector3(-R * 1.25 - 0.45, 0, 0)
    };
  }

  private clearGroup(group: THREE.Group): void {
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      if ((child as any).geometry) {
        (child as any).geometry.dispose();
      }
    }
  }

  public dispose(): void {
    this.clearGroup(this.topBaseGroup);
    this.clearGroup(this.bottomBaseGroup);
    this.clearGroup(this.sideSurfaceGroup);
    this.clearGroup(this.axisOOPrimeGroup);
    this.clearGroup(this.radiusRGroup);
    this.clearGroup(this.generatrixLGroup);
    this.clearGroup(this.heightHGroup);
    this.clearGroup(this.pointOGroup);
    this.clearGroup(this.pointOPrimeGroup);

    Object.values(this.materials).forEach((mat) => {
      if (mat && typeof mat.dispose === 'function') {
        mat.dispose();
      }
    });
  }
}
