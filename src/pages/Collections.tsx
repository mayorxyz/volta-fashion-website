import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import CollectionCard from "../components/CollectionCard";
import Reveal, { MaskReveal } from "../components/Reveal";
import { collections } from "../data/content";
import { usePageTitle } from "../lib/motion";

export default function Collections() {
  usePageTitle("Collections — VOLTA");

  return (
    <PageTransition>
      <main id="main" className="bg-ink pb-28 pt-32 text-paper md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8">
          <Reveal>
            <p className="label-tag flex items-center gap-3 text-muted">
              <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
              (INDEX) — ALL STORIES
            </p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(3.2rem,11vw,10rem)] font-semibold leading-[0.9]">
            <MaskReveal lines={["COLLEC-", "TIONS"]} />
          </h1>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-8">
            <Reveal delay={0.15}>
              <p className="max-w-md text-base font-light leading-relaxed text-muted">
                Every collection is a story with a spine — a single idea cut into cloth. Pick one.
                Wear it loud.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="label-tag text-muted">05 STORIES — FW24 → SS26</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:gap-x-10">
            {collections.map((collection, i) => (
              <Reveal key={collection.slug} delay={(i % 2) * 0.12} className={i % 2 === 1 ? "lg:mt-28" : ""}>
                <CollectionCard collection={collection} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-28 border-t border-white/10 pt-14 text-center md:mt-36">
            <p className="font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-semibold italic leading-tight text-paper/90">
              Between the stories, there are the frames.
            </p>
            <Link
              to="/lookbook"
              className="link-line mt-6 inline-block text-[12px] font-medium tracking-[0.3em] text-volt"
            >
              ENTER THE LOOKBOOK ↗
            </Link>
          </Reveal>
        </div>
      </main>
    </PageTransition>
  );
}
