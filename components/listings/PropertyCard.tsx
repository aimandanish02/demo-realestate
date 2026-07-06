import Image from "next/image";
import { Bed, Bathtub, Ruler, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ListingCategory, Property } from "@/lib/data";

type Props = {
  property: Property;
  priority?: boolean;
};

const CATEGORY_STYLES: Record<ListingCategory, string> = {
  "For Sale": "bg-accent text-background",
  Airbnb: "bg-[#FF5A5F] text-white",
  Rent: "bg-foreground text-background",
};

export function PropertyCard({ property, priority }: Props) {
  return (
    <article className="group relative h-[64vh] w-[82vw] shrink-0 overflow-hidden rounded-3xl border border-line bg-surface md:h-[68vh] md:w-[30rem]">
      <Image
        src={property.image}
        alt={`${property.name}, ${property.location}`}
        fill
        sizes="(max-width: 768px) 82vw, 480px"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span
          className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide ${CATEGORY_STYLES[property.category]}`}
        >
          {property.category}
        </span>
        <span className="rounded-full border border-line bg-background/60 px-4 py-1.5 text-xs tracking-wide text-foreground backdrop-blur-md">
          {property.status}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="text-sm text-muted">{property.location}</p>
        <div className="mt-1 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-tight">
            {property.name}
          </h3>
          <span className="grid size-11 shrink-0 translate-y-2 place-items-center rounded-full bg-accent text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight weight="bold" className="size-5" />
          </span>
        </div>
        <p className="mt-2 font-display text-lg text-accent">{property.price}</p>

        {/* spec row slides up on hover */}
        <div className="mt-4 flex gap-5 overflow-hidden text-sm text-muted">
          <span className="flex items-center gap-1.5 transition-transform duration-500 group-hover:-translate-y-0.5">
            <Bed className="size-4 text-accent" /> {property.beds}
          </span>
          <span className="flex items-center gap-1.5 transition-transform duration-500 delay-75 group-hover:-translate-y-0.5">
            <Bathtub className="size-4 text-accent" /> {property.baths}
          </span>
          <span className="flex items-center gap-1.5 transition-transform duration-500 delay-150 group-hover:-translate-y-0.5">
            <Ruler className="size-4 text-accent" /> {property.sqft} sqft
          </span>
        </div>
      </div>
    </article>
  );
}
