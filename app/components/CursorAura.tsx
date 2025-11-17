"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const springConfig = { stiffness: 120, damping: 25, mass: 0.6 };

export default function CursorAura() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const followerX = useSpring(x, springConfig);
  const followerY = useSpring(y, springConfig);
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if we're on a device with a mouse
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || 
                         'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0;

    const updateEnabled = () => {
      setEnabled(!isTouchDevice && !prefersReducedMotion.matches);
    };

    updateEnabled();
    
    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    prefersReducedMotion.addEventListener("change", updateEnabled);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      prefersReducedMotion.removeEventListener("change", updateEnabled);
    };
  }, [x, y]);

  if (!mounted || !enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] h-72 w-72 rounded-full mix-blend-screen hidden md:block"
        style={{
          x: followerX,
          y: followerY,
          background:
            "radial-gradient(circle at center, rgba(96,165,250,0.35), rgba(147,197,253,0.15) 45%, rgba(10,22,40,0) 70%)",
          filter: "blur(16px)",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: enabled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[10000] h-3 w-3 rounded-full bg-white/80 shadow-[0_0_24px_rgba(96,165,250,0.6)] hidden md:block"
        style={{
          x: followerX,
          y: followerY,
          transform: "translate(-50%, -50%)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: enabled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}


