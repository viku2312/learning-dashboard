import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const tileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

export const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  },
  hover: {
    scale: 1.015,
    boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const progressBarVariants: Variants = {
  hidden: { width: "0%" },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.3,
    },
  }),
};

export const sidebarItemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const sidebarContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};
