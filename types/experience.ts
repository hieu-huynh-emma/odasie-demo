import { Seo } from './section';
import { BaseModel, Image, Quotation } from './shared';
import { Tour } from './tour';

export type Experience = BaseModel & {
  slug: string;
  name: string;
  image: Image;
  roundImage: null | Image;
  excerpt: string;
  content: string;
  tours: Tour[];
  order: number;
  quotation: null | Quotation;
  localizedSlugs?: { [key: string]: string };
  seo: Seo | null;
};
