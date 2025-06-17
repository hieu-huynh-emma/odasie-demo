import { Country } from './country';
import { Seo } from './section';
import { Article, BaseModel, Image, Quotation } from './shared';

export type Region = BaseModel & {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  locale: string;
  overview: string;
  excerpt: string;
  country: Country;
  image: Image;
  id: number;
  travelSeasonInfo: string;
  travelSeasonBgImage: Image;
  travelSeasonChartImage: Image | null;
  quotation: null | Quotation;
  mapImage: Image | null;
  article: Article;
  localizedSlugs?: { [key: string]: string };
  seo: Seo | null;
};
