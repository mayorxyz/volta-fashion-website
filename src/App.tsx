import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import Lookbook from "./pages/Lookbook";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ink text-paper">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
        className="sr-only z-[120] bg-volt px-5 py-3 text-[12px] font-semibold tracking-[0.24em] text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        SKIP TO CONTENT
      </a>

      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CollectionDetail />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* global typographic rhythm before the footer */}
      <Marquee
        items={["VOLTA", "FW25 — NEW SEASON", "THE FUTURE IS NOW", "PARIS — TOKYO", "EDITORIAL VOL.05"]}
        className="border-t border-white/10 bg-ink py-4"
        itemClassName="font-display text-3xl font-semibold italic text-outline md:text-5xl"
        separator="✳"
        separatorClassName="text-volt text-2xl"
        duration={34}
      />

      <Footer />

      {/* film grain over everything */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollToTop />
        <Shell />
      </HashRouter>
    </MotionConfig>
  );
}
