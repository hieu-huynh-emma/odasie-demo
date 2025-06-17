import { notFound } from 'next/navigation';

import { TourConfig } from '@/configs';
import Container from '@/components/Container';
import TourCard from '@/components/cards/TourCard';
import Paginator from '@/components/Paginator';
import Section from '@/components/sections/Section';
import SectionHeading from '@/components/SectionHeading';
import { TabsContent } from '@/components/ui/tabs';
import { QueryMapper } from '@/lib/query-mapper';
import { cn } from '@/lib/utils';
import { getTours } from '@/services';
import { initializeI18n } from '@/lib/i18n';

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

  const queryMapper = new QueryMapper(TourConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams({
      ...urlSearchParams,
      'experiences.slug': slug,
    }),
  );
  const resTours = await getTours({ locale: lang, ...criteria });

  if (!resTours || !resTours.data) {
    notFound();
  }

  return (
    <TabsContent value={`/experience/${slug}/tours`} className="mt-0">
      <Section>
        <SectionHeading />
        <Container className="space-y-20">
          <div className="space-y-7">
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
    </TabsContent>
  );
}
