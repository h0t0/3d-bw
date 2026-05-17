'use client';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RINGS = [
  { radius: 1.6, tube: 0.014, rotX: 0.3,  rotZ: 0,   speed:  0.40, color: '#00d4ff' },
  { radius: 2.5, tube: 0.011, rotX: 1.05, rotZ: 0.5,  speed: -0.24, color: '#0066cc' },
  { radius: 3.5, tube: 0.008, rotX: 0.7,  rotZ: 1.2,  speed:  0.14, color: '#003a80' },
];

function Ring({ radius, tube, rotX, rotZ, speed, color }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.28;
  });
  return (
    <mesh ref={ref} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={0.6}
        metalness={0.4} roughness={0.3} transparent opacity={0.75}
      />
    </mesh>
  );
}

function Scene({ mouseX, mouseY }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * 0.18,
      0.04
    );
  });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 5]} color="#00d4ff" intensity={2.2} />
      <pointLight position={[3, -2, -3]} color="#0044aa" intensity={1} />
      {RINGS.map((r, i) => <Ring key={i} {...r} />)}
    </group>
  );
}

export default function FloatingRings() {
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
        camera={{ position: [0, 0, 7], fov: 44 }}
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
