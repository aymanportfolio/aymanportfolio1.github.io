import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeLogoProps {
  size?: number;
  className?: string;
}

export const ThreeLogo: React.FC<ThreeLogoProps> = ({ size = 42, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Letter "A" Shape
    const shape = new THREE.Shape();
    // Outer boundary for A
    shape.moveTo(-0.7, -0.9);
    shape.lineTo(-0.25, 0.9);
    shape.lineTo(0.25, 0.9);
    shape.lineTo(0.7, -0.9);
    shape.lineTo(0.38, -0.9);
    shape.lineTo(0.22, -0.25);
    shape.lineTo(-0.22, -0.25);
    shape.lineTo(-0.38, -0.9);
    shape.closePath();

    // Inner triangle hole for A
    const hole = new THREE.Path();
    hole.moveTo(-0.13, 0.12);
    hole.lineTo(0, 0.65);
    hole.lineTo(0.13, 0.12);
    hole.closePath();
    shape.holes.push(hole);

    const extrudeSettings = {
      steps: 1,
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Futuristic Metallic Neon Pink Gradient Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xff2a85,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x4a0028,
      emissiveIntensity: 0.4,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe Overlay for Neon Matrix Cyber Aesthetic
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      linewidth: 1,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeo, wireframeMat);
    scene.add(wireframeMesh);

    // Lighting setup for gradient shine
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xff2a85, 4, 12);
    pinkLight.position.set(2, 2, 3);
    scene.add(pinkLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4, 12);
    cyanLight.position.set(-2, -2, 2);
    scene.add(cyanLight);

    let frameId: number;
    let angle = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      angle += 0.015;
      mesh.rotation.y = Math.sin(angle) * 0.45;
      mesh.rotation.x = Math.cos(angle * 0.7) * 0.15;

      wireframeMesh.rotation.y = mesh.rotation.y;
      wireframeMesh.rotation.x = mesh.rotation.x;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={`inline-block flex-shrink-0 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
    />
  );
};
