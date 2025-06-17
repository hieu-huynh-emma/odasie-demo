import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import PageRenderer from '@/components/PageRenderer';
import ScrollToTargetButton from '@/components/ScrollToTargetButton';
import HeroSection from '@/components/sections/HeroSection';
import Section from '@/components/sections/Section';
import { getCmsPage, getExperience, getTours } from '@/services';
import QuoteCard from '@/components/cards/QuoteCard';
import { cn } from '@/lib/utils';
import { initializeI18n } from '@/lib/i18n';
import Ckeditor from '@/components/Ckeditor';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getCMSPageMetadata } from '@/hooks/useSEO';
import { Metadata } from 'next';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, slug } = await params;
  const cmsPageResponse = await getExperience(slug, lang);
  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, slug, lang);
}

export default async function Page(
  props: Readonly<{ params: Promise<{ lang: string; slug: string }> }>,
) {
  const { lang, slug } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const [cmsPage, experienceResponse] = await Promise.all([
    getCmsPage('/discovery/experience/__slug__', lang),
    getExperience(slug, lang),
  ]);

  if (
    !cmsPage ||
    !cmsPage.data ||
    !experienceResponse ||
    !experienceResponse.data
  ) {
    notFound();
  }

  const tourResponse = await getTours({
    filters: {
      experiences: {
        slug: slug,
      },
    },
    locale: lang,
    pagination: { page: 1, pageSize: 1 },
    populate: {},
  });

  const hasLinkedTours = tourResponse.data && tourResponse.data.length > 0;

  return (
    <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
      <HeroSection
        containerClassName="xl:max-w-screen-xl lg:max-w-1200 md:max-w-screen-md sm:max-w-screen-sm lg:px-20"
        lang={lang}
        section={{
          image: experienceResponse.data.image,
          heading: {
            segments: [
              {
                id: 1,
                text: experienceResponse.data.name,
                highlight: 'white',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'left',
          },
          description: experienceResponse.data.excerpt,
        }}
        shouldGradientBg>
        <Container className="pt-8 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-1200 lg:px-20 xl:max-w-screen-xl">
          {hasLinkedTours && (
            <ScrollToTargetButton targetSelector=".tour-section">
              {t('discovery.ask_to_take_there')}
            </ScrollToTargetButton>
          )}
        </Container>
      </HeroSection>
      {experienceResponse.data.quotation && (
        <Container className="relative -top-25 z-10">
          <div className="lg:px-4">
            <QuoteCard
              quote={experienceResponse.data.quotation.guideIntroQuote}
              author={
                experienceResponse.data.quotation.tourGuide
                  ? {
                      name: experienceResponse.data.quotation.tourGuide.name,
                      image:
                        experienceResponse.data.quotation.tourGuide.avatar.url,
                      position: experienceResponse.data.quotation.tourGuide.bio,
                    }
                  : null
              }
            />
          </div>
        </Container>
      )}
      <Section
        className={cn(
          'group-scroll-element',
          experienceResponse.data.quotation ? 'pt-0' : '',
        )}>
        <Ckeditor content={experienceResponse.data.content} />
      </Section>
      {experienceResponse.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={experienceResponse.data.localizedSlugs}
          url="/discovery/experience/__slug__"
        />
      )}
      <PageRenderer
        lang={lang}
        blocks={cmsPage.data.blocks}
        t={t}
        filterSlug={{
          'experiences.slug': slug,
        }}
      />
    </main>
  );
}
