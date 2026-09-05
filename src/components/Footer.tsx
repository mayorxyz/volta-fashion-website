import { Link } from "react-router-dom";
import { navLinks, socials } from "../data/content";
import { useClock } from "../lib/motion";

export default function Footer() {
  const time = useClock();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-paper">
      {/* quiet oversized wordmark */}
      <div className="pointer-events-none select-none px-2 pt-6" aria-hidden="true">
        <p className="text-center font-display text-[clamp(5rem,19vw,21rem)] font-semibold leading-[0.78] text-[#141414]">
          VOLTA<span className="text-volt/25">.</span>
        </p>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 pb-14 pt-4 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <p className="font-body text-sm font-semibold tracking-[0.4em]">
            VOLTA<span className="text-volt">.</span>
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Independent fashion house publishing two stories a year. Cut with intent, worn without
            apology.
          </p>
          <p className="label-tag mt-6 text-muted">EST. 2019 — PARIS / TOKYO</p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="label-tag text-muted">EXPLORE</p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-line text-[12px] tracking-[0.24em] text-paper/80 transition-colors hover:text-volt"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2">
          <p className="label-tag text-muted">ELSEWHERE</p>
          <ul className="mt-5 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[12px] tracking-[0.24em] text-paper/80 transition-colors hover:text-volt"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="label-tag text-muted">CONTACT</p>
          <ul className="mt-5 space-y-3 text-[12px] tracking-[0.24em] text-paper/80">
            <li>
              <a href="mailto:hello@volta.studio" className="link-line hover:text-volt">
                HELLO@VOLTA.STUDIO
              </a>
            </li>
            <li>
              <a href="mailto:press@volta.studio" className="link-line hover:text-volt">
                PRESS@VOLTA.STUDIO
              </a>
            </li>
            <li className="pt-2 text-muted">14 RUE DE LA LUNE, PARIS</li>
            <li className="text-muted">2-7-1 AOYAMA, TOKYO</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-3 px-5 py-5 text-[11px] tracking-[0.22em] text-muted sm:flex-row sm:items-center md:px-8">
          <p>© 2026 VOLTA — ALL RIGHTS RESERVED</p>
          <p className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-dot bg-volt" aria-hidden="true" />
            LOCAL — {time}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="link-line text-paper/70 transition-colors hover:text-volt"
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
