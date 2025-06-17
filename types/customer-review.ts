import { BaseModel, Image } from './shared';

export type CustomerReview = BaseModel & {
  rating: number;
  comment: string;
  image: Image;
  tour: {
    title: string;
    slug: string;
    country: {
      name: string;
    };
  };
};
