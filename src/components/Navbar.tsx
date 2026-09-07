import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, socials } from "../data/content";
import { EASE_IN_OUT, EASE_OUT } from "../lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const joinTheList = () => {
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "newsletter" } });
    }
  };

  const handleNavClick = (to: string) => {
    setOpen(false);
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const solid = scrolled && !open;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
        // CHANGED: Replaced top-0 and inline style with top-4 sm:top-6 for consistent breathing room
        className={`fixed inset-x-0 z-50 transition-all duration-500 ${
  solid ? "top-0" : "top-4 sm:top-1"
} ${
  solid
    ? "border-b border-white/10 bg-ink/75 py-2.5 backdrop-blur-md sm:py-3"
    : "bg-transparent py-4 sm:py-5 md:py-6"
}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-6 md:px-8">
          <Link
            to="/"
            onClick={() => handleNavClick("/")}
            className="shrink-0 font-body text-sm font-semibold tracking-[0.4em] text-paper sm:text-base md:text-lg"
            aria-label="VOLTA — home"
          >
            VOLTA<span className="text-volt">.</span>
          </Link>

          <nav
            className="hidden items-center gap-5 xl:flex 2xl:gap-8"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => handleNavClick(link.to)}
                className={({ isActive }) =>
                  `link-line whitespace-nowrap text-[11px] font-medium tracking-[0.28em] transition-colors duration-300 ${
                    isActive ? "text-volt" : "text-paper/80 hover:text-paper"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={joinTheList}
              className="hidden bg-volt px-4 py-2 text-[11px] font-semibold tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-paper xl:inline-block xl:px-5 xl:py-2.5"
            >
              JOIN
            </button>

            <button
              ref={closeButtonRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 sm:h-11 sm:w-11 xl:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3.5px]"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3.5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-ink/95 backdrop-blur-sm xl:hidden"
            onClick={() => setOpen(false)}
          >
            <nav
              className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 pb-6 pt-24 sm:gap-2 sm:px-7 sm:pt-28"
              style={{ paddingTop: "max(6rem, calc(env(safe-area-inset-top) + 4rem))" }}
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 + i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => handleNavClick(link.to)}
                    className={({ isActive }) =>
                      `group flex items-baseline gap-3 py-1.5 font-display text-[clamp(1.9rem,9vw,2.55rem)] font-semibold leading-[1.08] sm:gap-4 sm:py-2 sm:text-5xl sm:leading-tight ${
                        isActive ? "text-volt italic" : "text-paper"
                      }`
                    }
                  >
                    <span className="font-body text-[11px] tracking-[0.3em] text-muted">
                      0{i + 1}
                    </span>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.5 }}
                onClick={joinTheList}
                className="mt-6 w-fit bg-volt px-6 py-3 text-[12px] font-semibold tracking-[0.28em] text-ink"
              >
                JOIN THE LIST
              </motion.button>
            </nav>

            <div
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 sm:px-7 sm:py-5"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              <a
                href="mailto:hello@volta.studio"
                className="break-all text-[11px] tracking-[0.22em] text-muted"
              >
                HELLO@VOLTA.STUDIO
              </a>
              <div className="flex gap-4 sm:gap-5">
                {socials.slice(0, 3).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] tracking-[0.22em] text-muted transition-colors hover:text-volt"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}