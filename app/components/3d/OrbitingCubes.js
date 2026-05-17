'use client';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* 6 boxes — varied radii, sizes, speeds — deterministic phases */
const ORBITS = [
  { radius: 1.2, speed:  0.55, size: 0.26, color: '#63bb8c', emissive: '#2d7a50', y:  0.0,  phase: 0 },
  { radius: 1.8, speed: -0.38, size: 0.22, color: '#00d4ff', emissive: '#0055aa', y:  0.35, phase: 2.09 },
  { radius: 2.5, speed:  0.27, size: 0.24, color: '#c9a96e', emissive: '#7a5a20', y: -0.25, phase: 4.19 },
  { radius: 3.0, speed: -0.20, size: 0.20, color: '#4dd9f5', emissive: '#005f77', y:  0.5,  phase: 1.05 },
  { radius: 3.6, speed:  0.16, size: 0.19, color: '#a8d8a0', emissive: '#2a5a2a', y: -0.4,  phase: 3.14 },
  { radius: 4.2, speed: -0.13, size: 0.17, color: '#e8c98a', emissive: '#7a5010', y:  0.2,  phase: 5.24 },
];

function OrbBox({ radius, speed, size, color, emissive, y, phase }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      y + Math.sin(clock.elapsedTime * 0.4 + phase) * 0.15,
      Math.sin(t) * radius
    );
    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.012;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.6} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

function Scene({ mouseX, mouseY }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    /* Slow auto-rotation on Y */
    groupRef.current.rotation.y += delta * 0.04;
    /* Mouse parallax on X — lerp like the hero */
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * 0.18,
      0.04
    );
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]} color="#00d4ff" intensity={1.8} />
      <pointLight position={[0, 3, -3]} color="#0044aa" intensity={0.8} />
      {ORBITS.map((o, i) => <OrbBox key={i} {...o} />)}
    </group>
  );
}

export default function OrbitingCubes() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef();

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}
