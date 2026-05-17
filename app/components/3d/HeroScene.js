'use client';
import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const NODE_POSITIONS = [
  [0, 0, 0],
  [-2.8, 1.2, -0.8], [2.8, 1.2, -0.8], [0, 2.8, 0.5],
  [-1.8, -2.2, 0.5], [2.2, -1.8, -0.5],
  [-4.2, 2.2, 0.5], [-3.2, 0, 1.8], [-2.2, 3.8, -0.5],
  [3.8, 2.5, 0], [4.2, 0, 1.2], [2.2, 3.2, 1],
  [-1, 4.2, -1], [1, 4.2, 0.5],
  [-3.2, -3.2, 0], [-0.5, -3.8, 1], [3.2, -2.8, 0.5], [4.2, -1, -1],
  [-5.5, 0.5, 0], [5.5, 1, -0.5], [0, 5.5, 0], [0, -5.2, 0.5],
  [-1.5, 1.5, 2.5],
];

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],
  [1,6],[1,7],[1,8],[2,9],[2,10],[2,11],[3,12],[3,13],
  [4,14],[4,15],[5,16],[5,17],
  [6,18],[9,19],[3,20],[4,21],[0,22],[1,22],[2,22],
];

const NODE_SIZES = NODE_POSITIONS.map((_, i) => i === 0 ? 0.22 : 0.065 + (i % 7) * 0.012);

function Node({ position, size, isHub, index }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.5 + index * 0.7) * 0.07;
    meshRef.current.scale.setScalar(s);
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={isHub ? '#00d4ff' : '#4dd9f5'}
        emissive={isHub ? '#00d4ff' : '#0066cc'}
        emissiveIntensity={isHub ? 1.8 : 0.8}
        metalness={0.2} roughness={0.3} transparent opacity={0.9}
      />
    </mesh>
  );
}

function EdgeLine({ start, end, opacity }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], []);
  return <Line points={points} color="#00d4ff" lineWidth={0.6} transparent opacity={opacity} />;
}

function Particles({ count = 280 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random()-0.5)*24;
      pos[i*3+1] = (Math.random()-0.5)*24;
      pos[i*3+2] = (Math.random()-0.5)*18;
    }
    return pos;
  }, [count]);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.008; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#00d4ff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function NodeNetwork({ mouseX, mouseY }) {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.15, 0.04);
  });
  return (
    <group ref={groupRef}>
      {NODE_POSITIONS.map((pos, i) => (
        <Node key={i} position={pos} size={NODE_SIZES[i]} isHub={i === 0} index={i} />
      ))}
      {EDGES.map(([from, to], i) => (
        <EdgeLine key={i} start={NODE_POSITIONS[from]} end={NODE_POSITIONS[to]} opacity={i < 5 ? 0.4 : 0.18} />
      ))}
    </group>
  );
}

export default function HeroScene() {
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
    <div ref={containerRef} onMouseMove={handleMouseMove} style={{ width:'100%', height:'100%', position:'absolute', inset:0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#010c1a', 14, 30]} />
        <ambientLight intensity={0.12} />
        <pointLight position={[0, 0, 6]} color="#00d4ff" intensity={2.5} />
        <pointLight position={[-6, 6, -4]} color="#0044aa" intensity={1.2} />
        <pointLight position={[6, -4, 2]} color="#00aaff" intensity={0.7} />
        <Suspense fallback={null}>
          <Particles />
          <NodeNetwork mouseX={mouse.x} mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}
