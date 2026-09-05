import { AnimatePresence, motion } from "framer-motion";
import { EASE_IN_OUT } from "../lib/motion";

interface HeroWordProps {
  word: string;
}

/**
 * Kinetic word exchange — the outgoing word clips upward while the
 * incoming word clips in from below. Both occupy the same grid cell,
 * so the headline never shifts layout.
 */
export default function HeroWord({ word }: HeroWordProps) {
  return (
    <span className="grid overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={word}
          style={{ gridArea: "1 / 1" }}
          initial={{ y: "108%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-108%" }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          className="block font-display text-[clamp(4.2rem,16vw,14rem)] font-semibold italic leading-[0.9] text-volt"
        >
          {word}
          <span className="not-italic">.</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
