// import HeroSection from '@/components/sections/HeroSection';
import {
  BlogSection,
  CountrySection,
  ExperienceSection,
  MobileApplicationSection,
  TourSection,
  WhyChooseUsSection,
  CMSBlock,
  HeroSection as HeroSectionType,
  ItineraryFormSection,
  GuaranteesSection as GuaranteesSectionType,
  TravelWithUsSection as TravelWithUsSectionType,
  TeamSection as TeamSectionType,
  ContentSection as ContentSectionType,
  ContactUsSection as ContactUsSectionType,
  DiscoverySection,
  TalkAboutUsSection as TalkAboutUsSectionType,
  OdasieAgencyAndPrincipalsSectionType,
  OdasieUniverseSection as OdasieUniverseSectionType,
  OdasieUniverseSliderSection as OdasieUniverseSliderSectionType,
  FeatureBlock as FeatureBlockType,
  AssociatedBlock as AssociatedBlockType,
  TipBlock as TipBlockType,
  AnswerToQuestionSection as AnswerToQuestionSectionType,
} from '@/types';
import { InsuranceSolutionSection } from '@/types/insurance';
import { TFunction } from 'i18next';

type PageRendererProps = {
  url?: string;
  lang: string;
  blocks: CMSBlock[];
  queryParameters?: { [key: string]: string | string[] };
  t: TFunction<string[], string>;
  localizedSlugs?: { en: string; fr: string; de?: string };
  filterSlug?: { [key: string]: string };
};

async function PageRenderer({
  url,
  lang,
  blocks,
  queryParameters,
  t,
  filterSlug,
}: PageRendererProps) {
  const renderedBlocks = await Promise.all(
    blocks.map(async block => {
      switch (block.__component) {
        case 'section.story-section':
          return null;

        case 'section.press-section':
          return null;

        case 'section.mobile-application-section': {
          const { default: MobileApplications } = await import(
            '@/components/sections/MobileApplications'
          );
          return (
            <MobileApplications
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as MobileApplicationSection}
            />
          );
        }

        // case 'section.hero-section':
        //   return (
        //     <HeroSection
        //       key={`${block.__component}-${block.id}`}
        //       lang={lang}
        //       url={url}
        //       section={block as HeroSectionType}
        //     />
        //   );

        case 'section.destination-section': {
          const { default: FeaturedCountries } = await import(
            '@/components/sections/FeaturedCountries'
          );
          return (
            <FeaturedCountries
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as CountrySection}
              t={t}
            />
          );
        }

        case 'section.partners-section':
          return null;

        case 'section.blog-section': {
          const { default: LatestBlogArticles } = await import(
            '@/components/sections/LatestBlogArticles'
          );
          return (
            <LatestBlogArticles
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as BlogSection}
            />
          );
        }

        case 'section.tour-section': {
          const { default: FeaturedTours } = await import(
            '@/components/sections/FeaturedTours'
          );
          return (
            <FeaturedTours
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as TourSection}
              filterSlug={filterSlug}
            />
          );
        }

        case 'section.experience-section': {
          const { default: FeaturedExperiences } = await import(
            '@/components/sections/FeaturedExperiences'
          );
          return (
            <FeaturedExperiences
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as ExperienceSection}
            />
          );
        }

        case 'section.why-choose-us-section': {
          const { default: WhyChooseUs } = await import(
            '@/components/sections/WhyChooseUs'
          );
          return (
            <WhyChooseUs
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as WhyChooseUsSection}
            />
          );
        }

        case 'section.itinerary-form-section': {
          const { default: PersonalizedItinerarySection } = await import(
            '@/components/sections/PersonalizedItineraryForm/PersonalizedItinerarySection'
          );
          const section = block as ItineraryFormSection;
          return (
            <PersonalizedItinerarySection
              queryParameters={queryParameters ?? {}}
              lang={lang}
              key={`${block.__component}-${block.id}`}
              section={section}
              url={url}
            />
          );
        }

        case 'section.odasie-team-members-section': {
          const { default: TeamSection } = await import(
            '@/components/sections/TeamSection'
          );
          return (
            <TeamSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as TeamSectionType}
            />
          );
        }

        case 'section.guarantees-section': {
          const { default: GuaranteesSection } = await import(
            '@/components/sections/GuaranteesSection'
          );
          return (
            <GuaranteesSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as GuaranteesSectionType}
            />
          );
        }

        case 'section.ready-to-travel-with-us-section': {
          const { default: TravelWithUsSection } = await import(
            '@/components/sections/TravelWithUsSection'
          );
          return (
            <TravelWithUsSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as TravelWithUsSectionType}
            />
          );
        }

        case 'section.contact-form-section': {
          const { default: ContactUsSection } = await import(
            '@/components/sections/ContactUsSection'
          );
          return (
            <ContactUsSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as ContactUsSectionType}
              t={t}
            />
          );
        }

        case 'section.content-section': {
          const { default: ContentSection } = await import(
            '@/components/sections/ContentSection'
          );
          return (
            <ContentSection
              key={`${block.__component}-${block.id}`}
              section={block as ContentSectionType}
            />
          );
        }

        case 'section.discovery-section': {
          const { default: FeaturedDiscoveries } = await import(
            '@/components/sections/FeaturedDiscoveries'
          );
          return (
            <FeaturedDiscoveries
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as DiscoverySection}
              t={t}
            />
          );
        }

        case 'section.insurance-solution-section': {
          const { default: Insurance } = await import(
            '@/components/sections/InsuranceSection'
          );
          return (
            <Insurance
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as InsuranceSolutionSection}
            />
          );
        }

        case 'section.they-talk-about-odasie-section': {
          const { default: TalkAboutUsSection } = await import(
            '@/components/sections/TalkAboutUsSection'
          );
          return (
            <TalkAboutUsSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as TalkAboutUsSectionType}
            />
          );
        }

        case 'section.odasie-agency-and-principals-section': {
          const { default: OdasieAgencyAndPrincipalsSection } = await import(
            '@/components/sections/OdasieAgencyAndPrincipalsSection'
          );
          return (
            <OdasieAgencyAndPrincipalsSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as OdasieAgencyAndPrincipalsSectionType}
              t={t}
            />
          );
        }

        case 'section.odasie-universe-section': {
          const { default: OdasieUniverseSection } = await import(
            '@/components/sections/OdasieUniverseSection/page'
          );
          return (
            <OdasieUniverseSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={block as OdasieUniverseSectionType}
            />
          );
        }

        case 'section.odasie-universe-slider-section': {
          const { default: OdasieUniverseSliderSection } = await import(
            '@/components/sections/OdasieUniverseSliderSection'
          );
          const sliderSection = block as OdasieUniverseSliderSectionType;
          return (
            <OdasieUniverseSliderSection
              key={`${block.__component}-${block.id}`}
              lang={lang}
              section={sliderSection}
            />
          );
        }

        case 'section.feature-block-section': {
          const { default: FeatureBlock } = await import(
            '@/components/sections/FeatureBlock'
          );
          return (
            <FeatureBlock
              key={`${block.__component}-${block.id}`}
              section={block as FeatureBlockType}
            />
          );
        }

        case 'section.associated-block-section': {
          const { default: AssociatedBlock } = await import(
            '@/components/sections/AssociatedBlock'
          );
          return (
            <AssociatedBlock
              key={`${block.__component}-${block.id}`}
              section={block as AssociatedBlockType}
            />
          );
        }

        case 'section.tip-block-section': {
          const { default: TipBlock } = await import(
            '@/components/sections/TipBlock'
          );
          return (
            <TipBlock
              key={`${block.__component}-${block.id}`}
              section={block as TipBlockType}
            />
          );
        }

        case 'section.answer-to-question-section': {
          const { default: AnswerToQuestionSection } = await import(
            '@/components/sections/AnswerToQuestionSection'
          );
          return (
            <AnswerToQuestionSection
              key={`${block.__component}-${block.id}`}
              section={block as AnswerToQuestionSectionType}
            />
          );
        }

        default:
          return null;
      }
    }),
  );

  return renderedBlocks.filter(Boolean);
}

export default PageRenderer;
