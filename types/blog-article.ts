import { Country } from './country';
import { Experience } from './experience';
import { BaseModel, Image } from './shared';

export type BlogArticle = BaseModel & {
  slug: string;
  image: Image;
  tags?: string[];
  title: string;
  excerpt: null | string;
  content: string;

  // TODO
  author: {
    name: string;
    avatar: {
      url: string;
    };
  };

  countries?: Country[]; // TODO
  experiences?: Experience[];
  regions?: any[]; // TODO;
  comments?: any[]; // TODO
  localizedSlugs?: { [key: string]: string };
};
