import { Hero } from "@/components/hero/Hero";
import { LocationsMarquee } from "@/components/marquee/LocationsMarquee";
import { FeaturedListings } from "@/components/listings/FeaturedListings";
import { About } from "@/components/about/About";
import { ProcessSlides } from "@/components/process/ProcessSlides";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { NeighbourhoodGrid } from "@/components/neighbourhoods/NeighbourhoodGrid";
import { ContactCta } from "@/components/contact/ContactCta";

export default function Home() {
  return (
    <main>
      <Hero />
      <LocationsMarquee />
      <FeaturedListings />
      <About />
      <ProcessSlides />
      <Testimonials />
      <NeighbourhoodGrid />
      <ContactCta />
    </main>
  );
}
