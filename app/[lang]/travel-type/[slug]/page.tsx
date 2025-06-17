import { notFound } from 'next/navigation';

import { getCmsPage, getTours } from '@/services';
import { getTravelType } from '@/services/travel-type';
import PageRenderer from '@/components/PageRenderer';
import { TabsContent } from '@/components/ui/tabs';
import TourGuideDiscussionSection from '@/components/sections/TourGuideDiscussionSection';
import FAQs from '@/components/faq';
import Section from '@/components/sections/Section';
import Container from '@/components/Container';
import TravelTypeFeaturedTours from './TravelTypeFeaturedTours';
import TravelTypeQuotation from './TravelTypeQuotation';
import { QueryMapper } from '@/lib/query-mapper';
import { initializeI18n } from '@/lib/i18n';
import { TourConfig } from '@/configs';
import TravelTypeGallery from './TravelTypeGallery';
import ScrollToTop from '@/components/ScrollToTop';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, slug } = await params;
  const cmsPageResponse = await getTravelType(slug, lang);

  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, slug, lang);
}

export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  const { t } = await initializeI18n(lang, ['common']);
  const queryMapper = new QueryMapper(TourConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams({ 'travelTypes.slug': slug }),
  );
  const [cmsPage, travelTypeResponse, toursResponse] = await Promise.all([
    getCmsPage('/travel-type/__slug__', lang),
    getTravelType(slug, lang),
    getTours({ locale: lang, ...criteria }),
  ]);

  if (
    !cmsPage ||
    !cmsPage.data ||
    !travelTypeResponse ||
    !travelTypeResponse.data ||
    !toursResponse ||
    !toursResponse.data
  ) {
    notFound();
  }
  const tours = toursResponse.data || [];
  const toursUrl = `/travel-type/${slug}/tours`;
  const faqs = travelTypeResponse.data.faqs || [];
  const tourGuideDiscussion = travelTypeResponse.data.guideDiscussion || null;
  const quotation = travelTypeResponse.data.quotation || null;
  const gallery = travelTypeResponse.data.gallery || [];

  return (
    <TabsContent value={`/travel-type/${slug}`} className="mt-0">
      <TravelTypeQuotation
        quotation={quotation}
        tourCount={tours.length}
        ideasSectionImage={travelTypeResponse.data.ideasSectionImage}
        travelTypeName={travelTypeResponse.data.name}
        travelTypeSlug={slug}
        t={t}
      />
      <TravelTypeGallery gallery={gallery} t={t} />
      <TravelTypeFeaturedTours tours={tours} toursUrl={toursUrl} t={t} />
      {cmsPage.data.localizedSlugs && (
        <LocalizedSetter localizedSlugs={cmsPage.data.localizedSlugs} />
      )}
      <PageRenderer
        lang={lang}
        blocks={cmsPage.data.blocks}
        t={t}
        filterSlug={{
          'travelTypes.slug': slug,
        }}
      />
      <Section>
        <Container>
          <FAQs faqs={faqs} t={t} />
        </Container>
      </Section>
      <TourGuideDiscussionSection
        tourGuideDiscussion={tourGuideDiscussion}
        t={t}
      />
      <ScrollToTop />
      {travelTypeResponse.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={travelTypeResponse.data.localizedSlugs}
          url="/travel-type/__slug__"
        />
      )}
    </TabsContent>
  );
}
