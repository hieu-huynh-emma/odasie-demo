import { BlogArticle } from './blog-article';
import { Country } from './country';
import { FAQ } from './faq';
import { Seo } from './section';
import { BaseModel, Image, Quotation, TourGuide } from './shared';
import { Tour } from './tour';

export type TravelType = BaseModel & {
  slug: string;
  name: string;
  image: Image;
  //   roundImage: null | Image;
  content: string;
  excerpt: string;
  countries?: Country[];
  regions?: any[]; // TODO
  blogArticles: BlogArticle[];
  tours: Tour[];
  guideDiscussion: {
    bgImage: Image;
    quote: string;
    tourGuide: TourGuide;
  };
  order: number;
  quotation: null | Quotation;
  ideasSectionImage: Image;
  faqs: FAQ[];
  gallery: Image[];
  localizedSlugs?: { [key: string]: string };
  seo: Seo | null;
};
