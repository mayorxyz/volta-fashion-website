import { Link } from "react-router-dom";
import EditorialImage from "./EditorialImage";
import type { Collection } from "../data/content";

interface CollectionCardProps {
  collection: Collection;
  offset?: boolean;
}

/** Magazine-cover card: dominant photography, small metadata, directional cue. */
export default function CollectionCard({ collection, offset = false }: CollectionCardProps) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className={`group block ${offset ? "lg:mt-28" : ""}`}
      aria-label={`${collection.title} — ${collection.season}`}
    >
      <EditorialImage src={collection.image} alt={collection.alt} className="aspect-[4/5] w-full">
        <span className="absolute left-4 top-4 z-10 flex items-center gap-3">
          <span className="bg-ink/75 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.28em] text-paper/90">
            {collection.season}
          </span>
        </span>

        {/* directional cue */}
        <span className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-white/40 text-paper opacity-0 transition-all duration-500 group-hover:bg-volt group-hover:text-ink group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="square" />
          </svg>
        </span>

        <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-5 pt-16 md:p-7">
          <span className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-none text-paper transition-transform duration-500 group-hover:translate-x-2">
            {collection.title}
          </span>
          <span className="mt-3 block h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-500 group-hover:scale-x-100" />
        </span>
      </EditorialImage>

      <span className="mt-4 flex items-baseline justify-between">
        <span className="label-tag text-muted">STORY {collection.index} / 05</span>
        <span className="link-line text-[11px] font-medium tracking-[0.26em] text-paper/80 group-hover:text-volt">
          ENTER →
        </span>
      </span>
    </Link>
  );
}
