import { Variants } from "framer-motion";

export const springConfig = {
  stiffness: 280,
  damping: 30,
  mass: 0.9,
};

// Browser Company inspired easing curve
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  hidden: {},
  show: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

export const hoverLift = {
  whileHover: {
    y: -4,
    scale: 1.03,
    boxShadow: "0 16px 40px rgba(0, 168, 232, 0.25)",
    transition: { duration: 0.3, ease: smoothEase },
  },
  whileTap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.2, ease: smoothEase },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -2 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      ...springConfig,
    },
  },
};

export const floatIn: Variants = {
  hidden: { opacity: 0, y: 16, x: -10, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

export const fadeInDelayed = (delay = 0.2): Variants => ({
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: smoothEase,
      delay,
    },
  },
});

