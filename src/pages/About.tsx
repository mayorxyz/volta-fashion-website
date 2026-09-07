import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import EditorialImage from "../components/EditorialImage";
import Reveal, { MaskReveal } from "../components/Reveal";
import { images } from "../data/content";
import { usePageTitle } from "../lib/motion";

const principles = [
  {
    n: "01",
    title: "INTENTION OVER TREND",
    body: "We design for the person you are becoming, not the feed you are scrolling. Every line has a reason; the rest is deleted.",
  },
  {
    n: "02",
    title: "CUT BEFORE DECORATION",
    body: "If a silhouette fails in shadow, no surface detail will save it. We argue about armholes so you never have to.",
  },
  {
    n: "03",
    title: "FEWER, BETTER",
    body: "Two stories a year. Every piece earns its place on the rail — or it doesn't ship. The archive stays hungry.",
  },
  {
    n: "04",
    title: "WEAR IT LOUD",
    body: "Clothes are a statement. We simply make sure the grammar is perfect before you say it in public.",
  },
];

export default function About() {
  usePageTitle("About — VOLTA");

 return (
  <PageTransition>
    <main id="main" className="bg-ink pb-28 text-paper">
      {/* --- manifesto --- */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="flex min-h-[calc(100svh-9rem)] flex-col justify-center pt-28 sm:min-h-[calc(100svh-7rem)] md:pt-40">
          <Reveal immediate>
            <p className="label-tag flex items-center gap-3 text-muted">
              <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
              (01) — WHO WE ARE
            </p>
          </Reveal>

          <h1
            className="mt-6 max-w-6xl font-display font-semibold leading-[0.98]
              text-[clamp(2.2rem,9.5vw,8rem)]
              sm:mt-8 sm:text-[clamp(2.8rem,8.5vw,8rem)]"
          >
            <MaskReveal
              lines={["WE DON'T FOLLOW", "SEASONS. WE SET", "THE TEMPERATURE."]}
              immediate
            />
          </h1>

          {/* left column, stacked below headline */}
          <Reveal
            className="mt-10 flex max-w-lg flex-col gap-8 sm:mt-14"
            delay={0.2}
            immediate
          >
            <p className="text-balance font-light leading-relaxed text-muted
              text-base sm:text-lg md:text-xl"
            >
              VOLTA began in 2019 as two pattern cutters, one borrowed studio, and a
              shared allergy to beige. Seven years later the house still runs on the
              same current: high-contrast ideas, industrial discipline, and a yellow
              so electric it has its own circuit breaker.
            </p>

            <div className="flex flex-col gap-2 label-tag text-muted">
              <p>ATELIER — PARIS, 07:40</p>
              <p>FITTING — TOKYO, 15:12</p>
            </div>

            <p className="label-tag flex items-center gap-3 text-muted">
              <span className="inline-block h-2 w-2 bg-volt" aria-hidden="true" />
              (02) — TWO
            </p>
          </Reveal>
        </div>
      </div>

        {/* --- studio split --- */}
        <section className="mt-16 border-t border-white/10 pt-12 sm:mt-24 sm:pt-16 md:mt-32 md:pt-20" aria-label="The studio">
          <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-12 md:gap-12 md:px-8">
            <Reveal className="md:col-span-4" y={48}>
              <EditorialImage
                src={images.look03}
                alt="Hands setting a pleat in the Paris atelier"
                className="aspect-square w-full"
              >
                <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-2 text-[10px] tracking-[0.26em] text-paper/85">
                  ATELIER — PARIS, 07:40
                </span>
              </EditorialImage>
            </Reveal>
            <Reveal className="md:col-span-4 md:mt-24" y={48}>
              <EditorialImage
                src={images.look04}
                alt="Model in a wide stance under hard studio light"
                className="aspect-[4/5] w-full"
              >
                <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-2 text-[10px] tracking-[0.26em] text-paper/85">
                  FITTING — TOKYO, 15:12
                </span>
              </EditorialImage>
            </Reveal>
            <Reveal className="flex flex-col justify-center sm:col-span-2 md:col-span-4" delay={0.15} y={-48}>
              <p className="label-tag text-muted">(02) — TWO ROOMS, TWO CITIES</p>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:mt-6 sm:text-3xl md:text-4xl">
                Pattern cutting in Paris. Fabric research in Tokyo. Arguments everywhere.
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted sm:mt-6 sm:text-base">
                The Paris room is where silhouettes are drafted, torn apart, and drafted again. The
                Tokyo room is where cloth gets interrogated — weight, memory, how it falls after
                the third wear. The best idea wins, regardless of time zone.
              </p>
            </Reveal>
          </div>
        </section>

        {/* --- principles --- */}
        <section className="mt-16 sm:mt-24 md:mt-36" aria-labelledby="principles-heading">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal>
                  <p className="label-tag text-muted">(03) — HOUSE RULES</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 id="principles-heading" className="mt-4 font-display text-[clamp(2rem,5vw,4.2rem)] font-semibold leading-none sm:mt-5">
                    The <em className="italic text-volt">Principles</em>
                  </h2>
                </Reveal>
              </div>
            </div>

            <ul className="mt-8 sm:mt-14">
              {principles.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07}>
                  <li className="group grid gap-2 border-t border-white/10 py-6 transition-colors duration-300 last:border-b hover:bg-surface/60 sm:gap-3 sm:py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10">
                    <span className="font-display text-xl italic text-muted transition-colors duration-300 group-hover:text-volt sm:text-2xl md:col-span-1 md:text-3xl">
                      {p.n}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-wide transition-all duration-300 group-hover:translate-x-2 group-hover:text-volt sm:text-2xl md:col-span-4 md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="max-w-xl text-sm font-light leading-relaxed text-muted sm:text-base md:col-span-7">
                      {p.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* --- closing statement --- */}
        <Reveal className="mx-auto max-w-[1600px] px-5 pt-20 text-center sm:pt-28 md:px-8 md:pt-40">
          <p className="font-display text-[clamp(1.9rem,5vw,4.2rem)] font-semibold italic leading-tight text-paper/90">
            The house is quiet. <span className="text-volt">The clothes are not.</span>
          </p>
          <Link
            to="/collections"
            className="link-line mt-6 inline-block text-[12px] font-semibold tracking-[0.3em] text-volt sm:mt-8"
          >
            READ THE STORIES →
          </Link>
        </Reveal>
      </main>
    </PageTransition>
  );
}
