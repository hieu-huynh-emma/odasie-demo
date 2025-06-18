import Container from '@/components/Container';
import { cn } from '@/lib/utils';
import { HeroSection as HeroSectionType } from '@/types';
import SectionHeading from '@/components/SectionHeading';
import { detectMobileFromHeaders } from '@/lib/mobile-detect';
import HeroContentClient from './HeroContentClient';
import HeroHead from './HeroHead';
import HomeSearchBar from '@/components/HomeSearchBar';
import Image from 'next/image';
import { RenderAfterLCP } from '@/hooks/useLazyLoading';
import React from 'react';

type HomeHeroSectionProps = React.PropsWithChildren<{
  url?: string;
  lang: string;
  section: HeroSectionType;
  containerClassName?: string;
  shouldGradientBg?: boolean;
  ratingCountryId?: number;
  scrollElement?: {
    targetSelector?: string;
    href?: string;
    label: string;
  };
}>;

export default async function HomeHeroSection({
  lang,
  children,
  url,
  section,
  shouldGradientBg,
  ratingCountryId,
  containerClassName = 'max-w-screen-lg',
  scrollElement,
}: HomeHeroSectionProps) {

  const isMobile = await detectMobileFromHeaders();
  const isHomePage = url === '/';

  // Use the most direct image source
  const imageUrl = isMobile
    ? section?.image?.formats?.medium?.url || '/images/banner.webp'
    : section?.image?.url || '/images/banner.webp';

  // Minimal styles
  const heroContainerClass = cn(
    'relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] px-0',
    isHomePage ? 'min-h-screen' : 'min-h-[600px]',
    isMobile && 'mt-[64px]',
  );

  return (
    <>
      <HeroHead imageUrl={imageUrl} />
      <div className={heroContainerClass}>
        <Image
          src={imageUrl}
          alt="ds"
          width={100}
          height={100}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />

        {/* Gradient */}
        {shouldGradientBg && (
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        )}

        {/* Content */}
        <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-center lg:justify-end lg:pb-[124px]">
          <Container
            className={cn(containerClassName, isMobile && 'mt-3 pb-3')}>
            <SectionHeading
              segments={section.heading?.segments}
              description={section.description}
              as={isMobile ? 'h2' : 'h1'}
              position={section.heading?.position ?? 'center'}
              textVariant={section.heading?.textVariant ?? 'secondary'}
              ratingCountryId={ratingCountryId}
              scrollElement={scrollElement}
              lang={lang}
              isMobile={isMobile}
            />

            <RenderAfterLCP>
              {url === '/' ? <HomeSearchBar lang={lang} /> : null}
            </RenderAfterLCP>


          </Container>
          {children}
        </div>
        <HeroContentClient
          shouldShowSearchBar={url === '/'}
          shouldShowVideo={!!section.video}
          videoSrc={section.video?.url}
          videoPoster={
            section.image?.formats?.medium?.url || section.image?.url
          }
          isMobile={isMobile}
        />
      </div>
    </>
  );
}
