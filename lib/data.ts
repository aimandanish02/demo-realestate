export type ListingCategory = "For Sale" | "Airbnb" | "Rent";

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
  category: ListingCategory;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  cert: string;
  image: string;
  employeeOfMonth?: boolean;
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
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "New Listing",
    category: "For Sale",
  },
  {
    id: "seri-bukit",
    name: "Villa Seri Bukit",
    location: "Damansara Heights",
    price: "RM 8,750,000",
    beds: 6,
    baths: 7,
    sqft: "8,900",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "For Sale",
    category: "For Sale",
  },
  {
    id: "arte-loft",
    name: "Arte Loft 28",
    location: "Mont Kiara",
    price: "RM 680 / night",
    beds: 3,
    baths: 3,
    sqft: "2,450",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "New Listing",
    category: "Airbnb",
  },
  {
    id: "regent",
    name: "The Regent Penthouse",
    location: "Bangsar",
    price: "RM 18,000 / month",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "New Listing",
    category: "Rent",
  },
  {
    id: "casa-lumina",
    name: "Casa Lumina",
    location: "Kenny Hills",
    price: "RM 12,400,000",
    beds: 7,
    baths: 8,
    sqft: "11,300",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "For Sale",
    category: "For Sale",
  },
  {
    id: "kiara-suite",
    name: "Kiara Sky Suite",
    location: "Mont Kiara",
    price: "RM 450 / night",
    beds: 2,
    baths: 2,
    sqft: "1,180",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "New Listing",
    category: "Airbnb",
  },
  {
    id: "bangsar-studio",
    name: "Bangsar Garden Studio",
    location: "Bangsar",
    price: "RM 3,200 / month",
    beds: 1,
    baths: 1,
    sqft: "620",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=1500&fit=crop&auto=format&q=80",
    status: "New Listing",
    category: "Rent",
  },
];

export const PROCESS_SLIDES: ProcessSlide[] = [
  {
    index: "01",
    title: "Private consultation",
    body: "One conversation to understand your budget, timeline, and the life you want the home to serve. No listings pushed at you.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&h=900&fit=crop&auto=format&q=80",
  },
  {
    index: "02",
    title: "Curated shortlist",
    body: "Three to five properties, each vetted for title, tenure, and resale trajectory. Half are usually off-market.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&h=900&fit=crop&auto=format&q=80",
  },
  {
    index: "03",
    title: "Negotiation and diligence",
    body: "I negotiate against comparable transactions, not asking prices. Lawyers and bankers are briefed before you commit.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=900&fit=crop&auto=format&q=80",
  },
  {
    index: "04",
    title: "Keys in hand",
    body: "Vacant possession checked, defects documented, utilities transferred. You move in, not into a to-do list.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&h=900&fit=crop&auto=format&q=80",
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

export const TEAM: TeamMember[] = [
  {
    id: "adrian-yeoh",
    name: "Adrian Yeoh",
    role: "Luxury Property Advisor",
    cert: "Certified Real Estate Negotiator (REN 28471)",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&auto=format&q=80",
    employeeOfMonth: true,
  },
  {
    id: "melissa-ong",
    name: "Melissa Ong",
    role: "Senior Property Consultant",
    cert: "Certified International Property Specialist (CIPS)",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: "farid-hassan",
    name: "Farid Hassan",
    role: "Rentals & Airbnb Specialist",
    cert: "Registered Estate Agent (REA 5390)",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=750&fit=crop&auto=format&q=80",
  },
  {
    id: "grace-lim",
    name: "Grace Lim",
    role: "Client Relations Manager",
    cert: "Certified Negotiator, Board of Valuers (BOVAEP)",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&auto=format&q=80",
  },
];

export const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    name: "KLCC",
    blurb: "Skyline penthouses and branded residences at the city's core.",
    listings: 14,
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop&auto=format&q=80",
    span: "wide",
  },
  {
    name: "Bangsar",
    blurb: "Old trees, new money, walkable everything.",
    listings: 9,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=1000&fit=crop&auto=format&q=80",
    span: "tall",
  },
  {
    name: "Damansara Heights",
    blurb: "The quiet establishment address.",
    listings: 7,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop&auto=format&q=80",
    span: "standard",
  },
  {
    name: "Mont Kiara",
    blurb: "Expat-favourite condos with serious rental yield.",
    listings: 12,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop&auto=format&q=80",
    span: "standard",
  },
  {
    name: "Kenny Hills",
    blurb: "Estates behind gates, minutes from everything.",
    listings: 4,
    image:
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=1200&h=800&fit=crop&auto=format&q=80",
    span: "wide",
  },
];

export const NAV_LINKS = [
  { label: "Listings", href: "#listings" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Neighbourhoods", href: "#neighbourhoods" },
];
