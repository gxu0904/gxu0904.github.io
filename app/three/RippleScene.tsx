"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { metrics } from "@/app/data/metrics";

interface RippleSceneProps {
  onMetricHover?: (index: number | null) => void;
}

export default function RippleScene({ onMetricHover }: RippleSceneProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const count = metrics.length;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    metrics.forEach((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + i * 0.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    });
    return positions;
  }, [count]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color("#00A8E8") },
        },
        vertexShader: `
          uniform float time;
          varying vec3 vPosition;
          varying float vDistance;
          
          void main() {
            vPosition = position;
            vDistance = distance(position, vec3(0.0));
            
            vec3 pos = position;
            float wave = sin(vDistance * 2.0 - time * 2.0) * 0.1;
            pos.y += wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying vec3 vPosition;
          varying float vDistance;
          
          void main() {
            float alpha = 0.3 + sin(vDistance * 2.0) * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  useEffect(() => {
    if (!meshRef.current) return;

    metrics.forEach((_, i) => {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.set(1 + i * 0.2, 1 + i * 0.2, 1 + i * 0.2);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions]);

  useFrame((state) => {
    if (reducedMotion || !materialRef.current) return;

    materialRef.current.uniforms.time.value = state.clock.elapsedTime;
  });

  if (reducedMotion) {
    return (
      <group>
        {metrics.map((_, i) => {
          const angle = (i / count) * Math.PI * 2;
          const radius = 3 + i * 0.5;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
              onPointerEnter={() => onMetricHover?.(i)}
              onPointerLeave={() => onMetricHover?.(null)}
            >
              <ringGeometry args={[1 + i * 0.3, 1.2 + i * 0.3, 32]} />
              <meshBasicMaterial color="#00A8E8" transparent opacity={0.3} />
            </mesh>
          );
        })}
        <ambientLight intensity={0.5} />
      </group>
    );
  }

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        onPointerEnter={(e) => {
          if (e.instanceId !== undefined) {
            onMetricHover?.(e.instanceId);
          }
        }}
        onPointerLeave={() => onMetricHover?.(null)}
      >
        <ringGeometry args={[1, 1.2, 32]} />
        <primitive ref={materialRef} object={shaderMaterial} attach="material" />
      </instancedMesh>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00A8E8" />
    </>
  );
}

