import TourCard from '@/components/cards/TourCard';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { CountrySection } from '@/types';

import DestinationCard from '@/components/cards/DestinationCard';
import Link from 'next/link';
import { TFunction } from 'i18next';

type FeaturedCountriesProps = {
  lang: string;
  section: CountrySection;
  t: TFunction<string[], string>;
};

function FeaturedCountries({ section, t }: FeaturedCountriesProps) {
  if (!section.countryCard || !section.countryCard.length) {
    return null;
  }

  return (
    <Section className="pb-8 lg:pb-16">
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        useContainer
      />
      <Container className="space-y-6">
        <div className="grid grid-cols-2 gap-6 overflow-hidden rounded-sm lg:grid-cols-4">
          {section.countryCard
            .filter(item => item.country !== null)
            .map(item => (
              <DestinationCard
                key={item.id}
                title={item.country.name}
                subtitle={t('common.our_trip')}
                image={item.image}
                url={`/destination/${item.country.slug}`}
                variant={item.highlight ? 'featured' : 'secondary'}
              />
            ))}
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="h-full w-full lg:w-1/2">
            {section.promotedTour && (
              <TourCard variant="hero" tour={section.promotedTour} t={t} />
            )}
          </div>
          <div className="relative hidden h-100 w-full flex-col items-center justify-center lg:flex lg:w-1/2">
            <div className="absolute right-0 top-0">
              <img src="/images/HeartMap.png" />
            </div>
            <p className="text-center text-[20px] font-medium uppercase">
              {t('common.trust_us')}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-5 px-2">
              {section.partners.map((partner, index) => (
                <Link
                  href={partner.url}
                  target="_blank"
                  key={index}
                  className="flex w-[calc(33.333%-1.333rem)] max-w-[180px] items-center justify-center">
                  <img
                    src={partner.image.url}
                    alt={partner.label}
                    className="h-[70px] w-full max-w-full object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default FeaturedCountries;
