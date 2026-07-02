export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  status: "For Sale" | "New Listing" | "Under Offer";
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ProcessSlide {
  index: string;
  title: string;
  body: string;
  image: string;
}

export interface Neighbourhood {
  name: string;
  blurb: string;
  listings: number;
  image: string;
  span: "wide" | "tall" | "standard";
}

export const AGENT = {
  name: "Adrian Yeoh",
  title: "Luxury Property Advisor, Kuala Lumpur",
  phone: "+60 12 384 7261",
  email: "hello@adrianyeoh.my",
  consultCta: "Book a consultation",
};

export const STATS = [
  { value: 486, suffix: "M", prefix: "RM ", label: "Total sales volume" },
  { value: 214, suffix: "", prefix: "", label: "Homes matched" },
  { value: 11, suffix: "", prefix: "", label: "Years in prime KL" },
  { value: 38, suffix: "", prefix: "", label: "Avg. days to close" },
];

export const PROPERTIES: Property[] = [
  {
    id: "estella",
    name: "The Estella Residence",
    location: "KLCC",
    price: "RM 4,280,000",
    beds: 4,
    baths: 5,
    sqft: "4,120",
    image: "https://picsum.photos/seed/klcc-skyline-penthouse/1200/1500",
    status: "New Listing",
  },
  {
    id: "seri-bukit",
    name: "Villa Seri Bukit",
    location: "Damansara Heights",
    price: "RM 8,750,000",
    beds: 6,
    baths: 7,
    sqft: "8,900",
    image: "https://picsum.photos/seed/damansara-villa-garden/1200/1500",
    status: "For Sale",
  },
  {
    id: "arte-loft",
    name: "Arte Loft 28",
    location: "Mont Kiara",
    price: "RM 2,380,000",
    beds: 3,
    baths: 3,
    sqft: "2,450",
    image: "https://picsum.photos/seed/montkiara-loft-interior/1200/1500",
    status: "For Sale",
  },
  {
    id: "regent",
    name: "The Regent Penthouse",
    location: "Bangsar",
    price: "RM 6,500,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    image: "https://picsum.photos/seed/bangsar-penthouse-view/1200/1500",
    status: "Under Offer",
  },
  {
    id: "casa-lumina",
    name: "Casa Lumina",
    location: "Kenny Hills",
    price: "RM 12,400,000",
    beds: 7,
    baths: 8,
    sqft: "11,300",
    image: "https://picsum.photos/seed/kennyhills-estate-pool/1200/1500",
    status: "For Sale",
  },
];

export const PROCESS_SLIDES: ProcessSlide[] = [
  {
    index: "01",
    title: "Private consultation",
    body: "One conversation to understand your budget, timeline, and the life you want the home to serve. No listings pushed at you.",
    image: "https://picsum.photos/seed/consultation-lounge/1400/900",
  },
  {
    index: "02",
    title: "Curated shortlist",
    body: "Three to five properties, each vetted for title, tenure, and resale trajectory. Half are usually off-market.",
    image: "https://picsum.photos/seed/shortlist-interiors/1400/900",
  },
  {
    index: "03",
    title: "Negotiation and diligence",
    body: "I negotiate against comparable transactions, not asking prices. Lawyers and bankers are briefed before you commit.",
    image: "https://picsum.photos/seed/negotiation-table/1400/900",
  },
  {
    index: "04",
    title: "Keys in hand",
    body: "Vacant possession checked, defects documented, utilities transferred. You move in, not into a to-do list.",
    image: "https://picsum.photos/seed/keys-handover-door/1400/900",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Adrian sold our Bangsar home in 31 days at 4% above the last comparable. Every viewing was qualified.",
    name: "Melissa Tan",
    role: "Founder, Halcyon Studio",
  },
  {
    quote:
      "We relocated from Singapore knowing nothing about KL tenure rules. He handled everything, including the bank.",
    name: "Daniel & Priya Nair",
    role: "Relocated to Mont Kiara",
  },
  {
    quote:
      "Two of the three units he shortlisted were never publicly listed. That access is why I keep coming back.",
    name: "Jonathan Lim",
    role: "Private Investor",
  },
];

export const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    name: "KLCC",
    blurb: "Skyline penthouses and branded residences at the city's core.",
    listings: 14,
    image: "https://picsum.photos/seed/klcc-towers-night/1200/800",
    span: "wide",
  },
  {
    name: "Bangsar",
    blurb: "Old trees, new money, walkable everything.",
    listings: 9,
    image: "https://picsum.photos/seed/bangsar-street-cafe/800/1000",
    span: "tall",
  },
  {
    name: "Damansara Heights",
    blurb: "The quiet establishment address.",
    listings: 7,
    image: "https://picsum.photos/seed/damansara-hills-homes/800/600",
    span: "standard",
  },
  {
    name: "Mont Kiara",
    blurb: "Expat-favourite condos with serious rental yield.",
    listings: 12,
    image: "https://picsum.photos/seed/montkiara-condo-pool/800/600",
    span: "standard",
  },
  {
    name: "Kenny Hills",
    blurb: "Estates behind gates, minutes from everything.",
    listings: 4,
    image: "https://picsum.photos/seed/kennyhills-gated-estate/1200/800",
    span: "wide",
  },
];

export const NAV_LINKS = [
  { label: "Listings", href: "#listings" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Neighbourhoods", href: "#neighbourhoods" },
];
