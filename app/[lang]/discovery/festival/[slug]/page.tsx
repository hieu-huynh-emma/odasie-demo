import { notFound } from 'next/navigation';

import QuoteCard from '@/components/cards/QuoteCard';
import Container from '@/components/Container';
import PageRenderer from '@/components/PageRenderer';
import ScrollToTargetButton from '@/components/ScrollToTargetButton';
import HeroSection from '@/components/sections/HeroSection';
import Section from '@/components/sections/Section';
import { getCmsPage, getFestival, getTours } from '@/services';
import { cn } from '@/lib/utils';
import { initializeI18n } from '@/lib/i18n';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import Ckeditor from '@/components/Ckeditor';
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
  const cmsPageResponse = await getFestival(slug, lang);

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
  const [cmsPage, festivalResponse] = await Promise.all([
    getCmsPage('/discovery/festival/__slug__', lang),
    getFestival(slug, lang),
  ]);
  if (
    !cmsPage ||
    !cmsPage.data ||
    !festivalResponse ||
    !festivalResponse.data
  ) {
    notFound();
  }

  const tourResponse = await getTours({
    filters: {
      festivals: {
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
        containerClassName="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm lg:px-20"
        lang={lang}
        section={{
          image: festivalResponse.data.image,
          heading: {
            segments: [
              {
                id: 1,
                text: festivalResponse.data.name,
                highlight: 'white',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'left',
          },
          description: festivalResponse.data.excerpt,
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
      {festivalResponse.data.quotation && (
        <Container className="relative -top-25 z-10">
          <div className="lg:px-4">
            <QuoteCard
              quote={festivalResponse.data.quotation.guideIntroQuote}
              author={
                festivalResponse.data.quotation.tourGuide
                  ? {
                      name: festivalResponse.data.quotation.tourGuide.name,
                      image:
                        festivalResponse.data.quotation.tourGuide.avatar.url,
                      position: festivalResponse.data.quotation.tourGuide.bio,
                    }
                  : null
              }
            />
          </div>
        </Container>
      )}
      <Section
        className={cn(
          'group/content',
          festivalResponse.data.quotation ? 'pt-0' : '',
        )}>
        <Container>
          <Ckeditor content={festivalResponse.data.content} />
        </Container>
      </Section>
      {festivalResponse.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={festivalResponse.data.localizedSlugs}
          url="/discovery/festival/__slug__"
        />
      )}
      <PageRenderer
        lang={lang}
        blocks={cmsPage.data.blocks}
        t={t}
        filterSlug={{
          'festivals.slug': slug,
        }}
      />
    </main>
  );
}
