import { notFound } from 'next/navigation';

import DiscoveryCard from '@/components/cards/DiscoveryCard';
import PageRenderer from '@/components/PageRenderer';
import { FestivalConfig } from '@/configs';
import { QueryMapper, convertToOrFilter } from '@/lib/query-mapper';
import { getCmsPage, getFestivals } from '@/services';
import { sortByOrder } from '@/utils';
import { initializeI18n } from '@/lib/i18n';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getCMSPageMetadata } from '@/hooks/useSEO';
import { Metadata } from 'next';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; place: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, place } = await params;
  const cmsPageResponse = await getCmsPage(
    `/discoveries/festivals/${place}`,
    lang,
  );

  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, place, lang);
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ lang: string; place: string }>;
}>) {
  const { lang, place } = await params;
  const { t } = await initializeI18n(lang, ['common']);
  const queryMapper = new QueryMapper(FestivalConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?countries.slug=${place}&regions.slug=${place}`),
  );
  const [cmsPage, festivalResponse] = await Promise.all([
    getCmsPage(`/discoveries/festivals/${place}`, lang),
    getFestivals({
      locale: lang,
      ...criteria,
      filters: convertToOrFilter(criteria.filters),
    }),
  ]);

  if (
    !cmsPage ||
    !cmsPage.data ||
    !festivalResponse ||
    !festivalResponse.data
  ) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-1200 flex-col">
      {cmsPage.data.localizedSlugs && (
        <LocalizedSetter localizedSlugs={cmsPage.data.localizedSlugs} />
      )}
      <PageRenderer lang={lang} blocks={cmsPage.data.blocks} t={t} />
      {sortByOrder(festivalResponse.data).map((festival, index) => (
        <DiscoveryCard
          key={festival.id}
          title={festival.name}
          subtitle={festival.occurrence}
          excerpt={festival.excerpt}
          image={festival.roundImage ?? festival.image}
          bgImage={festival.image}
          url={`/discovery/festival/${festival.slug}`}
          reversed={index % 2 !== 0}
        />
      ))}
    </main>
  );
}
