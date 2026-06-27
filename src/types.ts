export interface SafariPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  nights: number;
  priceFrom: string;
  description: string;
  inclusions: string[];
  destinations: string[];
  image: string;
  tag: string;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  visitorInfo: string;
  image: string;
}

export interface WildlifeSpecies {
  name: string;
  scientificName: string;
  description: string;
  bestTime: string;
  behavior: string;
  category: "Mammal" | "Bird" | "Predator";
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  stayType: string;
  rating: number;
  text: string;
  date: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface BookingInquiry {
  id?: string;
  createdAt?: string;
  fullName: string;
  email: string;
  phone: string;
  stayType: "weekend_holiday" | "exploration_research";
  nights: number;
  guests: number;
  destinations: string[];
  activities: string[];
  specialRequirements: string;
  status?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  activities: string[];
  accommodation: string;
  meals: string[];
  description: string;
  image?: string;
}

export interface CustomItinerary {
  title: string;
  overview: string;
  days: ItineraryDay[];
  researchFocus?: string;
  packingList: string[];
  conservationContribution: string;
  estimatedPriceUSD: number;
}
