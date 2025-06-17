import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/Container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueryCriteria } from '@/lib/query-mapper';
import { getGlobalSettings, getTour, getTours } from '@/services';
import { initializeI18n } from '@/lib/i18n';
import TourReviews from './TourReviews';
import TourFAQs from './TourFAQs';
import FeaturedTours from '@/components/sections/FeaturedTours';
import TourAdditionInfo from './TourAdditionInfo';
import TourContact from './TourContact';
import TourOverview from './TourOverview';
import TourHeroSection from './TourHeroSection';
import TourItinerary from './TourItinerary';
import Section from '@/components/sections/Section';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { getCMSPageMetadata } from '@/hooks/useSEO';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

type TourDetailsPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const revalidate = 0; // TODO

export async function generateStaticParams() {
  const criteria: QueryCriteria = {
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };
  const res = await getTours(criteria);

  if (!res || !res.data) {
    return [];
  }

  return res.data.map(item => ({ slug: item.slug }));
}

export async function generateMetadata(
  { params }: TourDetailsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, slug } = await params;
  const cmsPageResponse = await getTour(slug, lang);
  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, slug, lang);
}

export default async function TourDetailsPage(props: TourDetailsPageProps) {
  const { lang, slug } = await props.params;
  const { data: tour } = await getTour(slug, lang);
  const { data: globalSetting } = await getGlobalSettings(lang);
  const { t } = await initializeI18n(lang, ['common']);

  if (!tour) {
    notFound();
  }
  const country = tour?.country?.slug;

  const relatedTourSection = {
    heading: {
      segments: [
        {
          id: 1,
          text: t('common.related_tours'),
          highlight: null,
          newline: false,
        },
      ],
    },
    numberOfItems: 10,
    callToAction: {
      url: `/destination/${country}/tours`,
      label: t('tour.see_all_tours'),
      id: 1,
      newTab: false,
      type: 'primary',
    },
    // TODO: add criteria
  };

  return (
    <>
      <div className="relative py-20 text-white">
        <BackgroundImageWithFallback
          className="absolute inset-0 bg-cover bg-center"
          url={tour?.image?.url || ''}
        />

        <TourHeroSection tour={tour} t={t} />
      </div>

      <main className="mx-auto flex max-w-1200 flex-col pb-0 lg:pb-8">
        {tour.localizedSlugs && (
          <LocalizedSetter localizedSlugs={tour.localizedSlugs} />
        )}
        <Section>
          <Tabs defaultValue="overview">
            <Container className="grid grid-cols-12 gap-8">
              <TabsList className="flex flex-row gap-2">
                <TabsTrigger value="overview">
                  {t('common.overview')}
                </TabsTrigger>
                <TabsTrigger value="review">{t('common.reviews')}</TabsTrigger>
                <TabsTrigger value="faq">{t('common.faq')}</TabsTrigger>
              </TabsList>
            </Container>
            <TabsContent value="overview">
              <Container className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-7">
                  <TourOverview tour={tour} />
                </div>
                <div className="col-span-12 lg:col-span-full lg:col-start-9">
                  {globalSetting && (
                    <TourContact
                      globalSetting={globalSetting}
                      tour={tour}
                      t={t}
                    />
                  )}
                </div>
              </Container>
              <div className="mt-10">
                <TourItinerary tour={tour} t={t} />
                <TourAdditionInfo tour={tour} t={t} />
                <FeaturedTours lang={lang} section={relatedTourSection} />
              </div>
            </TabsContent>
            <TabsContent value="review">
              <Container className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-7">
                  <TourReviews tour={tour} t={t} />
                </div>
                <div className="col-span-12 hidden lg:col-span-full lg:col-start-9 lg:block">
                  {globalSetting && (
                    <TourContact
                      globalSetting={globalSetting}
                      tour={tour}
                      t={t}
                    />
                  )}
                </div>
              </Container>
            </TabsContent>
            <TabsContent value="faq">
              <Container className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-7">
                  <TourFAQs tour={tour} t={t} />
                </div>
                <div className="col-span-12 hidden lg:col-span-full lg:col-start-9 lg:block">
                  {globalSetting && (
                    <TourContact
                      globalSetting={globalSetting}
                      tour={tour}
                      t={t}
                    />
                  )}
                </div>
              </Container>
            </TabsContent>
          </Tabs>
        </Section>
        {tour.localizedSlugs && (
          <LocalizedSetter
            localizedSlugs={tour.localizedSlugs}
            url="/tour/__slug__"
          />
        )}
      </main>
    </>
  );
}
