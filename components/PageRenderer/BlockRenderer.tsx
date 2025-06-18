"use client";

import dynamic from "next/dynamic";
import {
    AnswerToQuestionSection as AnswerToQuestionSectionType,
    AssociatedBlock as AssociatedBlockType,
    BlogSection, CMSBlock,
    ContactUsSection as ContactUsSectionType,
    ContentSection as ContentSectionType,
    CountrySection,
    DiscoverySection,
    ExperienceSection, FeatureBlock as FeatureBlockType,
    GuaranteesSection as GuaranteesSectionType,
    ItineraryFormSection,
    MobileApplicationSection,
    OdasieAgencyAndPrincipalsSectionType,
    OdasieUniverseSection as OdasieUniverseSectionType,
    OdasieUniverseSliderSection as OdasieUniverseSliderSectionType,
    TalkAboutUsSection as TalkAboutUsSectionType,
    TeamSection as TeamSectionType, TipBlock as TipBlockType,
    TourSection,
    TravelWithUsSection as TravelWithUsSectionType,
    WhyChooseUsSection
} from "@/types";
import {InsuranceSolutionSection} from "@/types/insurance";
import {PageRendererProps} from "@/components/PageRenderer/types";

const MobileApplications = dynamic(() => import('@/components/sections/MobileApplications'));
const FeaturedCountries = dynamic(() => import('@/components/sections/FeaturedCountries'));
const LatestBlogArticles = dynamic(() => import('@/components/sections/LatestBlogArticles'));
const FeaturedTours = dynamic(() => import('@/components/sections/FeaturedTours'));
const FeaturedExperiences = dynamic(() => import('@/components/sections/FeaturedExperiences'));
const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs'));
const PersonalizedItinerarySection = dynamic(() => import('@/components/sections/PersonalizedItineraryForm/PersonalizedItinerarySection'));
const TeamSection = dynamic(() => import('@/components/sections/TeamSection'));
const GuaranteesSection = dynamic(() => import('@/components/sections/GuaranteesSection'));
const TravelWithUsSection = dynamic(() => import('@/components/sections/TravelWithUsSection'));
const ContactUsSection = dynamic(() => import('@/components/sections/ContactUsSection'));
const ContentSection = dynamic(() => import('@/components/sections/ContentSection'));
const FeaturedDiscoveries = dynamic(() => import('@/components/sections/FeaturedDiscoveries'));
const Insurance = dynamic(() => import('@/components/sections/InsuranceSection'));
const TalkAboutUsSection = dynamic(() => import('@/components/sections/TalkAboutUsSection'));
const OdasieAgencyAndPrincipalsSection = dynamic(() => import('@/components/sections/OdasieAgencyAndPrincipalsSection'));
const OdasieUniverseSection = dynamic(() => import('@/components/sections/OdasieUniverseSection/page'));
const OdasieUniverseSliderSection = dynamic(() => import('@/components/sections/OdasieUniverseSliderSection'));
const FeatureBlock = dynamic(() => import('@/components/sections/FeatureBlock'));
const AssociatedBlock = dynamic(() => import('@/components/sections/AssociatedBlock'));
const TipBlock = dynamic(() => import('@/components/sections/TipBlock'));
const AnswerToQuestionSection = dynamic(() => import('@/components/sections/AnswerToQuestionSection'));


export default function BlockRenderer({
                                          block,
                                          url,
                                          lang,
                                          queryParameters,
                                          filterSlug,
                                      }: Omit<PageRendererProps, "blocks"> & { block: CMSBlock | undefined }) {

    if (!block) return null

    switch (block.__component) {
        case 'section.story-section':
            return null;

        case 'section.press-section':
            return null;

        case 'section.mobile-application-section': {
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
            return (
                <FeaturedCountries
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as CountrySection}
                />
            );
        }

        case 'section.partners-section':
            return null;

        case 'section.blog-section': {
            return (
                <LatestBlogArticles
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as BlogSection}
                />
            );
        }

        case 'section.tour-section': {
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
            return (
                <FeaturedExperiences
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as ExperienceSection}
                />
            );
        }

        case 'section.why-choose-us-section': {
            return (
                <WhyChooseUs
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as WhyChooseUsSection}
                />
            );
        }

        case 'section.itinerary-form-section': {
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
            return (
                <TeamSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as TeamSectionType}
                />
            );
        }

        case 'section.guarantees-section': {
            return (
                <GuaranteesSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as GuaranteesSectionType}
                />
            );
        }

        case 'section.ready-to-travel-with-us-section': {
            return (
                <TravelWithUsSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as TravelWithUsSectionType}
                />
            );
        }

        case 'section.contact-form-section': {
            return (
                <ContactUsSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as ContactUsSectionType}

                />
            );
        }

        case 'section.content-section': {
            return (
                <ContentSection
                    key={`${block.__component}-${block.id}`}
                    section={block as ContentSectionType}
                />
            );
        }

        case 'section.discovery-section': {
            return (
                <FeaturedDiscoveries
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as DiscoverySection}

                />
            );
        }

        case 'section.insurance-solution-section': {
            return (
                <Insurance
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as InsuranceSolutionSection}
                />
            );
        }

        case 'section.they-talk-about-odasie-section': {
            return (
                <TalkAboutUsSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as TalkAboutUsSectionType}
                />
            );
        }

        case 'section.odasie-agency-and-principals-section': {
            return (
                <OdasieAgencyAndPrincipalsSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as OdasieAgencyAndPrincipalsSectionType}

                />
            );
        }

        case 'section.odasie-universe-section': {
            return (
                <OdasieUniverseSection
                    key={`${block.__component}-${block.id}`}
                    lang={lang}
                    section={block as OdasieUniverseSectionType}
                />
            );
        }

        case 'section.odasie-universe-slider-section': {
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
            return (
                <FeatureBlock
                    key={`${block.__component}-${block.id}`}
                    section={block as FeatureBlockType}
                />
            );
        }

        case 'section.associated-block-section': {
            return (
                <AssociatedBlock
                    key={`${block.__component}-${block.id}`}
                    section={block as AssociatedBlockType}
                />
            );
        }

        case 'section.tip-block-section': {
            return (
                <TipBlock
                    key={`${block.__component}-${block.id}`}
                    section={block as TipBlockType}
                />
            );
        }

        case 'section.answer-to-question-section': {
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
}

