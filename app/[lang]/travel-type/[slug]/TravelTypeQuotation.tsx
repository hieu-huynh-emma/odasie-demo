import Link from 'next/link';

import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import QuoteCard from '@/components/cards/QuoteCard';
import { Button } from '@/components/ui/button';
import { Image, Quotation } from '@/types';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';
import { TFunction } from 'i18next';

type Props = {
  quotation: Quotation | null;
  ideasSectionImage: Image;
  tourCount: number;
  travelTypeName: string;
  travelTypeSlug: string;
  t: TFunction;
};

async function TravelTypeQuotation({
  quotation,
  ideasSectionImage,
  tourCount,
  travelTypeName,
  travelTypeSlug,
  t,
}: Props) {
  if (!quotation) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-stretch gap-14 md:flex-row">
          <div className="w-full self-center md:w-2/3">
            <QuoteCard
              quote={quotation.guideIntroQuote ?? ''}
              author={
                quotation?.tourGuide
                  ? {
                      name: quotation.tourGuide.name,
                      image: quotation.tourGuide.avatar.url,
                      position: quotation.tourGuide.bio,
                    }
                  : null
              }
            />
          </div>
          <div className="w-full md:w-1/3">
            <div className="relative h-[240px] overflow-hidden rounded-sm py-14 md:min-h-0 lg:h-[400px] lg:rounded-md">
              <BackgroundImageWithFallback
                className="absolute inset-0 bg-cover bg-center"
                url={
                  ideasSectionImage.formats?.medium?.url ||
                  ideasSectionImage.url
                }
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-2 mt-0 flex h-full flex-col items-center justify-center gap-2 lg:mt-[50px] lg:gap-6">
                <p className="typo-6xl-semibold text-white">{tourCount}</p>
                <p className="typo-2xl-semibold px-8 text-center uppercase text-white">
                  {t('tour.discover_more', { name: travelTypeName })}
                </p>
                <Link
                  href={`/travel-type/${travelTypeSlug}/tours`}
                  title="See all tours">
                  <Button variant="outline" size="lg" className="text-white">
                    {t('tour.see_all_tours')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default TravelTypeQuotation;
