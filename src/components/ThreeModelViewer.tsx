import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ThreeModelViewerProps {
  modelType: 'inverter' | 'drone' | 'chip' | 'grid';
  title?: string;
}

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = ({ modelType, title }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(10);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffb703, 1.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Model Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Build specific 3D model based on modelType
    if (modelType === 'inverter') {
      // 3D Solar Inverter Unit
      const bodyGeo = new THREE.BoxGeometry(6, 4, 2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      modelGroup.add(body);

      // Aluminum Heatsink Fins on back
      for (let x = -2.5; x <= 2.5; x += 0.4) {
        const finGeo = new THREE.BoxGeometry(0.15, 3.8, 1.2);
        const finMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.95 });
        const fin = new THREE.Mesh(finGeo, finMat);
        fin.position.set(x, 0, -1.5);
        modelGroup.add(fin);
      }

      // Capacitors
      for (let c = -1.8; c <= 1.8; c += 1.8) {
        const capGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.2, 16);
        const capMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5 });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.set(c, 0.8, 1.1);
        modelGroup.add(cap);
      }

      // Copper Toroidal Inductor
      const torGeo = new THREE.TorusGeometry(0.9, 0.3, 12, 24);
      const torMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9 });
      const tor = new THREE.Mesh(torGeo, torMat);
      tor.rotation.x = Math.PI / 2;
      tor.position.set(0, -0.8, 1.1);
      modelGroup.add(tor);

      // Display Screen
      const screenGeo = new THREE.PlaneGeometry(2.2, 1.2);
      const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 0.8, 1.01);
      modelGroup.add(screen);
    } else if (modelType === 'drone') {
      // 3D Drone Flight Controller PCB
      const pcbGeo = new THREE.BoxGeometry(5, 0.2, 5);
      const pcbMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, metalness: 0.3, roughness: 0.4 });
      const pcb = new THREE.Mesh(pcbGeo, pcbMat);
      modelGroup.add(pcb);

      // MCU Chip
      const mcuGeo = new THREE.BoxGeometry(1.8, 0.25, 1.8);
      const mcuMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
      const mcu = new THREE.Mesh(mcuGeo, mcuMat);
      mcu.position.set(0, 0.2, 0);
      modelGroup.add(mcu);

      // IMU Sensor
      const imuGeo = new THREE.BoxGeometry(0.8, 0.2, 0.8);
      const imuMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const imu = new THREE.Mesh(imuGeo, imuMat);
      imu.position.set(1.5, 0.2, 1.5);
      modelGroup.add(imu);

      // Corner Mounting Holes & Pins
      const corners = [[-2, -2], [2, -2], [-2, 2], [2, 2]];
      corners.forEach(([cx, cz]) => {
        const pinGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12);
        const pinMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.9 });
        const pin = new THREE.Mesh(pinGeo, pinMat);
        pin.position.set(cx, 0.3, cz);
        modelGroup.add(pin);
      });
    } else if (modelType === 'chip') {
      // 3D Silicon Processor Chip Die
      const chipGeo = new THREE.BoxGeometry(4.5, 0.3, 4.5);
      const chipMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.1 });
      const chip = new THREE.Mesh(chipGeo, chipMat);
      modelGroup.add(chip);

      // Silicon Die Center
      const dieGeo = new THREE.BoxGeometry(2.2, 0.35, 2.2);
      const dieMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 0.9 });
      const die = new THREE.Mesh(dieGeo, dieMat);
      die.position.set(0, 0.1, 0);
      modelGroup.add(die);

      // Gold Bond Wires Array
      const wireGroup = new THREE.Group();
      for (let i = -1.8; i <= 1.8; i += 0.4) {
        const wireGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
        const wireMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 1 });

        const w1 = new THREE.Mesh(wireGeo, wireMat);
        w1.position.set(i, 0.25, 1.5);
        w1.rotation.x = Math.PI / 4;
        wireGroup.add(w1);

        const w2 = new THREE.Mesh(wireGeo, wireMat);
        w2.position.set(i, 0.25, -1.5);
        w2.rotation.x = -Math.PI / 4;
        wireGroup.add(w2);
      }
      modelGroup.add(wireGroup);
    } else {
      // 3D Grid Power Tower
      const pcbGeo = new THREE.CylinderGeometry(0.2, 1.2, 7, 6);
      const pcbMat = new THREE.MeshStandardMaterial({ color: 0x475569, wireframe: true });
      const tower = new THREE.Mesh(pcbGeo, pcbMat);
      modelGroup.add(tower);
    }

    // Orbit Controls manual drag
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      modelGroupRef.current.rotation.y += deltaX * 0.01;
      modelGroupRef.current.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (autoRotate && modelGroupRef.current && !isDragging) {
        modelGroupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 350;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, [modelType]);

  // Handle wireframe toggle
  useEffect(() => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => ((m as any).wireframe = wireframe));
        } else if (mesh.material) {
          (mesh.material as any).wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  // Handle zoom changes
  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = zoomLevel;
  }, [zoomLevel]);

  const resetCamera = () => {
    if (!modelGroupRef.current || !cameraRef.current) return;
    modelGroupRef.current.rotation.set(0, 0, 0);
    cameraRef.current.position.set(0, 5, 12);
    setZoomLevel(12);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md p-4 shadow-2xl">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-cyan-400 animate-spin-slow" />
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
            3D Interactive Model Viewer — {title || modelType.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
              autoRotate ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Auto Rotate"
          >
            Auto-Rotate
          </button>
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-1.5 rounded-lg border transition-all ${
              wireframe ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(6, z - 2))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(22, z + 2))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetCamera}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-xs"
            title="Reset View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div ref={mountRef} className="w-full h-80 cursor-grab active:cursor-grabbing rounded-xl bg-slate-950/60 relative flex items-center justify-center">
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-400/70 bg-slate-900/80 px-2 py-1 rounded border border-cyan-500/20 pointer-events-none">
          Drag mouse to rotate 360° | Scroll to zoom
        </div>
      </div>
    </div>
  );
};
