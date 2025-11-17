"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function BlueprintScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const linesRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useFrame((state) => {
    if (reducedMotion || !linesRef.current || !gridRef.current) return;

    const time = state.clock.elapsedTime;
    linesRef.current.rotation.z = Math.sin(time * 0.2) * 0.05;
    gridRef.current.rotation.z = Math.cos(time * 0.15) * 0.03;
  });

  const gridSize = 2;
  const gridLines: React.ReactElement[] = [];
  for (let i = -5; i <= 5; i++) {
    gridLines.push(
      <Line
        key={`h-${i}`}
        points={[
          [-5, i * gridSize, 0],
          [5, i * gridSize, 0],
        ]}
        color="#00A8E8"
        opacity={0.2}
        transparent
      />
    );
    gridLines.push(
      <Line
        key={`v-${i}`}
        points={[
          [i * gridSize, -5, 0],
          [i * gridSize, 5, 0],
        ]}
        color="#00A8E8"
        opacity={0.2}
        transparent
      />
    );
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00A8E8" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6BE6FF" />

      <group ref={gridRef}>{gridLines}</group>

      <group ref={linesRef}>
        <Line
          points={Array.from({ length: 33 }, (_, i) => {
            const angle = (i / 32) * Math.PI * 2;
            return [Math.cos(angle) * 2, Math.sin(angle) * 2, 0];
          })}
          color="#00A8E8"
        />

        <Line
          points={[
            [0, -1.5, 0],
            [1.5, 0, 0],
            [0, 1.5, 0],
            [-1.5, 0, 0],
            [0, -1.5, 0],
          ]}
          color="#6BE6FF"
        />

        <Line
          points={[
            [-2, -2, 0],
            [2, 2, 0],
          ]}
          color="#00A8E8"
          opacity={0.5}
          transparent
        />
        <Line
          points={[
            [2, -2, 0],
            [-2, 2, 0],
          ]}
          color="#00A8E8"
          opacity={0.5}
          transparent
        />

        {[
          [-3, -3],
          [3, -3],
          [3, 3],
          [-3, 3],
        ].map(([x, y], i) => (
          <Line
            key={i}
            points={[
              [x - 0.3, y, 0],
              [x + 0.3, y, 0],
            ]}
            color="#6BE6FF"
          />
        ))}
      </group>
    </>
  );
}

