import HeroSection from '@/components/sections/HeroSection';
import { getCountry, getCustomerReviews, getTours } from '@/services';
import { notFound } from 'next/navigation';
import LatestBlogPosts from '@/components/sections/LatestBlogArticles';
import FeaturedRegions from '@/components/sections/FeaturedRegions';
import { getRegions } from '@/services/region';
import { QueryMapper } from '@/lib/query-mapper';
import { RegionConfig } from '@/configs';
import { initializeI18n } from '@/lib/i18n';
import { DestinationTab } from './DestinationTab';

export default async function Layout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string; country: string }>;
  }>,
) {
  const { lang, country } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);

  const queryMapper = new QueryMapper(RegionConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?country.slug=${country}`),
  );
  const [countryResponse, regionResponse, toursResponse] = await Promise.all([
    getCountry(country, lang),
    getRegions({ ...criteria, locale: lang }),
    getTours({
      ...criteria,
      pagination: { pageSize: 1 },
      locale: lang,
      populate: {},
    }),
  ]);

  if (
    !countryResponse ||
    !countryResponse.data ||
    !regionResponse ||
    !regionResponse.data
  ) {
    notFound();
  }

  const reviewsResponse = await getCustomerReviews({
    filters: {
      tour: {
        country: {
          documentId: countryResponse.data.documentId,
        },
      },
    },
    pagination: { ...criteria.pagination, pageSize: 1 },
    locale: lang,
    populate: {},
  });

  const countryName = countryResponse.data.name;

  const hasLinkedTours = toursResponse.data && toursResponse.data.length > 0;

  const hasReview = reviewsResponse.data && reviewsResponse.data.length > 0;

  return (
    <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
      <HeroSection
        lang={lang}
        section={{
          image: countryResponse.data.image,
          heading: {
            segments: [
              {
                id: 1,
                text: countryName,
                highlight: 'primary',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'center',
          },
          description: countryResponse.data.overview,
        }}
        shouldGradientBg
        ratingCountryId={hasReview ? countryResponse.data.id : undefined}
        scrollElement={
          hasLinkedTours
            ? {
                label: t('common.travel_idea', { country: countryName }),
                href: `/destination/${country}/tours`,
              }
            : undefined
        }
      />
      <DestinationTab
        slug={country}
        countryName={countryName}
        hasLinkedTours={hasLinkedTours}
        hasReview={hasReview}>
        {props.children}
      </DestinationTab>
      <FeaturedRegions
        lang={lang}
        section={{
          heading: {
            segments: [
              {
                id: 1,
                text: `${t('common.areas')} `,
                highlight: 'secondary',
                newline: false,
              },
              {
                id: 1,
                text: t('common.you_might_like', { countryName }),
                highlight: null,
                newline: false,
              },
            ],
          },
        }}
        regions={regionResponse.data}
      />
      <LatestBlogPosts
        lang={lang}
        section={{
          heading: {
            segments: [
              {
                id: 1,
                text: t('common.everything_should_know'),
                highlight: null,
                newline: false,
              },
              {
                id: 1,
                text: t('common.about'),
                highlight: null,
                newline: true,
              },
              {
                id: 2,
                text: countryName,
                highlight: 'secondary',
                newline: false,
              },
            ],
          },
          numberOfItems: 10,
          country: countryResponse.data,
          callToAction: {
            id: 1,
            url: '/blog',
            newTab: false,
            label: t('blog.see_all'),
            type: 'secondary',
          },
        }}
      />
    </main>
  );
}
