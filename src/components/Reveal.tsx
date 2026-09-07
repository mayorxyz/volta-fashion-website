import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
}

/** Viewport-triggered fade + translate reveal. Transform-only, GPU friendly.
 *  Pass `immediate` to animate on mount instead of waiting for the viewport. */
export default function Reveal({ children, className, delay = 0, y = 40, immediate = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-10% 0px -10% 0px" } })}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

interface MaskRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
}

/** Line-mask reveal — each line slides out of an overflow-hidden clip. */
export function MaskReveal({ lines, className, lineClassName, delay = 0, immediate = false }: MaskRevealProps) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            className={"block " + (lineClassName ?? "")}
            initial={{ y: "112%" }}
            {...(immediate
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once: true, margin: "-12% 0px" } })}
            transition={{ duration: 0.95, ease: EASE_OUT, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
