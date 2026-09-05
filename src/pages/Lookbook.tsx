import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import EditorialImage from "../components/EditorialImage";
import Reveal, { MaskReveal } from "../components/Reveal";
import { lookbookArchive, lookCategories, type LookCategory } from "../data/content";
import { EASE_OUT, usePageTitle } from "../lib/motion";

type Filter = "ALL" | LookCategory;

export default function Lookbook() {
  usePageTitle("Lookbook — VOLTA");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [active, setActive] = useState<number | null>(null);

  const frames = filter === "ALL" ? lookbookArchive : lookbookArchive.filter((l) => l.category === filter);

  // Lightbox keyboard control.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % frames.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + frames.length) % frames.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, frames.length]);

  // Changing filter resets any open lightbox index.
  useEffect(() => {
    setActive(null);
  }, [filter]);

  const current = active !== null ? frames[active] : null;

  return (
    <PageTransition>
      <main id="main" className="bg-ink pb-28 pt-32 text-paper md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal>
            <p className="label-tag flex items-center gap-3 text-muted">
              <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
              (ARCHIVE) — VISUAL DIARY
            </p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,10rem)] font-semibold leading-[0.9]">
            <MaskReveal lines={["LOOK-", "BOOK"]} />
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
            <Reveal delay={0.15}>
              <p className="max-w-md text-base font-light leading-relaxed text-muted">
                Frames that didn't make the campaign — and a few that made it everywhere. Click any
                frame to view it full bleed.
              </p>
            </Reveal>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter frames">
              {lookCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                  className={`px-4 py-2.5 text-[11px] font-medium tracking-[0.24em] transition-all duration-300 ${
                    filter === cat
                      ? "bg-volt text-ink"
                      : "border border-white/20 text-muted hover:border-white/60 hover:text-paper"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* --- asymmetric archive grid --- */}
          <div className="mt-16 grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
            {frames.map((frame, i) => {
              // Rotating span pattern keeps the archive art-directed, not templated.
              const patterns = [
                { span: "lg:col-span-5", aspect: "aspect-[4/5]", offset: "" },
                { span: "lg:col-span-7", aspect: "aspect-[16/10]", offset: "lg:mt-24" },
                { span: "lg:col-span-4", aspect: "aspect-square", offset: "" },
                { span: "lg:col-span-4", aspect: "aspect-[4/5]", offset: "lg:mt-16" },
                { span: "lg:col-span-4", aspect: "aspect-[4/5]", offset: "lg:-mt-10" },
              ];
              const p = patterns[i % patterns.length];
              return (
                <Reveal key={frame.title + frame.image} delay={(i % 3) * 0.1} className={`sm:col-span-1 ${p.span} ${p.offset}`}>
                  <button
                    onClick={() => setActive(i)}
                    className="group block w-full text-left"
                    aria-label={`Open frame: ${frame.title}`}
                  >
                    <EditorialImage src={frame.image} alt={frame.alt} className={`${p.aspect} w-full`}>
                      <span className="absolute left-3 top-3 z-10 bg-ink/75 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.26em] text-paper/90">
                        {frame.category}
                      </span>
                      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="label-tag translate-y-3 p-4 text-volt transition-transform duration-500 group-hover:translate-y-0 md:p-5">
                          OPEN FRAME +
                        </span>
                      </span>
                    </EditorialImage>
                    <span className="mt-3 flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg font-semibold italic">{frame.title}</span>
                      <span className="label-tag shrink-0 text-[9px] text-muted">{frame.meta} — {frame.year}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {frames.length === 0 && (
            <p className="mt-24 text-center font-display text-3xl italic text-muted">
              Nothing in this drawer yet.
            </p>
          )}
        </div>

        {/* --- lightbox --- */}
        <AnimatePresence>
          {current && active !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
              onClick={() => setActive(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Frame: ${current.title}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
                <p className="label-tag text-paper/70">
                  {current.category} — {current.year}
                </p>
                <p className="text-[11px] font-medium tracking-[0.3em] text-paper/80">
                  {String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
                </p>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close frame"
                  className="flex h-10 w-10 items-center justify-center border border-white/25 text-paper transition-colors hover:bg-volt hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="square" />
                  </svg>
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center overflow-hidden p-5 md:p-10" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={active}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="flex h-full flex-col items-center justify-center"
                  >
                    <img
                      src={current.image}
                      alt={current.alt}
                      className="max-h-[68svh] max-w-full object-contain"
                    />
                    <figcaption className="mt-5 flex items-baseline gap-5">
                      <span className="font-display text-2xl font-semibold italic text-paper md:text-3xl">
                        {current.title}
                      </span>
                      <span className="label-tag text-muted">{current.meta}</span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>

                <button
                  onClick={() => setActive((a) => (a! - 1 + frames.length) % frames.length)}
                  aria-label="Previous frame"
                  className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-ink/60 text-paper transition-colors hover:bg-volt hover:text-ink md:left-8"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 5l-7 7 7 7" strokeLinecap="square" />
                  </svg>
                </button>
                <button
                  onClick={() => setActive((a) => (a! + 1) % frames.length)}
                  aria-label="Next frame"
                  className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-ink/60 text-paper transition-colors hover:bg-volt hover:text-ink md:right-8"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 5l7 7-7 7" strokeLinecap="square" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PageTransition>
  );
}
