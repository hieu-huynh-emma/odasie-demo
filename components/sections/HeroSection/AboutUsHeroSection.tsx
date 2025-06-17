'use client';

import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { HeroSection } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type AboutUsHeroSectionProps = {
  lang: string;
  section: HeroSection;
};

function AboutUsHeroSection({ section }: AboutUsHeroSectionProps) {
  const imageUrl = useResponsiveImage(section.image);

  return (
    <div className="relative min-h-[800px] bg-white text-white md:min-h-[600px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${encodeURI(imageUrl)})`,
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
        }}
      />
      <Container className="relative flex min-h-[800px] items-end md:min-h-[600px]">
        <div className="z-10 max-w-full px-4 py-8">
          <SectionHeading
            segments={section.heading?.segments}
            description={section.description}
            as="h1"
            position={section.heading?.position ?? 'left'}
            textVariant={section.heading?.textVariant ?? 'secondary'}
          />
        </div>
      </Container>
      {/* Optional overlay for better text contrast */}
      <div className="absolute inset-0 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] bg-black/40" />
    </div>
  );
}

export default AboutUsHeroSection;
