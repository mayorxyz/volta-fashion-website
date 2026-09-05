import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

interface PageTransitionProps {
  children: ReactNode;
}

/** Route-level visual transition: subtle opacity + translate, never spectacle. */
export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
