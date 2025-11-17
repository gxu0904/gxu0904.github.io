"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

interface ReactorSceneProps {
  mouse?: { x: number; y: number };
  scrollY?: number;
}

export default function ReactorScene({ mouse = { x: 0, y: 0 }, scrollY = 0 }: ReactorSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const rings = useRef<THREE.Group[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const ringConfigs = useMemo(
    () => [
      { radius: 2, tube: 0.1, radialSegments: 32, tubularSegments: 64, color: "#60A5FA" },
      { radius: 1.5, tube: 0.08, radialSegments: 32, tubularSegments: 64, color: "#93C5FD" },
      { radius: 2.5, tube: 0.12, radialSegments: 32, tubularSegments: 64, color: "#60A5FA" },
      { radius: 1.8, tube: 0.09, radialSegments: 32, tubularSegments: 64, color: "#93C5FD" },
    ],
    []
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;

    rings.current.forEach((ring, i) => {
      if (!ring) return;

      const speed = 0.3 + i * 0.1;
      // Enhanced cursor proximity influence
      const mouseDistance = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const mouseInfluence = 1 + mouseDistance * 0.8;

      ring.rotation.x += delta * speed * mouseInfluence;
      ring.rotation.y += delta * speed * 0.7 * mouseInfluence;
      ring.rotation.z += delta * speed * 0.5 * mouseInfluence;

      // Subtle position oscillation with cursor influence
      const time = state.clock.elapsedTime;
      const cursorOffset = mouse.x * 0.3;
      ring.position.y = Math.sin(time * 0.5 + i) * 0.3 + mouse.y * 0.2;
      ring.position.x = Math.cos(time * 0.3 + i) * 0.2 + cursorOffset;
    });
  });

  return (
    <>
      {ringConfigs.map((config, i) => {
        // Contract rings on scroll (parallax effect)
        const scrollScale = Math.max(0.7, 1 - scrollY * 0.0005);
        return (
          <group
            key={i}
            ref={(el) => {
              if (el) rings.current[i] = el;
            }}
            position={[0, i * 0.5 - 0.75, 0]}
            scale={scrollScale}
          >
          <Torus
            args={[config.radius, config.tube, config.radialSegments, config.tubularSegments]}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
          >
            <meshStandardMaterial
              color={config.color}
              emissive={config.color}
              emissiveIntensity={0.5 + Math.abs(mouse.x) * 0.3 + Math.abs(mouse.y) * 0.2}
              metalness={0.8}
              roughness={0.2}
            />
          </Torus>
        </group>
        );
      })}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#93C5FD" />
    </>
  );
}

