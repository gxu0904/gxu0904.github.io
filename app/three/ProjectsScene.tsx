"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function ProjectsScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const particlesRef = useRef<THREE.Points>(null);
  const connectorsRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const particleCount = 150;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.elapsedTime;

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    if (connectorsRef.current) {
      connectorsRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#FFFFFF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#E8F0F8" />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#FFFFFF"
          transparent
          opacity={0.4}
          sizeAttenuation={true}
        />
      </points>

      <group ref={connectorsRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 3 + (i % 3) * 1.5;
          const z = (Math.random() - 0.5) * 2;
          return (
            <Line
              key={i}
              points={[
                [0, 0, 0],
                [
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  z,
                ],
              ]}
              color="#E8F0F8"
              opacity={0.2}
              transparent
            />
          );
        })}
      </group>

      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.1}
          opacity={0.5}
          transparent
        />
      </mesh>
    </>
  );
}

