"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";

interface GlitchTitleProps {
  children: string;
  className?: string;
}

const GLITCH_SEQUENCE = [
  {
    clip: "inset(0% 0 68% 0)",
    translateX: -3,
    translateY: -1,
    color: "var(--accent)",
    opacity: 0.7,
  },
  {
    clip: "inset(35% 0 28% 0)",
    translateX: 3,
    translateY: 1.5,
    color: "var(--fg)",
    opacity: 0.85,
  },
  {
    clip: "inset(72% 0 0% 0)",
    translateX: -2,
    translateY: 0,
    color: "var(--primary)",
    opacity: 0.6,
  },
];

export default function GlitchTitle({ children, className = "" }: GlitchTitleProps) {
  const [glitch, setGlitch] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlitch = () => {
    setGlitch(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setGlitch(false), 320);
  };

  useEffect(() => {
    triggerGlitch();
    const interval = setInterval(() => {
      triggerGlitch();
    }, 6000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const layers = useMemo(() => GLITCH_SEQUENCE, []);

  return (
    <motion.h1
      onMouseEnter={triggerGlitch}
      className={`group font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative inline-flex">
        <span className="relative z-10 bg-gradient-to-br from-[var(--fg)] via-white to-[var(--accent)] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(0,168,232,0.15)]">
          {children}
        </span>

        <AnimatePresence>
          {glitch &&
            layers.map((layer, idx) => (
              <motion.span
                key={idx}
                aria-hidden="true"
                className="absolute inset-0 font-inherit"
                style={{
                  color: layer.color,
                  clipPath: layer.clip,
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0, x: 0, y: 0, skewX: 0 }}
                animate={{
                  opacity: layer.opacity,
                  x: layer.translateX,
                  y: layer.translateY,
                  skewX: idx === 1 ? -2 : 0,
                }}
                exit={{ opacity: 0, x: 0, y: 0, skewX: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {children}
              </motion.span>
            ))}
        </AnimatePresence>

        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--primary)]/25 via-transparent to-[var(--accent)]/25 transition-opacity duration-400"
          style={{ opacity: glitch ? 0.6 : 0 }}
        />
      </span>
    </motion.h1>
  );
}

