import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroWord from "./HeroWord";
import { heroSlides } from "../data/content";
import { HERO_INTERVAL } from "../lib/motion";

/**
 * Full-screen campaign wall. One active index drives BOTH the image
 * crossfade and the kinetic word — they can never drift apart.
 */
export default function EditorialHero() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const count = heroSlides.length;

  // 4s cycle, paused while the tab is hidden, cleaned up on unmount.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, HERO_INTERVAL);
    return () => window.clearInterval(id);
  }, [count]);

  // Preload the next frame so crossfades never hit a blank image.
  useEffect(() => {
    const next = heroSlides[(index + 1) % count];
    const img = new Image();
    img.src = next.image;
  }, [index, count]);

  const slide = heroSlides[index];

  return (
    <section className="relative h-svh min-h-[620px] overflow-hidden bg-ink text-paper" aria-label="Campaign hero">
      {/* --- image wall: absolute layers, zero layout shift --- */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <motion.img
            src={slide.image}
            alt={slide.alt}
            loading="eager"
            style={{ objectPosition: slide.objectPosition ?? "center" }}
            initial={{ scale: reduced ? 1 : 1.05 }}
            animate={{ scale: reduced ? 1 : 1.13 }}
            transition={{ duration: HERO_INTERVAL / 1000 + 0.8, ease: "linear" }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-ink/45" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" aria-hidden="true" />

      {/* --- headline --- */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-24 md:px-8 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="mx-auto max-w-[1600px]"
        >
          <p className="label-tag mb-4 flex items-center gap-3 text-paper/70 md:mb-6">
            <span className="inline-block h-2 w-2 animate-pulse-dot bg-volt" aria-hidden="true" />
            FW25 — CAMPAIGN 001
          </p>
          <h1 className="font-display font-semibold">
            <span className="block text-[clamp(1.9rem,5.4vw,4.2rem)] leading-none tracking-[0.06em] text-paper">
              THE FUTURE IS
            </span>
            <HeroWord word={slide.word} />
          </h1>
        </motion.div>
      </div>

      {/* --- bottom meta bar --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute inset-x-0 bottom-0 border-t border-white/15"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-8">
          <p className="label-tag hidden text-paper/60 md:block">EDITORIAL — VOL.05</p>

          {/* scroll cue */}
          <div className="flex flex-col items-center gap-2" aria-hidden="true">
            <span className="label-tag text-paper/60">SCROLL</span>
            <span className="relative block h-9 w-px overflow-hidden bg-white/20">
              <span className="animate-scroll-cue absolute inset-x-0 top-0 h-full w-px bg-volt" />
            </span>
          </div>

          {/* slide counter + sync progress */}
          <div className="flex items-center gap-4">
            <div className="h-px w-14 overflow-hidden bg-white/20 md:w-20" aria-hidden="true">
              {reduced ? (
                <span className="block h-full w-full bg-volt" />
              ) : (
                <motion.span
                  key={`bar-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: HERO_INTERVAL / 1000, ease: "linear" }}
                  className="block h-full w-full origin-left bg-volt"
                />
              )}
            </div>
            <p className="text-[11px] font-medium tracking-[0.3em] text-paper/80">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
