import { HeroSection as HeroSectionType } from '@/types';
import AboutUsHeroSection from './AboutUsHeroSection';
import HomeHeroSection from './HomeHeroSection';

type HeroSectionProps = React.PropsWithChildren<{
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

function HeroSection({
  url,
  lang,
  section,
  children,
  shouldGradientBg,
  ratingCountryId,
  containerClassName,
  scrollElement,
}: HeroSectionProps) {
  switch (url) {
    case '/about':
      return <AboutUsHeroSection lang={lang} section={section} />;

    default:
      return (
        <HomeHeroSection
          url={url}
          containerClassName={containerClassName}
          lang={lang}
          section={section}
          shouldGradientBg={shouldGradientBg}
          ratingCountryId={ratingCountryId}
          scrollElement={scrollElement}>
          {children}
        </HomeHeroSection>
      );
  }
}

export default HeroSection;
