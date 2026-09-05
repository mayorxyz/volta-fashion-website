import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { EASE_OUT } from "../lib/motion";

type Status = "idle" | "error" | "sending" | "done";

/**
 * The conversion moment — treated as an editorial statement.
 * On success the form morphs into a compact confirmation with a drawn checkmark.
 */
export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("done"), 900);
  };

  return (
    <section id="newsletter" className="border-t border-white/10 bg-ink py-24 text-paper md:py-36" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal>
          <p className="label-tag flex items-center gap-3 text-muted">
            <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
            (05) — JOIN THE LIST
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 id="newsletter-heading" className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5.8rem)] font-semibold leading-[1.02]">
            The future arrives <em className="italic text-volt">by email.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-5" delay={0.12}>
            <p className="max-w-sm text-base leading-relaxed text-muted">
              One transmission per drop. Lookbooks before the public, capsules before they sell
              out, and nothing else. No noise — we save that for the clothes.
            </p>
            <p className="label-tag mt-6 text-muted">ONE EMAIL PER DROP — UNSUBSCRIBE ANYTIME</p>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.18}>
            <AnimatePresence mode="wait" initial={false}>
              {status === "done" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="flex items-center gap-6 border-b-2 border-volt pb-5"
                  role="status"
                  aria-live="polite"
                >
                  <svg viewBox="0 0 52 52" className="h-14 w-14 shrink-0" aria-hidden="true">
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="#F5FF00"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                    />
                    <motion.path
                      d="M15 27l7.5 7.5L37 19"
                      fill="none"
                      stroke="#F5FF00"
                      strokeWidth="3"
                      strokeLinecap="square"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.55, ease: EASE_OUT }}
                    />
                  </svg>
                  <div>
                    <p className="font-display text-3xl font-semibold italic text-volt md:text-4xl">
                      You're in.
                    </p>
                    <p className="mt-1 text-sm tracking-wide text-muted">
                      First transmission lands with the next drop. Stay loud.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-0">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="your@email.com"
                      aria-invalid={status === "error"}
                      aria-describedby={status === "error" ? "newsletter-error" : undefined}
                      className={`w-full flex-1 border-b-2 bg-transparent pb-4 font-display text-xl italic text-paper placeholder:text-muted/60 focus:outline-none md:text-2xl ${
                        status === "error" ? "border-volt" : "border-white/25 focus:border-volt"
                      } transition-colors duration-300`}
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group shrink-0 bg-volt px-8 py-4 text-[12px] font-semibold tracking-[0.3em] text-ink transition-all duration-300 hover:bg-paper disabled:opacity-60 sm:ml-6"
                    >
                      {status === "sending" ? "JOINING…" : "JOIN —"}
                    </button>
                  </div>
                  <div className="mt-3 min-h-[20px]" aria-live="polite">
                    {status === "error" && (
                      <p id="newsletter-error" className="text-[12px] tracking-[0.18em] text-volt">
                        ▲ ENTER A VALID EMAIL — THE FUTURE CAN'T REACH A TYPO.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
