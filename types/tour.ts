import { Country } from './country';
import { Experience } from './experience';
import { Seo } from './section';
import { BaseModel, Image, ID, Icon, Author, TourGuide } from './shared';

export type TourFeature = BaseModel & {
  name: string;
  icon: Icon;
};

export type TourGallery = null | (BaseModel & Image)[];

export type Hotel = BaseModel & {
  name: string;
  description: string;
  rating: number;
  image: Image;
};

export type TourItinerary = {
  id: ID;
  title: string;
  subTitle: string;
  description: string;
  lat: number;
  lng: number;
  hotels: Hotel[];
  images: Image[] | null;
  regions: any[]; // TODO
  meals: {
    text: string;
  }[];
  services: {
    text: string;
  }[];
};

export type Tour = BaseModel & {
  overview: null | string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  image: Image;
  duration: number;
  difficulty: string;
  minParticipants: number;
  maxParticipants: number;
  notes: string;
  cancellationPolicy: string;
  rating: number;
  startingPrice: {
    id: ID;
    price: number;
    unit: string;
    currency: string;
  };
  author: Author;
  tourGuide: TourGuide;
  country: null | Country;
  experiences: Experience[];
  regions: any; // TODO
  tourFeatures: TourFeature[];
  faqs: (BaseModel & {
    question: string;
    answer: string;
  })[];
  reviewsStats: {
    avgRating: number;
    ratingStats: Record<number, number>;
    totalReviews: number;
  };
  inclusions: string;
  exclusions: string;
  gallery: TourGallery;
  itinerary: TourItinerary[];
  localizedSlugs?: {
    [key: string]: string;
  };
  seo: Seo | null;
};
