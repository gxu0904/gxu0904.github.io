import { Variants } from "framer-motion";

export const springConfig = {
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Browser Company inspired easing
export const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)", scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

export const stagger: Variants = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: smoothEase,
    },
  },
};

export const hoverLift = {
  whileHover: { y: -3, scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      ...springConfig,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      ...springConfig,
    },
  },
};
