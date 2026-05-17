'use client';
import { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COLS = 12;
const ROWS = 10;
const SPACING = 0.52;
const COUNT = COLS * ROWS;

function WavePoints({ mouseY }) {
  const attrRef = useRef();
  const groupRef = useRef();

  const { baseX, baseY, posBuffer } = useMemo(() => {
    const baseX = new Float32Array(COUNT);
    const baseY = new Float32Array(COUNT);
    const posBuffer = new Float32Array(COUNT * 3);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        baseX[idx] = (c - COLS / 2) * SPACING;
        baseY[idx] = (r - ROWS / 2) * SPACING;
        posBuffer[idx * 3]     = baseX[idx];
        posBuffer[idx * 3 + 1] = baseY[idx];
        posBuffer[idx * 3 + 2] = 0;
      }
    }
    return { baseX, baseY, posBuffer };
  }, []);

  useFrame(({ clock }) => {
    /* Animate Z wave */
    if (attrRef.current) {
      const t = clock.elapsedTime * 0.75;
      for (let i = 0; i < COUNT; i++) {
        posBuffer[i * 3 + 2] =
          Math.sin(baseX[i] * 1.4 + t) * 0.32 +
          Math.sin(baseY[i] * 1.1 + t * 0.65) * 0.22;
      }
      attrRef.current.needsUpdate = true;
    }
    /* Mouse parallax on the group */
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY * 0.14,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute ref={attrRef} attach="attributes-position" args={[posBuffer, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#00d4ff" transparent opacity={0.65} sizeAttenuation />
      </points>
    </group>
  );
}

export default function WaveGrid() {
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
        camera={{ position: [0, 0, 7], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[0, 0, 5]} color="#00d4ff" intensity={1.5} />
        <Suspense fallback={null}>
          <WavePoints mouseY={mouse.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}
