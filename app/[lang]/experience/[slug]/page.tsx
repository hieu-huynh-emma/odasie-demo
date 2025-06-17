import { notFound } from 'next/navigation';
import { initializeI18n } from '@/lib/i18n';
import { QueryMapper } from '@/lib/query-mapper';
import { TourConfig } from '@/configs';
import FeaturedTours from '@/components/sections/FeaturedTours';
import { TabsContent } from '@/components/ui/tabs';
import { getExperience, getTours } from '@/services';
import { TourSection } from '@/types';

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
  const criteria = queryMapper.fromUrl(new URLSearchParams(urlSearchParams));
  const [resExp, toursResponse] = await Promise.all([
    getExperience(slug, lang),
    getTours({ locale: lang, ...criteria }),
  ]);

  if (!resExp || !resExp.data || !toursResponse || !toursResponse.data) {
    notFound();
  }

  return (
    <TabsContent value={`/experience/${slug}`} className="mt-0">
      <FeaturedTours
        lang={lang}
        section={
          {
            heading: {
              segments: [
                {
                  id: 1,
                  text: t('common.experience'),
                  highlight: null,
                  newline: false,
                },
                {
                  id: 2,
                  text: resExp.data.name,
                  highlight: 'secondary',
                  newline: false,
                },
              ],
            },
            numberOfItems: 6,
            bgColor: 'secondary',
            callToAction: {
              label: t('experience.see_all_tours'),
              id: 1,
              url: '/',
              newTab: false,
              type: 'secondary',
            },
          } as TourSection
        }
      />
    </TabsContent>
  );
}
