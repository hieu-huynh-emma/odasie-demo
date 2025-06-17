import { VisitorType } from '@/lib/tracking';
import { BaseModel, Icon } from './shared';

export type Language = {
  code: string;
  name: string;
};

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  icon: Icon;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  googleMapLink: string;
};

export type PageCMS = BaseModel & {
  title: string;
  url: string;
};

export type GlobalSettings = {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  appleStoreUrl?: string;
  googleStoreUrl?: string;
  languages: Language[];
  currencies: Currency[];
  defaultCurrency: Currency;
  defaultLanguage: Language;
  contactInfo: ContactInfo;
  visitor_type?: VisitorType;
  email?: string;
  copyright: string;
  socialLinks: SocialLink[];
  footer: {
    bgImage: {
      url: string;
    };
  };
  contactUsPage: PageCMS;
  faqPage: PageCMS;
  insurancePage: PageCMS;
  policyPage: PageCMS;
  newsletterEmailTemplate?: {
    documentId: string;
    id: string;
  };
};
