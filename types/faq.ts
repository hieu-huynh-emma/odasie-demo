import { BaseModel } from './shared';

export type FAQ = BaseModel & {
  question: string;
  answer: string;
};
