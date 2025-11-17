"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTitleProps {
  children: string;
  className?: string;
}

export default function GlitchTitle({ children, className = "" }: GlitchTitleProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 400);
  };

  const generateLayers = () => {
    const layers = [];
    for (let i = 0; i < 3; i++) {
      const clipTop = Math.random() * 30;
      const clipBottom = 100 - Math.random() * 30;
      layers.push({
        color: i === 0 ? "#FFFFFF" : i === 1 ? "#E8F0F8" : "#FFFFFF",
        clip: `inset(${clipTop}% 0 ${clipBottom}% 0)`,
        translateX: (Math.random() - 0.5) * 8,
        translateY: (Math.random() - 0.5) * 4,
        opacity: 0.4 - i * 0.1,
      });
    }
    return layers;
  };

  const layers = glitch ? generateLayers() : [];

  return (
    <motion.h1
      onMouseEnter={handleMouseEnter}
      className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <span className="relative inline-block">
        {children}
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
      </span>
    </motion.h1>
  );
}

