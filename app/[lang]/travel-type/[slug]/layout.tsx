import { notFound } from 'next/navigation';
import { initializeI18n } from '@/lib/i18n';
import { getTravelType } from '@/services/travel-type';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedTravelTypes from '@/components/sections/FeaturedTravelTypes';
import { TabLayout } from './TabLayout';
import { getCustomerReviews } from '@/services';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string; slug: string }>;
};

export default async function Page({ children, params }: Props) {
  const { lang, slug } = await params;
  const { t } = await initializeI18n(lang, ['common']);
  const travelTypeResponse = await getTravelType(slug, lang);

  if (!travelTypeResponse || !travelTypeResponse.data) {
    notFound();
  }

  const reviewsResponse = await getCustomerReviews({
    filters: {
      tour: {
        travelTypes: {
          documentId: travelTypeResponse.data.documentId,
        },
      },
    },
    pagination: { page: 1, pageSize: 1 },
    locale: lang,
    populate: {},
  });

  const hasReview = reviewsResponse.data && reviewsResponse.data.length > 0;

  return (
    <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
      <HeroSection
        lang={lang}
        section={{
          image: travelTypeResponse.data.image,
          heading: {
            segments: [
              {
                id: 1,
                text: travelTypeResponse.data.name,
                highlight: 'primary',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'center',
          },
          description: travelTypeResponse.data.content,
        }}
        shouldGradientBg
        scrollElement={{
          label: t('tour.see_adventure_ideas'),
          href: `/travel-type/${slug}/tours`,
        }}
      />
      <TabLayout slug={slug} hasReview={hasReview}>
        {children}
      </TabLayout>
      <FeaturedTravelTypes lang={lang} currentSlug={slug} t={t} />
    </main>
  );
}
