import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import EditorialImage from "../components/EditorialImage";
import Reveal, { MaskReveal } from "../components/Reveal";
import { collections } from "../data/content";
import { EASE_OUT, usePageTitle } from "../lib/motion";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = collections.findIndex((c) => c.slug === slug);
  const collection = index >= 0 ? collections[index] : undefined;

  usePageTitle(collection ? `${collection.title} — VOLTA` : "Collections — VOLTA");

  if (!collection) return <Navigate to="/collections" replace />;

  const next = collections[(index + 1) % collections.length];
  const [full, splitA, splitB] = collection.editorial;

  return (
    <PageTransition>
      <main id="main" className="bg-ink text-paper">
        {/* --- campaign hero --- */}
        <section className="relative h-[82svh] min-h-[560px] overflow-hidden" aria-label={`${collection.title} campaign`}>
          <motion.img
            src={collection.image}
            alt={collection.alt}
            loading="eager"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" aria-hidden="true" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-14 md:px-8 md:pb-20">
            <div className="mx-auto max-w-[1600px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
                className="label-tag mb-4 text-paper/75"
              >
                STORY {collection.index} — {collection.season}
              </motion.p>
              <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9]">
                <MaskReveal lines={[collection.title]} delay={0.55} />
              </h1>
            </div>
          </div>

          <div className="absolute right-5 top-28 md:right-8 md:top-32">
            <Link
              to="/collections"
              className="label-tag link-line text-paper/70 hover:text-volt"
            >
              ← ALL STORIES
            </Link>
          </div>
        </section>

        {/* --- manifesto --- */}
        <section className="border-t border-white/10 py-24 md:py-32" aria-labelledby="collection-manifesto">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-12 md:px-8">
            <Reveal className="md:col-span-3">
              <p className="label-tag text-muted">(01) — MANIFESTO</p>
            </Reveal>
            <div className="md:col-span-9">
              <h2
                id="collection-manifesto"
                className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.4rem)] font-semibold italic leading-[1.05] text-volt"
              >
                <MaskReveal lines={[`“${collection.statement}”`]} />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-2xl text-base font-light leading-relaxed text-muted md:text-lg">
                  {collection.description}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- editorial sequence: full → split → split (reversed) --- */}
        <section className="pb-24 md:pb-32" aria-label="Editorial frames">
          <div className="mx-auto max-w-[1600px] space-y-16 px-5 md:space-y-24 md:px-8">
            <Reveal>
              <EditorialImage src={full.src} alt={full.alt} className="aspect-[16/9] w-full md:aspect-[21/9]">
                <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-2 text-[10px] tracking-[0.26em] text-paper/85">
                  {full.caption}
                </span>
              </EditorialImage>
            </Reveal>

            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className="md:col-span-7" y={48}>
                <EditorialImage src={splitA.src} alt={splitA.alt} className="aspect-[4/5] w-full">
                  <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-2 text-[10px] tracking-[0.26em] text-paper/85">
                    {splitA.caption}
                  </span>
                </EditorialImage>
              </Reveal>
              <Reveal className="md:col-span-5" y={-48}>
                <p className="label-tag text-muted">CUTTING ROOM NOTE</p>
                <p className="mt-6 font-display text-2xl font-semibold italic leading-snug text-paper md:text-3xl">
                  “A silhouette should survive its own shadow. If it reads in black on black, it
                  reads anywhere.”
                </p>
                <p className="label-tag mt-6 text-muted">— STUDIO VOLTA, PARIS</p>
              </Reveal>
            </div>

            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className="order-2 md:order-1 md:col-span-5" y={-48}>
                <p className="label-tag text-muted">ON LOCATION</p>
                <p className="mt-6 font-display text-2xl font-semibold italic leading-snug text-paper md:text-3xl">
                  “We shoot concrete because concrete doesn't flatter. Neither do we.”
                </p>
                <p className="label-tag mt-6 text-muted">— PHOTO UNIT, TOKYO</p>
              </Reveal>
              <Reveal className="order-1 md:order-2 md:col-span-7" y={48}>
                <EditorialImage src={splitB.src} alt={splitB.alt} className="aspect-[4/5] w-full md:aspect-[16/10]">
                  <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-2 text-[10px] tracking-[0.26em] text-paper/85">
                    {splitB.caption}
                  </span>
                </EditorialImage>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- selected pieces --- */}
        <section className="border-t border-white/10 py-24 md:py-32" aria-labelledby="pieces-heading">
          <div className="mx-auto max-w-[1600px] px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal>
                  <p className="label-tag text-muted">(02) — SELECTED PIECES</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 id="pieces-heading" className="mt-5 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-none">
                    The <em className="italic text-volt">Pieces</em>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.16}>
                <p className="label-tag text-muted">{collection.pieces.length} PIECES — MADE IN LIMITED RUNS</p>
              </Reveal>
            </div>

            <ul className="mt-14">
              {collection.pieces.map((piece, i) => (
                <Reveal key={piece.name} delay={i * 0.06}>
                  <li className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-white/10 py-6 transition-colors duration-300 last:border-b hover:bg-surface/60 sm:grid-cols-[64px_1fr_auto_auto] sm:gap-x-8 md:py-7">
                    <span className="font-display text-xl italic text-muted transition-colors duration-300 group-hover:text-volt md:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-wide text-paper transition-all duration-300 group-hover:translate-x-2 group-hover:text-volt md:text-4xl">
                      {piece.name}
                    </span>
                    <span className="label-tag col-start-2 mt-1 text-[10px] text-muted sm:col-start-auto sm:mt-0">
                      {piece.fabric}
                    </span>
                    <span className="hidden text-volt opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block sm:-translate-x-2" aria-hidden="true">
                      →
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-10">
              <a
                href="mailto:hello@volta.studio"
                className="link-line text-[12px] font-medium tracking-[0.28em] text-paper/70 hover:text-volt"
              >
                ENQUIRE ABOUT A PIECE →
              </a>
            </Reveal>
          </div>
        </section>

        {/* --- next story --- */}
        <section className="border-t border-white/10" aria-label="Next collection">
          <Link to={`/collections/${next.slug}`} className="group grid items-center gap-8 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
            <div className="md:col-span-7">
              <p className="label-tag text-muted">NEXT STORY — {next.season}</p>
              <p className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] text-paper transition-all duration-500 group-hover:translate-x-3 group-hover:text-volt">
                {next.title}
              </p>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
                {next.statement}
              </p>
              <span className="link-line mt-8 inline-block text-[12px] font-semibold tracking-[0.3em] text-volt">
                ENTER — {next.title} →
              </span>
            </div>
            <div className="md:col-span-5">
              <EditorialImage src={next.image} alt={next.alt} className="aspect-[16/10] w-full" />
            </div>
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
