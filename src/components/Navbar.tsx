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

  // Close the overlay whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll + Esc to close while the overlay is open.
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

  const solid = scrolled && !open;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-white/10 bg-ink/75 py-3 backdrop-blur-md"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-8">
          <Link
            to="/"
            className="font-body text-base font-semibold tracking-[0.4em] text-paper md:text-lg"
            aria-label="VOLTA — home"
          >
            VOLTA<span className="text-volt">.</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `link-line text-[11px] font-medium tracking-[0.28em] transition-colors duration-300 ${
                    isActive ? "text-volt" : "text-paper/80 hover:text-paper"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={joinTheList}
              className="hidden bg-volt px-5 py-2.5 text-[11px] font-semibold tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-paper lg:inline-block"
            >
              JOIN
            </button>

            <button
              ref={closeButtonRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center border border-white/20 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2 px-7 pt-20" aria-label="Mobile">
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
                    className={({ isActive }) =>
                      `group flex items-baseline gap-4 py-2 font-display text-5xl font-semibold leading-tight sm:text-6xl ${
                        isActive ? "text-volt italic" : "text-paper"
                      }`
                    }
                  >
                    <span className="text-[11px] font-body tracking-[0.3em] text-muted">
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex items-center justify-between border-t border-white/10 px-7 py-6"
            >
              <a href="mailto:hello@volta.studio" className="text-[11px] tracking-[0.22em] text-muted">
                HELLO@VOLTA.STUDIO
              </a>
              <div className="flex gap-5">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
