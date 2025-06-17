import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { BaseSection, Region } from '@/types';

import CarouselFeaturedRegions from './CarouselFeaturedRegions';

type FeaturedRegionsProps = {
  lang: string;
  section: BaseSection;
  regions: Region[];
};

function FeaturedRegions({ section, regions }: FeaturedRegionsProps) {
  if (!regions || !regions.length) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        useContainer
      />
      <Container className="space-y-6">
        <CarouselFeaturedRegions regions={regions} />
      </Container>
    </Section>
  );
}

export default FeaturedRegions;
