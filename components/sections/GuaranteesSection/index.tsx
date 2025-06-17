import React from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { GuaranteesSection as GuaranteesSectionType } from '@/types';

import GuaranteeCard from './GuaranteeCard';

type GuaranteesSectionProps = {
  lang: string;
  section: GuaranteesSectionType;
};

function GuaranteesSection({ section }: GuaranteesSectionProps) {
  if (!section.cards || !section.cards.length) {
    return null;
  }

  return (
    <Section
      className="bg-right-top bg-no-repeat pb-8 lg:pb-16"
      style={{
        backgroundImage: `url(/images/placeholder/bg-our-guarantees.png)`,
      }}>
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        useContainer
      />
      <Container>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-24">
          <div className="relative col-span-full row-span-2 overflow-hidden rounded-sm lg:col-span-6 lg:rounded-md">
            <ImageWithFallback
              src={section.image.url}
              alt=""
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ width: '100%', height: '100%' }}
              className="h-full w-full object-cover sm:max-h-[398px] md:max-h-[398px] lg:max-h-none"
            />
          </div>

          {section.cards?.map(guarantee => (
            <GuaranteeCard key={guarantee.id} guarantee={guarantee} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default GuaranteesSection;
