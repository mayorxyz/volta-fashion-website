import type { ReactNode } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  objectPosition?: string;
  children?: ReactNode;
}

/**
 * The house frame: overflow-hidden with a slow 1.06 hover swell.
 * Caption / label overlays are passed as children.
 */
export default function EditorialImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  objectPosition,
  children,
}: EditorialImageProps) {
  return (
    <figure className={`group relative overflow-hidden bg-surface ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        style={objectPosition ? { objectPosition } : undefined}
        className={`h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${imgClassName}`}
      />
      {children}
    </figure>
  );
}
