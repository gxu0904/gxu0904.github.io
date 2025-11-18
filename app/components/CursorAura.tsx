"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// Different spring configs for layered effect
const auraSpringConfig = { stiffness: 150, damping: 30, mass: 0.5 };
const dotSpringConfig = { stiffness: 300, damping: 35, mass: 0.3 };

export default function CursorAura() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  
  // Separate motion values for aura (centered on 288px element) and dot (centered on 8px element)
  const auraMouseX = useMotionValue(-200);
  const auraMouseY = useMotionValue(-200);
  const dotMouseX = useMotionValue(-200);
  const dotMouseY = useMotionValue(-200);
  
  // Aura follows with more lag
  const auraX = useSpring(auraMouseX, auraSpringConfig);
  const auraY = useSpring(auraMouseY, auraSpringConfig);
  
  // Dot follows more closely
  const dotX = useSpring(dotMouseX, dotSpringConfig);
  const dotY = useSpring(dotMouseY, dotSpringConfig);
  
  // Velocity tracking for dynamic effects
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [lastTime, setLastTime] = useState(Date.now());
  
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      setEnabled(pointerFine.matches && !prefersReducedMotion.matches);
    };

    updateEnabled();
    
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      const deltaTime = Math.max(1, now - lastTime);
      
      const deltaX = event.clientX - lastPos.x;
      const deltaY = event.clientY - lastPos.y;
      
      // Calculate velocity (pixels per frame at 60fps)
      velocityX.set((deltaX / deltaTime) * 16);
      velocityY.set((deltaY / deltaTime) * 16);
      
      setLastPos({ x: event.clientX, y: event.clientY });
      setLastTime(now);
      
      // Set positions (centered on cursor)
      // Aura is 288px (h-72), so offset by half
      auraMouseX.set(event.clientX - 144);
      auraMouseY.set(event.clientY - 144);
      
      // Dot is 8px (h-2 w-2), so offset by half
      dotMouseX.set(event.clientX - 4);
      dotMouseY.set(event.clientY - 4);
      
      // Keep mouseX/Y for medium ring
      mouseX.set(event.clientX - 64); // h-32 = 128px, so half is 64
      mouseY.set(event.clientY - 64);
    };

    window.addEventListener("mousemove", handleMouseMove);
    prefersReducedMotion.addEventListener("change", updateEnabled);
    pointerFine.addEventListener("change", updateEnabled);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      prefersReducedMotion.removeEventListener("change", updateEnabled);
      pointerFine.removeEventListener("change", updateEnabled);
    };
  }, [auraMouseX, auraMouseY, dotMouseX, dotMouseY, mouseX, mouseY, velocityX, velocityY]);

  // Transform velocity to scale/opacity
  const speed = useTransform(
    [velocityX, velocityY],
    ([vx, vy]) => Math.min(Math.sqrt(vx * vx + vy * vy), 15)
  );
  
  const auraScale = useTransform(speed, [0, 15], [1, 1.4]);
  const auraOpacity = useTransform(speed, [0, 15], [0.3, 0.6]);
  const dotScale = useTransform(speed, [0, 15], [1, 1.3]);

  if (!enabled) return null;

  return (
    <>
      {/* Large blurred aura - follows with more lag */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[60] h-72 w-72 rounded-full md:block"
        style={{
          x: auraX,
          y: auraY,
          scale: auraScale,
          opacity: auraOpacity,
          background:
            "radial-gradient(circle at center, rgba(91,155,213,0.15), rgba(125,184,232,0.08) 40%, rgba(74,139,194,0.03) 60%, transparent)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Medium glow ring - follows with medium lag */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[60] h-32 w-32 rounded-full md:block"
        style={{
          x: useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.4 }),
          y: useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.4 }),
          background:
            "radial-gradient(circle at center, transparent, rgba(91,155,213,0.2) 30%, transparent 60%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Small dot - follows closely */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[61] hidden h-2 w-2 rounded-full md:block"
        style={{
          x: dotX,
          y: dotY,
          scale: dotScale,
          background: "rgba(91,155,213,0.9)",
          boxShadow: "0 0 12px rgba(91,155,213,0.8), 0 0 24px rgba(125,184,232,0.4)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

