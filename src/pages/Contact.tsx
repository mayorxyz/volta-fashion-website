import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import Reveal, { MaskReveal } from "../components/Reveal";
import Marquee from "../components/Marquee";
import { socials } from "../data/content";
import { EASE_OUT, usePageTitle } from "../lib/motion";

type Status = "idle" | "sending" | "sent";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  usePageTitle("Contact — VOLTA");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Tell us who's speaking.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "That email won't reach you.";
    if (form.message.trim().length < 10) next.message = "Give us at least a sentence.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1000);
  };

  const inputClass = (bad?: string) =>
    `w-full border-b-2 bg-transparent pb-3 text-base text-paper placeholder:text-muted/50 transition-colors duration-300 focus:outline-none ${
      bad ? "border-volt" : "border-white/25 focus:border-volt"
    }`;

  return (
    <PageTransition>
      <main id="main" className="bg-ink pb-0 pt-32 text-paper md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal>
            <p className="label-tag flex items-center gap-3 text-muted">
              <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
              (CONTACT) — SAY IT LOUD
            </p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.92]">
            <MaskReveal lines={["LET'S MAKE", "THE FUTURE."]} />
          </h1>

          <div className="mt-16 grid gap-16 pb-24 md:grid-cols-12 md:gap-12 md:pb-36">
            {/* --- channels --- */}
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <p className="max-w-sm text-base font-light leading-relaxed text-muted">
                  Press, stockists, collaborators, or just a strong opinion about a seam — the
                  inbox is open and someone real reads it.
                </p>
              </Reveal>

              <dl className="mt-12 space-y-8">
                {[
                  {
                    label: "GENERAL",
                    value: "HELLO@VOLTA.STUDIO",
                    href: "mailto:hello@volta.studio",
                  },
                  {
                    label: "PRESS",
                    value: "PRESS@VOLTA.STUDIO",
                    href: "mailto:press@volta.studio",
                  },
                ].map((row, i) => (
                  <Reveal key={row.label} delay={0.14 + i * 0.08}>
                    <div className="border-t border-white/10 pt-4">
                      <dt className="label-tag text-muted">{row.label}</dt>
                      <dd className="mt-2">
                        <a href={row.href} className="link-line font-display text-2xl font-semibold italic text-paper hover:text-volt md:text-3xl">
                          {row.value}
                        </a>
                      </dd>
                    </div>
                  </Reveal>
                ))}

                <Reveal delay={0.3}>
                  <div className="border-t border-white/10 pt-4">
                    <dt className="label-tag text-muted">STUDIOS</dt>
                    <dd className="mt-2 space-y-1 text-sm tracking-[0.14em] text-paper/80">
                      <p>14 RUE DE LA LUNE, 75002 PARIS</p>
                      <p>2-7-1 AOYAMA, MINATO-KU, TOKYO</p>
                    </dd>
                  </div>
                </Reveal>

                <Reveal delay={0.36}>
                  <div className="border-t border-b border-white/10 py-4">
                    <dt className="label-tag text-muted">ELSEWHERE</dt>
                    <dd className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-line text-[12px] font-medium tracking-[0.26em] text-paper/80 hover:text-volt"
                        >
                          {s.label} ↗
                        </a>
                      ))}
                    </dd>
                  </div>
                </Reveal>
              </dl>
            </div>

            {/* --- form --- */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait" initial={false}>
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="flex h-full flex-col justify-center border border-white/15 bg-surface/60 p-10 md:p-16"
                    role="status"
                    aria-live="polite"
                  >
                    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
                      <motion.circle
                        cx="26" cy="26" r="24" fill="none" stroke="#F5FF00" strokeWidth="2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE_OUT }}
                      />
                      <motion.path
                        d="M15 27l7.5 7.5L37 19" fill="none" stroke="#F5FF00" strokeWidth="3" strokeLinecap="square"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5, ease: EASE_OUT }}
                      />
                    </svg>
                    <p className="mt-8 font-display text-4xl font-semibold italic text-volt md:text-5xl">
                      Message received.
                    </p>
                    <p className="mt-4 max-w-md text-base font-light leading-relaxed text-muted">
                      Loud and clear. We reply within 48 hours — sooner if your opinion about the
                      seam is genuinely good.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="border border-white/15 bg-surface/60 p-8 md:p-14"
                  >
                    <p className="label-tag text-muted">WRITE TO THE HOUSE</p>

                    <div className="mt-10 grid gap-10 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="label-tag text-paper/70">NAME</label>
                        <input
                          id="c-name"
                          type="text"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Ada Lovelace"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "c-name-err" : undefined}
                          className={`mt-3 ${inputClass(errors.name)}`}
                        />
                        <p id="c-name-err" className="mt-2 min-h-[18px] text-[11px] tracking-[0.16em] text-volt">
                          {errors.name ? `▲ ${errors.name}` : ""}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="c-email" className="label-tag text-paper/70">EMAIL</label>
                        <input
                          id="c-email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="ada@future.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "c-email-err" : undefined}
                          className={`mt-3 ${inputClass(errors.email)}`}
                        />
                        <p id="c-email-err" className="mt-2 min-h-[18px] text-[11px] tracking-[0.16em] text-volt">
                          {errors.email ? `▲ ${errors.email}` : ""}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="label-tag text-paper/70">MESSAGE</label>
                      <textarea
                        id="c-message"
                        rows={5}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Say it loud…"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "c-message-err" : undefined}
                        className={`mt-3 resize-none ${inputClass(errors.message)}`}
                      />
                      <p id="c-message-err" className="mt-2 min-h-[18px] text-[11px] tracking-[0.16em] text-volt">
                        {errors.message ? `▲ ${errors.message}` : ""}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-8 w-full bg-volt py-5 text-[13px] font-semibold tracking-[0.34em] text-ink transition-all duration-300 hover:bg-paper disabled:opacity-60 sm:w-auto sm:px-14"
                    >
                      {status === "sending" ? "SENDING…" : "SEND —"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- oversized closing statement --- */}
        <div className="border-t border-white/10 px-5 py-20 text-center md:py-28">
          <Reveal>
            <p className="font-display text-[clamp(3rem,11vw,11rem)] font-semibold leading-[0.88]">
              THE FUTURE
              <br />
              <em className="italic text-volt">IS YOURS.</em>
            </p>
          </Reveal>
        </div>

        <Marquee
          items={["SAY IT LOUD", "HELLO@VOLTA.STUDIO", "PARIS — TOKYO", "THE FUTURE IS YOURS"]}
          className="border-t border-white/10 py-4"
          itemClassName="font-display text-3xl font-semibold italic text-outline md:text-5xl"
          separator="✳"
          separatorClassName="text-volt text-2xl"
          duration={32}
        />
      </main>
    </PageTransition>
  );
}
