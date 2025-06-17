import TourCard from '@/components/cards/TourCard';
import Container from '@/components/Container';
import Paginator from '@/components/Paginator';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { TabsContent } from '@/components/ui/tabs';
import { TourConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import { initializeI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { getCountries, getExperiences, getTours } from '@/services';
import { notFound } from 'next/navigation';
import TourFilters from './TourFilters';
import { getTravelType } from '@/services/travel-type';
import { Segment } from '@/types';
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

async function fetchTours(
  lang: string,
  urlSearchParams: { [key: string]: string },
) {
  const queryMapper = new QueryMapper(TourConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(urlSearchParams));
  return getTours({ locale: lang, ...criteria });
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

  const [resTours, resExperiences, resCountries, resTravelType] =
    await Promise.all([
      fetchTours(lang, {
        ...urlSearchParams,
        'travelTypes.slug': slug,
      }),
      getExperiences({ locale: lang }),
      getCountries({ locale: lang }),
      getTravelType(slug, lang),
    ]);

  if (
    !resTours ||
    !resTours.data ||
    !resExperiences ||
    !resExperiences.data ||
    !resCountries ||
    !resCountries.data ||
    !resTravelType ||
    !resTravelType.data
  ) {
    notFound();
  }

  const segments = [
    {
      id: '1',
      text: t('common.all_slug', { slug }),
      highlight: null,
      newline: false,
    },
    {
      id: '2',
      text: t('common.ideas'),
      highlight: 'secondary',
      newline: false,
    },
  ] as Segment[];

  return (
    <TabsContent value={`/travel-type/${slug}/tours`} className="mt-0">
      <Section>
        <SectionHeading segments={segments} />
        <Container className="space-y-20">
          <div className="space-y-7">
            <TourFilters
              experiences={resExperiences.data}
              destinations={resCountries.data}
              t={t}
            />
            <div className="grid gap-8 lg:grid-cols-12">
              {resTours.data?.map((tour, index) => {
                const isHeroCard =
                  index === 0 || index === resTours.data!.length - 1;

                return (
                  <div
                    key={tour.id}
                    className={cn(
                      'col-span-12',
                      isHeroCard ? 'lg:col-span-8' : 'lg:col-span-4',
                    )}>
                    <TourCard
                      tour={tour}
                      variant={isHeroCard ? 'hero' : 'standard'}
                      t={t}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Paginator
            currentPage={resTours.meta?.pagination.page || 1}
            totalPages={resTours.meta?.pagination.pageCount || 1}
          />
        </Container>
      </Section>
      {resTravelType.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={resTravelType.data.localizedSlugs}
          url="/travel-type/__slug__/tours"
        />
      )}
    </TabsContent>
  );
}
