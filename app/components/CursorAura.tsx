"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const springConfig = { stiffness: 120, damping: 25, mass: 0.6 };

export default function CursorAura() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const followerX = useSpring(x, springConfig);
  const followerY = useSpring(y, springConfig);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerFine = window.matchMedia("(pointer: fine)");

    const updateEnabled = () => {
      setEnabled(pointerFine.matches && !prefersReducedMotion.matches);
    };

    updateEnabled();
    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX - 150);
      y.set(event.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    prefersReducedMotion.addEventListener("change", updateEnabled);
    pointerFine.addEventListener("change", updateEnabled);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      prefersReducedMotion.removeEventListener("change", updateEnabled);
      pointerFine.removeEventListener("change", updateEnabled);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[60] h-72 w-72 rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 md:block"
        style={{
          x: followerX,
          y: followerY,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.08), rgba(232,240,248,0.03) 45%, rgba(10,25,41,0))",
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[61] hidden h-4 w-4 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.6)] md:block"
        style={{
          x: followerX,
          y: followerY,
        }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      />
    </>
  );
}

