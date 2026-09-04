/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GEOMETRY LAB - 3D LOGIN ILLUSTRATION (THREE.JS)
 * Features:
 * - 3D Geometry Explorer character opening a golden mathematical briefcase
 * - Glowing golden light ray and floating Pi (π) math runes emitting from the briefcase
 * - 3 floating iconic solids:
 *   * Cylinder (Coral #ED806F)
 *   * Cone (Terracotta #E07A5F)
 *   * Sphere (Turquoise #4ECDC4 / Sage #9FB596)
 * - Cosmic ambient gradient with floating geometric dust
 * - Interactive mouse/touch parallax tilt
 * - Strict WebGL memory and frame lifecycle management
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface LoginIllustration3DProps {
  className?: string;
}

export const LoginIllustration3D: React.FC<LoginIllustration3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 460;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Group holding entire scene
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xffffff, 1.4);
    mainSun.position.set(4, 8, 6);
    scene.add(mainSun);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Briefcase Golden Radiant Light
    const briefcaseLight = new THREE.PointLight(0xfbbf24, 2.8, 8);
    briefcaseLight.position.set(0, -0.4, 0.6);
    worldGroup.add(briefcaseLight);

    // Disposables tracking
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const trackGeo = <T extends THREE.BufferGeometry>(geo: T): T => {
      geometriesToDispose.push(geo);
      return geo;
    };
    const trackMat = <T extends THREE.Material>(mat: T): T => {
      materialsToDispose.push(mat);
      return mat;
    };

    // --- 1. EXPLORER BRIEFCASE (CẶP SỐ HÌNH HỌC) ---
    const briefcaseGroup = new THREE.Group();
    briefcaseGroup.position.set(0, -0.8, 0.2);
    worldGroup.add(briefcaseGroup);

    // Case bottom base (leather dark charcoal with gold corners)
    const baseGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.35, 1.1));
    const baseMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.2
    }));
    const briefcaseBase = new THREE.Mesh(baseGeo, baseMat);
    briefcaseGroup.add(briefcaseBase);

    // Briefcase open lid (hinged at back)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.17, -0.55); // hinge position
    briefcaseGroup.add(lidGroup);

    const lidGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.1, 1.1));
    const lidMesh = new THREE.Mesh(lidGeo, baseMat);
    lidMesh.position.set(0, 0, 0.55);
    lidGroup.add(lidMesh);
    lidGroup.rotation.x = -Math.PI * 0.38; // opened backwards

    // Gold brass latch & handle
    const goldMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25
    }));
    const handleGeo = trackGeo(new THREE.TorusGeometry(0.18, 0.03, 8, 24, Math.PI));
    const handleMesh = new THREE.Mesh(handleGeo, goldMat);
    handleMesh.position.set(0, 0, 0.58);
    handleMesh.rotation.x = Math.PI * 0.5;
    briefcaseGroup.add(handleMesh);

    // Golden Radiant Core inside briefcase
    const glowCoreGeo = trackGeo(new THREE.PlaneGeometry(1.4, 0.9));
    const glowCoreMat = trackMat(new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      side: THREE.DoubleSide
    }));
    const glowCore = new THREE.Mesh(glowCoreGeo, glowCoreMat);
    glowCore.rotation.x = -Math.PI / 2;
    glowCore.position.set(0, 0.18, 0);
    briefcaseGroup.add(glowCore);

    // --- 2. 3D MATHEMATICAL EXPLORER CHARACTER (FIGURE) ---
    const explorerGroup = new THREE.Group();
    explorerGroup.position.set(0, -0.4, -0.7);
    worldGroup.add(explorerGroup);

    // Explorer Torso (warm amber safari coat)
    const torsoGeo = trackGeo(new THREE.CylinderGeometry(0.42, 0.48, 0.85, 16));
    const torsoMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.6
    }));
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.y = 0.45;
    explorerGroup.add(torso);

    // Collar & Scarf (teal)
    const scarfGeo = trackGeo(new THREE.TorusGeometry(0.36, 0.08, 8, 20));
    const scarfMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      roughness: 0.5
    }));
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.position.set(0, 0.88, 0);
    scarf.rotation.x = Math.PI / 2;
    explorerGroup.add(scarf);

    // Head (friendly stylized rounded head)
    const headGeo = trackGeo(new THREE.SphereGeometry(0.38, 24, 24));
    const headMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.5
    }));
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.25, 0);
    explorerGroup.add(head);

    // Explorer Hat (brim + cap)
    const hatBrimGeo = trackGeo(new THREE.CylinderGeometry(0.58, 0.58, 0.04, 24));
    const hatMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.7
    }));
    const hatBrim = new THREE.Mesh(hatBrimGeo, hatMat);
    hatBrim.position.set(0, 1.48, 0);
    explorerGroup.add(hatBrim);

    const hatCrownGeo = trackGeo(new THREE.CylinderGeometry(0.34, 0.38, 0.32, 20));
    const hatCrown = new THREE.Mesh(hatCrownGeo, hatMat);
    hatCrown.position.set(0, 1.64, 0);
    explorerGroup.add(hatCrown);

    // Stylized glasses / explorer goggles
    const gogglesGeo = trackGeo(new THREE.TorusGeometry(0.12, 0.025, 8, 16));
    const glassMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.5
    }));
    const goggleLeft = new THREE.Mesh(gogglesGeo, glassMat);
    goggleLeft.position.set(-0.16, 1.28, 0.35);
    const goggleRight = new THREE.Mesh(gogglesGeo, glassMat);
    goggleRight.position.set(0.16, 1.28, 0.35);
    explorerGroup.add(goggleLeft, goggleRight);

    // Arms reaching towards briefcase
    const armGeo = trackGeo(new THREE.CylinderGeometry(0.1, 0.09, 0.65, 12));
    const leftArm = new THREE.Mesh(armGeo, torsoMat);
    leftArm.position.set(-0.5, 0.45, 0.25);
    leftArm.rotation.set(Math.PI * 0.3, 0, Math.PI * 0.2);
    const rightArm = new THREE.Mesh(armGeo, torsoMat);
    rightArm.position.set(0.5, 0.45, 0.25);
    rightArm.rotation.set(Math.PI * 0.3, 0, -Math.PI * 0.2);
    explorerGroup.add(leftArm, rightArm);

    // --- 3. FLOATING GLOWING MATHEMATICAL PI (π) SYMBOL ---
    const createPiTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 256, 256);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 24;
        ctx.font = 'bold 160px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('π', 128, 138);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const piTexture = createPiTexture();
    const piGeo = trackGeo(new THREE.PlaneGeometry(0.9, 0.9));
    const piMat = trackMat(new THREE.MeshBasicMaterial({
      map: piTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide
    }));
    const piMesh = new THREE.Mesh(piGeo, piMat);
    piMesh.position.set(0, 0.35, 0.5);
    worldGroup.add(piMesh);

    // --- 4. THE 3 ICONIC FLOATING SOLIDS ---
    // A. CYLINDER (Ngọc Lục Bảo #059669)
    const cylinderGroup = new THREE.Group();
    cylinderGroup.position.set(-2.2, 1.1, 0.2);
    worldGroup.add(cylinderGroup);

    const cylinderGeo = trackGeo(new THREE.CylinderGeometry(0.55, 0.55, 1.2, 32));
    const cylinderMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.35,
      metalness: 0.15
    }));
    const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderGroup.add(cylinderMesh);

    // Top rim accent ring
    const rimGeo = trackGeo(new THREE.TorusGeometry(0.56, 0.03, 8, 32));
    const rimMat = trackMat(new THREE.MeshStandardMaterial({ color: 0xa7f3d0, roughness: 0.2 }));
    const topRim = new THREE.Mesh(rimGeo, rimMat);
    topRim.position.y = 0.6;
    topRim.rotation.x = Math.PI / 2;
    cylinderGroup.add(topRim);

    // B. CONE (Xanh Lá Mạ #16A34A)
    const coneGroup = new THREE.Group();
    coneGroup.position.set(1.9, 1.3, -0.3);
    worldGroup.add(coneGroup);

    const coneGeo = trackGeo(new THREE.ConeGeometry(0.65, 1.3, 32));
    const coneMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.3,
      metalness: 0.2
    }));
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneGroup.add(coneMesh);

    // Base rim
    const coneBaseRim = new THREE.Mesh(rimGeo, rimMat);
    coneBaseRim.position.y = -0.65;
    coneBaseRim.rotation.x = Math.PI / 2;
    coneGroup.add(coneBaseRim);

    // C. SPHERE (Xanh Rêu Biển / Sage #0D9488)
    const sphereGroup = new THREE.Group();
    sphereGroup.position.set(2.0, -0.5, 0.8);
    worldGroup.add(sphereGroup);

    const sphereGeo = trackGeo(new THREE.SphereGeometry(0.6, 32, 32));
    const sphereMat = trackMat(new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      roughness: 0.25,
      metalness: 0.3
    }));
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereGroup.add(sphereMesh);

    // Orbit ring around sphere
    const orbitGeo = trackGeo(new THREE.TorusGeometry(0.85, 0.02, 6, 40));
    const orbitMat = trackMat(new THREE.MeshBasicMaterial({ color: 0xa7f3d0, transparent: true, opacity: 0.7 }));
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI * 0.35;
    sphereGroup.add(orbitRing);

    // --- 5. FLOATING GOLDEN MATH RUNES & DUST PARTICLES ---
    const particleCount = 28;
    const particleGeo = trackGeo(new THREE.BufferGeometry());
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = Math.random() * 4 - 1.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      particleSpeeds[i] = 0.005 + Math.random() * 0.01;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = trackMat(new THREE.PointsMaterial({
      color: 0xfde047,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    }));
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // --- MOUSE PARALLAX TRACKING ---
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = nx * 0.25;
      targetRotX = -ny * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- ANIMATION LOOP ---
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera/world tilt
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;
      worldGroup.rotation.x = currentRotX;
      worldGroup.rotation.y = currentRotY;

      // 1. Briefcase light pulse & Pi float
      const pulse = Math.sin(elapsed * 2.5) * 0.5 + 2.5;
      briefcaseLight.intensity = pulse;

      piMesh.position.y = 0.35 + Math.sin(elapsed * 1.8) * 0.12;
      piMesh.rotation.y = Math.sin(elapsed * 1.2) * 0.2;

      // 2. Cylinder floating & spinning
      cylinderGroup.position.y = 1.1 + Math.sin(elapsed * 1.4) * 0.15;
      cylinderMesh.rotation.y = elapsed * 0.6;
      cylinderMesh.rotation.z = Math.sin(elapsed * 0.8) * 0.1;

      // 3. Cone floating & tilting
      coneGroup.position.y = 1.3 + Math.cos(elapsed * 1.6) * 0.14;
      coneMesh.rotation.y = -elapsed * 0.8;
      coneMesh.rotation.x = Math.PI * 0.1 + Math.sin(elapsed * 0.9) * 0.12;

      // 4. Sphere floating & orbit rotation
      sphereGroup.position.y = -0.5 + Math.sin(elapsed * 1.5 + 1.0) * 0.12;
      sphereMesh.rotation.y = elapsed * 0.5;
      orbitRing.rotation.z = elapsed * 0.4;

      // 5. Explorer gentle breathing
      explorerGroup.position.y = -0.4 + Math.sin(elapsed * 2.0) * 0.02;

      // 6. Upward floating particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += particleSpeeds[i];
        if (y > 3.0) {
          y = -1.2;
        }
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE OBSERVER ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });

    resizeObserver.observe(container);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      piTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      id="login-illustration-3d-wrapper"
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 shadow-xl border border-indigo-900/40 ${className}`}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Decorative Title Badges inside 3D View */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md border border-indigo-500/30 text-[11px] font-bold text-amber-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Phòng Thí Nghiệm Hình Học 3D</span>
        </div>
        <p className="text-[10px] text-slate-300 font-medium pl-1 drop-shadow">
          Khám phá Trụ • Nón • Cầu qua không gian WebGL
        </p>
      </div>

      {/* Solid Indicator Badges at bottom */}
      <div className="absolute bottom-4 inset-x-4 z-10 pointer-events-none flex items-center justify-center gap-2 text-[10px] font-bold">
        <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 backdrop-blur-sm">
          Hình Trụ (San hô)
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-300 backdrop-blur-sm">
          Hình Nón (Đất nung)
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-300 backdrop-blur-sm">
          Hình Cầu (Xanh ngọc)
        </span>
      </div>
    </div>
  );
};
