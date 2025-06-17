import { Icon, Image } from './shared';

export type ItineraryFormStep = {
  id: number;
  questions: ItineraryFormQuestion[];
  title: string;
  subTitle: string;
  type: string;
  bgImage?: string;
  instruction?: ItineraryFormInstruction;
};

export type ItineraryFormQuestion = {
  id: number;
  question?: string;
  description?: string;
  image?: string;
  inputs: ItineraryFormInputs[];
  parentQuestionId?: number | null;
};

export type ItineraryFormInputs = {
  id: number;
  type:
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'dateRange'
    | 'range-slider'
    | 'text'
    | 'number'
    | 'chip'
    | 'dynamic';
  name: string;
  label?: string;
  step?: number;
  placeholder?: string;
  answers?: ItineraryFormInputAnswers[];
  validation?: ItineraryFormValidation;
  dynamicInput?: ItineraryFormInputs;
};

export type ItineraryFormValidation = {
  required: boolean;
  min?: number;
  max?: number;
  isEmail?: boolean;
};

export type ItineraryFormInputAnswers = {
  label: string;
  value: string;
  children: ItineraryFormQuestion[];
  icon: Icon | null;
  image: Image | null;
};

export type ItineraryFormInstruction = {
  id: number;
  title?: string;
  content?: string;
};

export type ItineraryFormSubmitQuestion = {
  id: number;
  question: string;
  inputs: {
    id: number;
    name: string;
    value: string | number | null;
    answers: {
      id: number;
      value: string;
    }[];
    children: ItineraryFormSubmitQuestion[];
  }[];
};

export type ItineraryFormSubmitRequestBody = {
  url: string;
  locale: string;
  emailTemplateId: string;
  emailForOdasieTemplateId: string;
  steps: {
    id: number;
    questions: ItineraryFormSubmitQuestion[];
  }[];
  user?: {
    name: string;
    phone: string;
    email: string;
    message: string | null;
  };
  recaptchaToken?: string | null;
};
