import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { HeadingSection } from './section';

export type IconName = keyof typeof dynamicIconImports;

export type ID = string | number;
export type DocumentId = string | number;

export type BaseModel = {
  id: ID;
  documentId: DocumentId;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Icon = {
  name: IconName;
  size: number;
  color: string | null;
};

export type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  alternativeFormats?: {
    webp?: {
      url: string;
      width: number;
      height: number;
    };
    avif?: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type Image = {
  id: number;
  documentId?: string;
  url: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
    mlarge?: ImageFormat;
    xlarge?: ImageFormat;
  };
  isUrlSigned?: boolean;
  alt?: string;
  caption?: string;
  alternativeText?: string;
};

type APIResponseMetadata = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type APIResponseError = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

export type APIResponse<T> = {
  data: T;
  meta?: APIResponseMetadata;
  error?: APIResponseError;
};

export type EmailTemplate = {
  id: number;
  documentId: string;
};

export type MarqueeSlide = {
  id: number;
  image: Image;
  url?: string;
};

export type InstagramDisplay = {
  images: Image[];
  logo: Image;
  instagramLink: string;
  instagramName: string;
  instagramTag: string;
  numberOfPosts: number;
  numberOfFollowers: number;
  numberOfFollowing: number;
};

export type Author = {
  id: ID;
  documentId: DocumentId;
  avatar: Image;
  name: string;
  bio: string;
};

export type TourGuide = Author;

export type Quotation = {
  id: ID;
  guideIntroQuote: string;
  tourGuide: null | TourGuide;
};

export type FlexibleSliderDesign = {
  id: number;
  _component: string;
  bgImage: Image;
  darkMode?: boolean;
  layout:
    | 'layout1'
    | 'layout2'
    | 'layout3'
    | 'layout4'
    | 'layout5'
    | 'layout6'
    | 'layout7';
  items: FlexibleSliderLayoutDetail[];
};

type FlexibleSliderLayoutDetail = {
  name: string;
  icon?: Icon | null;
  title: string;
  subTitle: string;
  description: string;
  image: Image | null;
  timeline: FlexibleSliderTimeline | null;
};

export type FlexibleSliderTimeline = {
  id: string;
  dates: {
    date: string;
    isActive: boolean;
    id: string;
  }[];
};

export type FlexibleSlider = BaseModel & {
  flexibleSlider: FlexibleSliderDesign[];
};

export type Article = {
  heading: HeadingSection;
  image: Image;
  content: string;
};
