import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import EditorialImage from "./EditorialImage";
import { featuredLooks } from "../data/content";

/**
 * Home's featured lookbook — one dominant frame spanning two rows,
 * four satellites around it. Staggered reveal, hover swell, sliding label.
 */
export default function LookbookGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
      {featuredLooks.map((look, i) => {
        const dominant = i === 0;
        return (
          <Reveal
            key={look.title}
            delay={i * 0.09}
            className={
              dominant
                ? "col-span-2 aspect-[4/5] md:col-span-6 md:row-span-2 md:aspect-auto md:h-full"
                : "col-span-1 aspect-[3/4] md:col-span-3"
            }
          >
            <Link to="/lookbook" className="block h-full" aria-label={`${look.title} — enter lookbook`}>
              <EditorialImage src={look.image} alt={look.alt} className="h-full w-full">
                {/* index chip */}
                <span className="absolute left-3 top-3 z-10 bg-ink/75 px-2.5 py-1.5 text-[10px] font-medium tracking-[0.28em] text-paper/90">
                  0{i + 1}
                </span>

                {/* hover veil + rising label */}
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex w-full items-center justify-between p-4 translate-y-3 transition-transform duration-500 group-hover:translate-y-0 md:p-5">
                    <span className="label-tag text-volt">VIEW FRAME ↗</span>
                    <span className="label-tag hidden text-paper/70 sm:block">{look.meta}</span>
                  </span>
                </span>
              </EditorialImage>

              {/* persistent caption */}
              <span className="mt-2.5 flex flex-col items-start gap-1 sm:mt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                <span className="font-display text-base font-semibold italic text-paper md:text-lg">
                  {look.title}
                </span>
                <span className="label-tag shrink-0 text-[10px] text-muted">{look.meta}</span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
