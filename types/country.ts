import { FAQ } from './faq';
import { Seo } from './section';
import { BaseModel, Image, Quotation, TourGuide } from './shared';

export type Country = BaseModel & {
  id: number;
  name: string;
  slug: string;
  overview: string;
  lat: number;
  lng: number;
  regions: any[]; // TODO
  image: Image;
  immersiveImage: Image | null;
  quotation: null | Quotation;
  capital: string;
  timeDifferenceWinter: string;
  timeDifferenceSummer: string;
  currency: string;
  exchangeRate: string;
  religion: string;
  averageFlightPrice: string;
  averageMealPrice: string;
  helloSaying: string;
  thankYouSaying: string;
  language: string;
  video: {
    url: string;
  };
  immersiveExperience: {
    image: Image;
    title: string;
    buttonText: string;
    buttonLink: string;
  };
  faqs: FAQ[];
  reviewsStats: {
    avgRating: number;
    totalReviews: number;
    ratingStats: {
      [key: number]: number;
    };
  };
  travelSeasonInfo: string;
  travelSeasonBgImage: Image;
  travelSeasonChartImage: Image | null;
  gallery: {
    images: Image[];
  };
  guideDiscussion: {
    bgImage: Image;
    tourGuide: TourGuide | null;
    quote: string;
  };
  localizedSlugs?: {
    [key: string]: string;
  };
  seo: Seo | null;
};
