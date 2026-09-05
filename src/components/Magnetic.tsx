import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Subtle magnetic pull toward the cursor — desktop pointers only. */
export default function Magnetic({ children, className = "", strength = 0.22 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coarse, setCoarse] = useState(true);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.12 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.12 });

  // Pointer capability is only knowable client-side.
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const disabled = reduced || coarse;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={disabled ? undefined : { x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
