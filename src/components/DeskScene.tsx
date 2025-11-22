import React, { useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Sparkles, Trail, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Type definitions
interface TooltipInfo {
  text: string;
  description: string;
}

interface InteractiveObjectProps {
  position: [number, number, number];
  onClick: () => void;
  tooltip: TooltipInfo;
  children: React.ReactNode;
  floatIntensity?: number;
  glowColor?: string;
}


// Scroll to section helper
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Animated voxel box with optional wobble
function VoxelBox({
  position,
  size,
  color,
  wobble = false,
  emissive,
  emissiveIntensity = 0
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  wobble?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      {wobble ? (
        <MeshWobbleMaterial
          color={color}
          factor={0.3}
          speed={2}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      )}
    </mesh>
  );
}

// Click explosion particles
function ClickParticles({
  position,
  color,
  onComplete
}: {
  position: [number, number, number];
  color: string;
  onComplete: () => void;
}) {
  const particlesRef = useRef<THREE.Points>(null);
  const [opacity, setOpacity] = useState(1);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 2;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= 1.05;
        positions[i + 1] *= 1.05;
        positions[i + 2] *= 1.05;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      setOpacity(prev => {
        const newOpacity = prev - delta * 2;
        if (newOpacity <= 0) {
          onComplete();
          return 0;
        }
        return newOpacity;
      });
    }
  });

  const particleCount = 20;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 0.3;
    positions[i + 1] = (Math.random() - 0.5) * 0.3;
    positions[i + 2] = (Math.random() - 0.5) * 0.3;
  }

  return (
    <points ref={particlesRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

// Enhanced interactive wrapper with more effects
function InteractiveObject({
  position,
  onClick,
  tooltip,
  children,
  floatIntensity = 0.5,
  glowColor = '#4A90D9'
}: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const rotationRef = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Scale animation
      const targetScale = hovered ? 1.15 : clicked ? 0.9 : 1;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      );

      // Bounce back after click
      if (clicked) {
        setTimeout(() => setClicked(false), 150);
      }

      // Gentle rotation on hover
      if (hovered) {
        rotationRef.current += delta * 0.5;
        groupRef.current.rotation.y = Math.sin(rotationRef.current) * 0.1;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          0,
          0.1
        );
      }
    }
  });

  const handleClick = useCallback(() => {
    setClicked(true);
    setShowParticles(true);
    onClick();
  }, [onClick]);

  return (
    <Float
      speed={2}
      rotationIntensity={hovered ? 0.3 : 0.1}
      floatIntensity={hovered ? floatIntensity * 1.5 : floatIntensity}
    >
      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {children}

        {/* Glow ring on hover */}
        {hovered && (
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshBasicMaterial
              color={glowColor}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        {/* Click particles */}
        {showParticles && (
          <ClickParticles
            position={[0, 0.5, 0]}
            color={glowColor}
            onComplete={() => setShowParticles(false)}
          />
        )}

        {/* Tooltip */}
        {hovered && (
          <Html
            position={[0, 1.5, 0]}
            center
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              transform: 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl border border-[var(--primary)]/20 whitespace-nowrap animate-in fade-in zoom-in duration-200">
              <p className="text-sm font-bold text-[var(--primary)]">{tooltip.text}</p>
              <p className="text-xs text-[var(--muted)] max-w-[220px] mt-1">{tooltip.description}</p>
              <p className="text-[10px] text-[var(--primary)]/60 mt-2 font-medium">Click to explore →</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

// Character with typing animation
function GraceCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (headRef.current) {
      // Head bobbing
      headRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
      headRef.current.rotation.z = Math.sin(t * 0.3) * 0.03;
    }

    // Typing animation for arms
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * 8) * 0.15;
      rightArmRef.current.rotation.x = Math.sin(t * 8 + 1) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0.3]}>
      {/* Body */}
      <VoxelBox position={[0, 0, 0]} size={[0.4, 0.5, 0.3]} color="#2A4D7C" />
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.4, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#F5D6BA" />
      </mesh>
      {/* Hair */}
      <VoxelBox position={[0, 0.55, -0.05]} size={[0.32, 0.15, 0.32]} color="#2C1810" />
      {/* Arms with refs for animation */}
      <mesh ref={leftArmRef} position={[-0.25, -0.05, 0.1]}>
        <boxGeometry args={[0.1, 0.35, 0.15]} />
        <meshStandardMaterial color="#2A4D7C" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.25, -0.05, 0.1]}>
        <boxGeometry args={[0.1, 0.35, 0.15]} />
        <meshStandardMaterial color="#2A4D7C" />
      </mesh>
    </group>
  );
}

// Desk Island with subtle animation
function DeskIsland() {
  return (
    <group>
      {/* Main desk surface */}
      <VoxelBox position={[0, -0.15, 0]} size={[3.5, 0.1, 2]} color="#D4B896" />
      {/* Desk legs */}
      <VoxelBox position={[-1.5, -0.55, -0.8]} size={[0.15, 0.7, 0.15]} color="#8B6B4D" />
      <VoxelBox position={[1.5, -0.55, -0.8]} size={[0.15, 0.7, 0.15]} color="#8B6B4D" />
      <VoxelBox position={[-1.5, -0.55, 0.8]} size={[0.15, 0.7, 0.15]} color="#8B6B4D" />
      <VoxelBox position={[1.5, -0.55, 0.8]} size={[0.15, 0.7, 0.15]} color="#8B6B4D" />
      {/* Floor platform with gradient effect */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial color="#E5E7EB" />
      </mesh>
    </group>
  );
}

// Laptop with animated screen and typing indicator
function Laptop() {
  const screenRef = useRef<THREE.Mesh>(null);
  const cursorRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.15;
    }

    // Blinking cursor
    if (cursorRef.current) {
      cursorRef.current.visible = Math.sin(t * 6) > 0;
    }
  });

  return (
    <InteractiveObject
      position={[0, 0, -0.3]}
      onClick={() => scrollToSection('projects')}
      tooltip={{
        text: "Full-stack Development",
        description: "React, Next.js, TypeScript, AI/ML tools & more"
      }}
      glowColor="#4A90D9"
      floatIntensity={0.3}
    >
      {/* Laptop base */}
      <VoxelBox position={[0, 0, 0]} size={[0.6, 0.04, 0.4]} color="#2C3E50" />
      {/* Screen */}
      <group position={[0, 0.25, -0.18]} rotation={[-0.2, 0, 0]}>
        <VoxelBox position={[0, 0, 0]} size={[0.55, 0.4, 0.03]} color="#2C3E50" />
        {/* Screen display */}
        <mesh ref={screenRef} position={[0, 0, 0.02]}>
          <boxGeometry args={[0.48, 0.32, 0.01]} />
          <meshStandardMaterial
            color="#0D1B2A"
            emissive="#4A90D9"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Animated code blocks */}
        <VoxelBox
          position={[-0.1, 0.08, 0.025]}
          size={[0.2, 0.025, 0.005]}
          color="#6DD5ED"
          emissive="#6DD5ED"
          emissiveIntensity={0.5}
        />
        <VoxelBox
          position={[0.05, 0.02, 0.025]}
          size={[0.15, 0.025, 0.005]}
          color="#2ECC71"
          emissive="#2ECC71"
          emissiveIntensity={0.5}
        />
        <VoxelBox
          position={[-0.05, -0.04, 0.025]}
          size={[0.25, 0.025, 0.005]}
          color="#E74C3C"
          emissive="#E74C3C"
          emissiveIntensity={0.5}
        />
        <VoxelBox
          position={[0.08, -0.1, 0.025]}
          size={[0.18, 0.025, 0.005]}
          color="#F39C12"
          emissive="#F39C12"
          emissiveIntensity={0.5}
        />
        {/* Cursor */}
        <mesh ref={cursorRef} position={[0.2, -0.1, 0.026]}>
          <boxGeometry args={[0.01, 0.025, 0.002]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </InteractiveObject>
  );
}

// Robot with more dynamic animations
function RobotArm() {
  const armRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (armRef.current) {
      // More complex arm movement
      armRef.current.rotation.z = Math.sin(t * 1.2) * 0.2;
      armRef.current.rotation.x = Math.sin(t * 0.8) * 0.1;
    }

    if (bodyRef.current) {
      // Slight body sway
      bodyRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <InteractiveObject
      position={[1.2, 0.1, 0.2]}
      onClick={() => scrollToSection('projects')}
      tooltip={{
        text: "FRC Team 3256",
        description: "Software lead: autonomous, vision, superstructure control"
      }}
      glowColor="#E74C3C"
      floatIntensity={0.4}
    >
      <group ref={bodyRef}>
        {/* Robot base with LED effect */}
        <VoxelBox position={[0, 0, 0]} size={[0.4, 0.15, 0.3]} color="#5B6B7F" />
        {/* Status LED */}
        <VoxelBox
          position={[0.15, 0.08, 0.15]}
          size={[0.03, 0.03, 0.03]}
          color="#2ECC71"
          emissive="#2ECC71"
          emissiveIntensity={1}
        />
        {/* Robot body */}
        <VoxelBox
          position={[0, 0.15, 0]}
          size={[0.3, 0.2, 0.25]}
          color="#1E3A5F"
          emissive="#1E3A5F"
          emissiveIntensity={0.2}
        />
        {/* Robot arm with trail effect */}
        <group ref={armRef} position={[0.1, 0.3, 0]}>
          <Trail
            width={0.5}
            length={4}
            color="#E74C3C"
            attenuation={(t) => t * t}
          >
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.08, 0.25, 0.08]} />
              <meshStandardMaterial color="#E74C3C" emissive="#E74C3C" emissiveIntensity={0.3} />
            </mesh>
          </Trail>
          <VoxelBox position={[0, 0.25, 0]} size={[0.1, 0.1, 0.1]} color="#5B6B7F" />
        </group>
        {/* Animated wheels */}
        <VoxelBox position={[-0.15, -0.1, 0.12]} size={[0.08, 0.08, 0.08]} color="#2C3E50" />
        <VoxelBox position={[0.15, -0.1, 0.12]} size={[0.08, 0.08, 0.08]} color="#2C3E50" />
        <VoxelBox position={[-0.15, -0.1, -0.12]} size={[0.08, 0.08, 0.08]} color="#2C3E50" />
        <VoxelBox position={[0.15, -0.1, -0.12]} size={[0.08, 0.08, 0.08]} color="#2C3E50" />
      </group>
    </InteractiveObject>
  );
}

// AP Board with animated content
function APBoard() {
  const graphRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (graphRef.current) {
      // Animate graph lines
      graphRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + i) * 0.1;
          child.scale.x = scale;
        }
      });
    }
  });

  return (
    <InteractiveObject
      position={[-1.3, 0.4, -0.6]}
      onClick={() => scrollToSection('projects')}
      tooltip={{
        text: "StudyAP",
        description: "AI-powered study platform, 5,000+ students, 50K+ questions"
      }}
      glowColor="#2ECC71"
      floatIntensity={0.3}
    >
      {/* Board frame */}
      <VoxelBox position={[0, 0, 0]} size={[0.6, 0.5, 0.05]} color="#FFFFFF" />
      {/* Board border */}
      <VoxelBox position={[0, 0.27, 0]} size={[0.65, 0.04, 0.06]} color="#8B6B4D" />
      <VoxelBox position={[0, -0.27, 0]} size={[0.65, 0.04, 0.06]} color="#8B6B4D" />
      <VoxelBox position={[-0.32, 0, 0]} size={[0.04, 0.5, 0.06]} color="#8B6B4D" />
      <VoxelBox position={[0.32, 0, 0]} size={[0.04, 0.5, 0.06]} color="#8B6B4D" />
      {/* AP text with glow */}
      <VoxelBox
        position={[-0.1, 0.12, 0.03]}
        size={[0.12, 0.12, 0.01]}
        color="#1E3A5F"
        emissive="#1E3A5F"
        emissiveIntensity={0.3}
      />
      <VoxelBox
        position={[0.08, 0.12, 0.03]}
        size={[0.1, 0.12, 0.01]}
        color="#2A4D7C"
        emissive="#2A4D7C"
        emissiveIntensity={0.3}
      />
      {/* Animated graph lines */}
      <group ref={graphRef}>
        <mesh position={[0, -0.05, 0.03]}>
          <boxGeometry args={[0.35, 0.02, 0.01]} />
          <meshStandardMaterial color="#E74C3C" emissive="#E74C3C" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.03, -0.12, 0.03]}>
          <boxGeometry args={[0.28, 0.02, 0.01]} />
          <meshStandardMaterial color="#2ECC71" emissive="#2ECC71" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </InteractiveObject>
  );
}

// Globe with orbiting particles
function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.4;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.2;
      ringsRef.current.rotation.x = t * 0.1;
    }
  });

  return (
    <InteractiveObject
      position={[1.3, 0.35, -0.5]}
      onClick={() => scrollToSection('projects')}
      tooltip={{
        text: "LightAid",
        description: "10+ countries, 17K+ donations, 750+ volunteers"
      }}
      glowColor="#3498DB"
      floatIntensity={0.5}
    >
      {/* Globe stand */}
      <VoxelBox position={[0, -0.15, 0]} size={[0.15, 0.1, 0.15]} color="#8B6B4D" />
      <VoxelBox position={[0, -0.05, 0]} size={[0.05, 0.1, 0.05]} color="#5B6B7F" />

      {/* Globe sphere */}
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color="#4A90D9"
            emissive="#4A90D9"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Continents */}
        <VoxelBox position={[0.12, 0.08, 0.08]} size={[0.08, 0.06, 0.03]} color="#2ECC71" />
        <VoxelBox position={[-0.1, 0.05, 0.12]} size={[0.06, 0.08, 0.03]} color="#2ECC71" />
        <VoxelBox position={[0.05, -0.1, 0.12]} size={[0.1, 0.06, 0.03]} color="#2ECC71" />
        {/* Network nodes with glow */}
        <VoxelBox
          position={[0.15, 0, 0.1]}
          size={[0.04, 0.04, 0.04]}
          color="#E74C3C"
          emissive="#E74C3C"
          emissiveIntensity={1}
        />
        <VoxelBox
          position={[-0.12, 0.1, 0.1]}
          size={[0.04, 0.04, 0.04]}
          color="#F39C12"
          emissive="#F39C12"
          emissiveIntensity={1}
        />
        <VoxelBox
          position={[0, -0.15, 0.08]}
          size={[0.04, 0.04, 0.04]}
          color="#2ECC71"
          emissive="#2ECC71"
          emissiveIntensity={1}
        />
      </group>

      {/* Orbiting ring */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.25, 0.01, 8, 32]} />
          <meshBasicMaterial color="#4A90D9" transparent opacity={0.5} />
        </mesh>
      </group>
    </InteractiveObject>
  );
}

// Health icon with heartbeat animation
function HealthIcon() {
  const iconRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (iconRef.current) {
      // Heartbeat effect
      const heartbeat = Math.sin(t * 4) > 0.9 ? 1.3 : 1;
      iconRef.current.scale.setScalar(THREE.MathUtils.lerp(
        iconRef.current.scale.x,
        heartbeat,
        0.3
      ));
    }
  });

  return (
    <InteractiveObject
      position={[-1.0, 0.05, 0.6]}
      onClick={() => scrollToSection('about')}
      tooltip={{
        text: "2023 Journey",
        description: "Overcame aplastic anemia with bone marrow transplant"
      }}
      glowColor="#E74C3C"
      floatIntensity={0.4}
    >
      {/* Mug */}
      <VoxelBox position={[0, 0.08, 0]} size={[0.15, 0.16, 0.12]} color="#FFFFFF" />
      <VoxelBox position={[0.1, 0.08, 0]} size={[0.05, 0.1, 0.05]} color="#FFFFFF" />
      {/* Heart/Plus symbol with heartbeat */}
      <group ref={iconRef} position={[0, 0.08, 0.065]}>
        <VoxelBox
          position={[0, 0, 0]}
          size={[0.06, 0.02, 0.01]}
          color="#E74C3C"
          emissive="#E74C3C"
          emissiveIntensity={0.8}
        />
        <VoxelBox
          position={[0, 0, 0]}
          size={[0.02, 0.06, 0.01]}
          color="#E74C3C"
          emissive="#E74C3C"
          emissiveIntensity={0.8}
        />
      </group>
    </InteractiveObject>
  );
}

// Animated plant
function Plant() {
  const plantRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (plantRef.current) {
      // Gentle swaying
      plantRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group position={[-1.4, 0.15, 0.4]}>
      {/* Pot */}
      <VoxelBox position={[0, 0, 0]} size={[0.15, 0.12, 0.15]} color="#D4856A" />
      {/* Animated plant leaves */}
      <group ref={plantRef}>
        <VoxelBox position={[0, 0.12, 0]} size={[0.08, 0.15, 0.08]} color="#2ECC71" />
        <VoxelBox position={[-0.06, 0.15, 0.04]} size={[0.06, 0.12, 0.05]} color="#27AE60" />
        <VoxelBox position={[0.06, 0.18, -0.03]} size={[0.05, 0.1, 0.06]} color="#2ECC71" />
      </group>
    </group>
  );
}

// Interactive books
function Books() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[0.8, 0.05, 0.6]}>
        <VoxelBox position={[0, 0, 0]} size={[0.25, 0.06, 0.18]} color="#3498DB" />
        <VoxelBox position={[0.02, 0.06, 0]} size={[0.22, 0.05, 0.16]} color="#E74C3C" />
        <VoxelBox position={[-0.01, 0.11, 0]} size={[0.24, 0.04, 0.17]} color="#F39C12" />
      </group>
    </Float>
  );
}

// Enhanced camera controller with drag rotation
function CameraController() {
  const { camera, gl } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingRef.current) {
        targetRotationRef.current.x += event.movementX * 0.005;
        targetRotationRef.current.y += event.movementY * 0.005;
        // Clamp vertical rotation
        targetRotationRef.current.y = THREE.MathUtils.clamp(
          targetRotationRef.current.y,
          -0.5,
          0.5
        );
      } else {
        mouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        isDraggingRef.current = true;
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      canvas.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
      canvas.style.cursor = 'auto';
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.style.cursor = 'grab';
    }

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [gl]);

  useFrame(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Smooth rotation interpolation
      rotationRef.current.x = THREE.MathUtils.lerp(
        rotationRef.current.x,
        targetRotationRef.current.x,
        0.05
      );
      rotationRef.current.y = THREE.MathUtils.lerp(
        rotationRef.current.y,
        targetRotationRef.current.y,
        0.05
      );

      // Calculate camera position based on rotation and mouse
      const baseX = 4 + mouseRef.current.x * 0.3;
      const baseY = 3 + mouseRef.current.y * 0.2;
      const baseZ = 4;

      const radius = Math.sqrt(baseX * baseX + baseZ * baseZ);
      const angle = Math.atan2(baseZ, baseX) + rotationRef.current.x;

      camera.position.x = radius * Math.cos(angle);
      camera.position.y = baseY + rotationRef.current.y * 2;
      camera.position.z = radius * Math.sin(angle);

      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// Ambient particles
function AmbientParticles() {
  return (
    <Sparkles
      count={50}
      scale={4}
      size={1}
      speed={0.3}
      opacity={0.3}
      color="#4A90D9"
    />
  );
}

// Main scene content
function SceneContent() {
  return (
    <>
      {/* Enhanced lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#6DD5ED" />
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#F39C12" />

      {/* Ambient particles */}
      <AmbientParticles />

      {/* Camera controller */}
      <CameraController />

      {/* Scene objects */}
      <DeskIsland />
      <GraceCharacter />
      <Laptop />
      <RobotArm />
      <APBoard />
      <Globe />
      <HealthIcon />
      <Plant />
      <Books />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--graphite)]/20 rounded-2xl">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-[var(--muted)] font-medium">Loading 3D scene...</p>
      </div>
    </div>
  );
}

// Main component
export default function DeskScene() {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingFallback />;
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 rounded-2xl border border-[var(--graphite)]/30">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-[var(--muted)]">Interactive 3D workspace</p>
          <p className="text-xs text-[var(--muted)]/70 mt-1">Click projects to explore</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden border border-[var(--graphite)]/30 bg-gradient-to-br from-white to-gray-50 relative"
      style={{ minHeight: '350px' }}
    >
      <Canvas
        camera={{ position: [4, 3, 4], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff', 0);
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {/* Interaction hints */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-center gap-4 text-xs text-[var(--muted)]/70">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Hover to explore
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
            Drag to rotate
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Click to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
