import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import EditorialHero from "../components/EditorialHero";
import LookbookGrid from "../components/LookbookGrid";
import NewsletterCTA from "../components/NewsletterCTA";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Magnetic from "../components/Magnetic";
import EditorialImage from "../components/EditorialImage";
import { images } from "../data/content";
import { usePageTitle } from "../lib/motion";

export default function Home() {
  usePageTitle("VOLTA — The Future Is Now · Fashion Editorial");
  const location = useLocation();

  // Navbar "JOIN" from another route lands here and scrolls straight to the list.
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = window.setTimeout(() => {
        document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" });
      }, 450);
      return () => window.clearTimeout(id);
    }
  }, [location.state]);

  return (
    <>
      <EditorialHero />

      {/* electric rhythm strip */}
      <Marquee
        items={[
          "THE FUTURE IS BOLD",
          "THE FUTURE IS FEARLESS",
          "THE FUTURE IS YOURS",
          "THE FUTURE IS RAW",
          "THE FUTURE IS NOW",
        ]}
        className="border-y border-ink bg-volt py-3 text-ink"
        itemClassName="font-body text-sm font-bold tracking-[0.24em] md:text-base"
        separator="✳"
        separatorClassName="text-ink/70"
        duration={26}
      />

      {/* (01) — intro statement: slow the experience down */}
      <section className="bg-paper py-24 text-ink md:py-40" aria-labelledby="manifesto-heading">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal>
            <p className="label-tag text-ink/45">(01) — MANIFESTO</p>
          </Reveal>

          <h2
            id="manifesto-heading"
            className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.3vw,5.6rem)] font-semibold leading-[1.04]"
          >
            <Reveal delay={0.08}>
              <span className="block">Fashion is not decoration.</span>
            </Reveal>
            <Reveal delay={0.18}>
              <span className="block">
                It is a{" "}
                <span className="inline-block -rotate-1 bg-volt px-3 italic">declaration</span> —
              </span>
            </Reveal>
            <Reveal delay={0.28}>
              <span className="block">worn at full volume.</span>
            </Reveal>
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:col-start-8" delay={0.2}>
              <p className="text-lg font-light leading-relaxed text-ink/70 md:text-xl">
                VOLTA is an independent house building wardrobes for people who move first. Cut
                with intent. Sewn with discipline. Worn without apology.
              </p>
              <p className="label-tag mt-8 text-ink/45">
                EST. 2019 — TWO CITIES, TWO STORIES A YEAR
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* (02) — featured lookbook */}
      <section className="bg-ink py-24 text-paper md:py-36" aria-labelledby="lookbook-heading">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <Reveal>
                <p className="label-tag text-muted">(02) — SELECTED LOOKS</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 id="lookbook-heading" className="mt-5 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-semibold leading-none">
                  The <em className="italic text-volt">Lookbook</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.16} className="hidden md:block">
              <Link
                to="/lookbook"
                className="link-line text-[12px] font-medium tracking-[0.3em] text-paper/80 hover:text-volt"
              >
                ENTER LOOKBOOK ↗
              </Link>
            </Reveal>
          </div>

          <LookbookGrid />

          <Reveal className="mt-12 text-center md:hidden">
            <Link
              to="/lookbook"
              className="inline-block border border-white/25 px-8 py-4 text-[12px] font-medium tracking-[0.3em] text-paper transition-colors hover:border-volt hover:text-volt"
            >
              ENTER LOOKBOOK ↗
            </Link>
          </Reveal>
        </div>
      </section>

      {/* (03) — collection teaser: image and text enter in opposite directions */}
      <section className="border-t border-white/10 bg-surface text-paper" aria-labelledby="teaser-heading">
        <div className="grid md:grid-cols-2">
          <Reveal y={56} className="md:order-1">
            <Link to="/collections/future-study" className="block" aria-label="Enter Future Study capsule">
              <EditorialImage
                src={images.look01}
                alt="The electric yellow signal coat — Future Study capsule"
                className="aspect-[4/5] w-full md:aspect-auto md:h-full md:min-h-[640px]"
              >
                <span className="absolute left-4 top-4 z-10 bg-volt px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.28em] text-ink">
                  CAPSULE — 001
                </span>
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="label-tag p-5 text-volt md:p-7">VIEW COLLECTION ↗</span>
                </span>
              </EditorialImage>
            </Link>
          </Reveal>

          <Reveal y={-56} className="flex flex-col justify-center px-5 py-20 md:order-2 md:px-16 md:py-28 lg:px-24">
            <p className="label-tag text-muted">(03) — NEW CAPSULE</p>
            <h2 id="teaser-heading" className="mt-6 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.98]">
              FUTURE
              <br />
              <em className="italic text-volt">STUDY</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">
              One color. One cut. Zero compromise. Five pieces in signal yellow for people who
              refuse to blend into the background.
            </p>

            <Magnetic className="mt-12">
              <Link
                to="/collections/future-study"
                className="group inline-flex items-center gap-4 text-[13px] font-semibold tracking-[0.3em] text-volt"
              >
                <span className="link-line">ENTER THE STUDY</span>
                <span className="flex h-10 w-10 items-center justify-center border border-volt/50 transition-colors duration-300 group-hover:bg-volt group-hover:text-ink" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 12h15m-6-6l6 6-6 6" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* (05) — newsletter */}
      <NewsletterCTA />
    </>
  );
}
