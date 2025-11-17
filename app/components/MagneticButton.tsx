"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  disabled,
  as = "button",
  href,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const maxDistance = 50;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const strength = Math.min(distance / maxDistance, 1);

    x.set(distanceX * strength * 0.3);
    y.set(distanceY * strength * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === "a" ? motion.a : motion.button;
  const props = as === "a"
    ? { href, target, rel: target === "_blank" ? "noopener noreferrer" : rel, "aria-label": ariaLabel }
    : { onClick, disabled, "aria-label": ariaLabel };

  return (
    <Component
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      style={{
        x: reducedMotion ? 0 : xSpring,
        y: reducedMotion ? 0 : ySpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3.5",
        "bg-[var(--primary)] text-[var(--bg)] font-medium rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:bg-[var(--accent)] hover:shadow-lg hover:shadow-[var(--primary)]/30",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

