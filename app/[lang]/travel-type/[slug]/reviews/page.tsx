import { notFound } from 'next/navigation';
import { initializeI18n } from '@/lib/i18n';
import { TabsContent } from '@/components/ui/tabs';
import { getTravelType } from '@/services/travel-type';
import TravelTypeReviews from './TravelTypeReviews';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

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

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string }>;
  }>,
) {
  const [{ lang, slug }, urlSearchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const { t } = await initializeI18n(lang, ['common']);
  const travelTypeResponse = await getTravelType(slug, lang);

  if (!travelTypeResponse || !travelTypeResponse.data) {
    notFound();
  }

  const page = Number.isNaN(Number(urlSearchParams.page))
    ? 1
    : Number(urlSearchParams.page);

  return (
    <TabsContent value={`/travel-type/${slug}/reviews`} className="mt-0">
      <TravelTypeReviews
        travelType={travelTypeResponse.data}
        page={page}
        lang={lang}
        t={t}
      />
      {travelTypeResponse.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={travelTypeResponse.data.localizedSlugs}
          url="/travel-type/__slug__/reviews"
        />
      )}
    </TabsContent>
  );
}
