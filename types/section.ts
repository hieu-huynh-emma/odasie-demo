import {
  BaseModel,
  DocumentId,
  EmailTemplate,
  FlexibleSlider,
  FlexibleSliderDesign,
  ID,
  Icon,
  Image,
  InstagramDisplay,
  MarqueeSlide,
  TourGuide,
} from './shared';
import { Country } from './country';
import { ItineraryFormStep } from './itinerary-form';
import { Tour } from './tour';
import { Topic } from './contact';
import { InsuranceSolutionSection } from './insurance';
import { UniverseDestinationCard } from './odasie';

export type Segment = {
  id: ID;
  text: string;
  highlight: undefined | null | 'primary' | 'secondary' | 'white';
  newline: boolean;
  icon?: Icon;
  isSubHeading?: boolean;
  noSpacing?: boolean;
};

export type CallToAction = {
  id: ID;
  url: string;
  newTab: boolean;
  label: string;
  type: string;
};

export type HeadingSection = {
  segments: Segment[];
  textVariant?: 'primary' | 'secondary';
  position?: 'left' | 'center' | 'right';
  as?: string;
};

export type BaseSection = {
  heading?: HeadingSection;
  description?: string;
  bgColor?: 'primary' | 'secondary';
};

export type BlogSection = BaseSection & {
  numberOfItems: number;
  callToAction?: CallToAction;
  country: null | Country;
};

export type ExperienceSection = BaseSection & {
  numberOfItems: number;
};

export type TourSection = BaseSection & {
  tours?: Tour[];
  numberOfItems: number;
  callToAction?: CallToAction;
};

export type AppFeatureItem = {
  icon: Icon;
  title: string;
  items: {
    text: string;
  }[];
};

export type MobileApplicationSection = BaseSection & {
  features: AppFeatureItem[];
  googleStoreUrl: string;
  appleStoreUrl: string;
};

export type PressHighlightsSection = BaseSection & {};

export type CoreValue = {
  title: string;
  description: string;
  icon: Icon;
};

export type WhyChooseUsSection = BaseSection & {
  bgImage: Image;
  coreValues: CoreValue[];
  showCustomerReview: boolean;
  customerReviews: null | {
    numberOfItems: null | number;
  };
};

export type CountryCard = {
  id: string;
  name: string;
  image: Image;
  highlight: boolean;
  country: Country;
};

export type CountrySection = BaseSection & {
  countryCard: CountryCard[];
  promotedTour: null | Tour;
  partners: {
    url: string;
    image: Image;
    label: string;
  }[];
};

export type HeroSection = BaseSection & {
  image: Image;
  video?: Image;
};

type Section =
  | BlogSection
  | CountrySection
  | ExperienceSection
  | MobileApplicationSection
  | TourSection
  | WhyChooseUsSection
  | HeroSection
  | ItineraryFormSection
  | GuaranteesSection
  | TeamSection
  | TravelWithUsSection
  | ContentSection
  | ContactUsSection
  | InsuranceSolutionSection
  | DiscoverySection
  | DiscoverySection
  | OdasiePlusSection
  | TalkAboutUsSection
  | OurPrincipalsSectionType
  | OdasieAgencyAndPrincipalsSectionType
  | OdasieAgencySectionType
  | OdasieUniverseSection
  | OdasieUniverseSliderSection
  | FeatureBlock
  | AssociatedBlock
  | TipBlock
  | AnswerToQuestionSection;

export type CMSBlock = {
  id: string;
  __component: string;
} & Section;

export type CMSPage = {
  id: ID;
  documentId: DocumentId;
  url: string;
  title: string;
  localizedSlugs: {
    [key: string]: string;
  };
  blocks: CMSBlock[];
  seo: Seo;
};

export type Seo = {
  id: number;
  keywords: string;
  metaDescription: string;
  metaTitle: string;
  metaImage: Image | null;
  metaRobots: string | null;
};

export type ItineraryFormSection = BaseSection & {
  steps: ItineraryFormStep[];
  bgImage?: Image;
  defaultTourGuide?: TourGuide | null;
  emailTemplate: {
    id: number;
    documentId: string;
  };
  emailTemplateForOdasie: {
    id: number;
    documentId: string;
  };
};

export type Team = BaseModel & {
  name: string;
};

export type TeamMember = BaseModel & {
  name: string;
  position: string;
  bio: string;
  avatar: Image;
  teams: Team[];
};

export type TeamSection = BaseSection & {
  members: TeamMember[];
};

export type Guarantee = BaseModel & {
  text: string;
  highlightedText: string;
  highlighted: boolean;
  featured: boolean;
};

export type GuaranteesSection = BaseSection & {
  image: Image;
  cards: Guarantee[];
};

export type TravelWithUsSection = BaseSection & {
  avatars: Image[];
  callToActions: CallToAction[];
  bgImage: Image;
};

export type ExpandableItem = {
  id: ID;
  title: string;
  description: string;
};

export type ContentSection = BaseSection & {
  content: string;
  expandableItems?: null | ExpandableItem[];
};

export type ContactUsSection = BaseSection & {
  subTitle: string;
  title: string;
  topics: Topic[];
  formTitle: string;
  emailTemplate?: EmailTemplate;
  emailTemplateForOdasie?: EmailTemplate;
  bgImage: Image;
};

export type DiscoveryType = 'experience' | 'festival';

export type DiscoverySection = BaseSection & {
  type: 'experience' | 'festival';
  callToAction: CallToAction;
  bgImage: Image;
};

export type OdasiePlusSection = BaseSection & {
  title: string;
  appIntroduction: string;
  googleStoreUrl: string;
  appleStoreUrl: string;
  paragraphs: {
    id: number;
    text: string;
  }[];
  image: Image;
};

export type TalkAboutUsCard = {
  id: number;
  image: Image;
  text: string;
  direction: 'column' | 'row';
  backgroundColor: 'green' | 'white';
};

export type TalkAboutUsSection = {
  heading: HeadingSection;
  marqueeSlides: MarqueeSlide[];
  instagram: InstagramDisplay;
  embedVideo: string;
  cards: TalkAboutUsCard[];
};

export type OdasieAgencySectionType = BaseSection & {
  heading: HeadingSection;
  image: Image;
  content: string;
  logo: Image;
  description: string;
  cards: {
    id: number;
    imageRight: boolean;
    image: Image;
    title: {
      segments: Segment[];
    };
    description: string;
    link: string;
    linkText: string;
    linkColor: 'green' | 'white';
  }[];
  bgImage: Image;
};

export type OurPrincipalsSectionType = BaseSection & {
  heading: HeadingSection;
  image: Image;
  bgImage: Image;
  bgLogo: Image | null;
  description: string;
  subDescription: string;
  card: {
    id: number;
    title: string;
    description: string;
    image?: Image; // Optional since not provided in current data, but kept for compatibility
  };
  logos: {
    id: number;
    documentId: string;
    url: string;
    image?: Image; // Optional if needed separately
    title?: string;
    description?: string;
    formats?: Image['formats'];
    isUrlSigned: boolean;
  }[];
};

export type OdasieAgencyAndPrincipalsSectionType = BaseSection & {
  bgLogo: Image;
  agencySection: OdasieAgencySectionType;
  principalsSection: OurPrincipalsSectionType;
};

export type OdasieUniverseSection = {
  heading: HeadingSection;
  destinationCard: UniverseDestinationCard;
  slider?: FlexibleSlider;
  flexibleSliders: FlexibleSliderDesign[];
};

export type OdasieUniverseSliderSection = BaseSection & {
  flexibleSliders: FlexibleSliderDesign[];
  heading: HeadingSection | null;
};

export type FeatureBlock = BaseSection & {
  blocks: FeatureBlockDetail[];
};

export type FeatureBlockDetail = {
  id: number;
  title: string;
  icon?: Icon;
  text: string;
  textPosition: 'left' | 'right';
  image?: Image;
  video?: {
    src: string;
    poster: string;
  };
};

export type AssociatedBlock = BaseSection & {
  blocks: AssociatedBlockDetail[];
};

export type AssociatedBlockDetail = {
  id: number;
  title: string;
  logo: Image;
  description: string;
  callToAction: CallToAction;
};

export type TipBlock = {
  id: number;
  title: string;
  text: string;
  logo: Image;
  features: {
    icon: Icon;
    text: string;
  }[];
  bgImage: Image;
  bgColor?: 'primary' | 'secondary';
};

export type AnswerToQuestionSection = BaseSection & {
  heading: string;
  sideText: string;
  sideImage: Image | null;
  images: Image[] | null;
  text: string;
};
