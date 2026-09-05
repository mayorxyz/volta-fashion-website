interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
  separator?: string;
  duration?: number;
}

/** Endless kinetic strip — the site's repeating typographic rhythm. */
export default function Marquee({
  items,
  className = "",
  itemClassName = "",
  separatorClassName = "text-volt",
  separator = "///",
  duration = 30,
}: MarqueeProps) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className={`px-6 md:px-10 ${itemClassName}`}>{item}</span>
          <span className={`px-2 ${separatorClassName}`} aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="animate-marquee flex w-max" style={{ animationDuration: `${duration}s` }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
