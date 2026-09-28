import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-triggered fade + rise, used throughout the showcase for entrance storytelling. */
export function Reveal({ children, className = "", delay = 0, y = 28, once = true }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;
  const variants: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.3 : 0.7, delay: reduceMotion ? 0 : delay, ease: EASE } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}

export function StaggerGroup({ children, className = "", stagger = 0.08, once = true }: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 20 }: { children: ReactNode; className?: string; y?: number }) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.2 : 0.55, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
