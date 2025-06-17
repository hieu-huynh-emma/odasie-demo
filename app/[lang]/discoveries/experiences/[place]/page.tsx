import { notFound } from 'next/navigation';

import DiscoveryCard from '@/components/cards/DiscoveryCard';
import PageRenderer from '@/components/PageRenderer';
import { ExperienceConfig } from '@/configs';
import { QueryMapper, convertToOrFilter } from '@/lib/query-mapper';
import { getCmsPage, getExperiences } from '@/services';
import { sortByOrder } from '@/utils';
import { initializeI18n } from '@/lib/i18n';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { getCMSPageMetadata } from '@/hooks/useSEO';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
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
    `/discoveries/experiences/${place}`,
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
  const queryMapper = new QueryMapper(ExperienceConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?countries.slug=${place}&regions.slug=${place}`),
  );
  const [cmsPage, experienceResponse] = await Promise.all([
    getCmsPage(`/discoveries/experiences/${place}`, lang),
    getExperiences({
      locale: lang,
      ...criteria,
      filters: convertToOrFilter(criteria.filters),
    }),
  ]);

  if (
    !cmsPage ||
    !cmsPage.data ||
    !experienceResponse ||
    !experienceResponse.data
  ) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-1200 flex-col">
      <PageRenderer lang={lang} blocks={cmsPage.data.blocks} t={t} />
      {sortByOrder(experienceResponse.data).map((experience, index) => (
        <DiscoveryCard
          key={experience.id}
          title={experience.name}
          excerpt={experience.excerpt}
          image={experience.roundImage ?? experience.image}
          bgImage={experience.image}
          url={`/discovery/experience/${experience.slug}`}
          reversed={index % 2 !== 0}
        />
      ))}
      {cmsPage.data.localizedSlugs && (
        <LocalizedSetter localizedSlugs={cmsPage.data.localizedSlugs} />
      )}
    </main>
  );
}
