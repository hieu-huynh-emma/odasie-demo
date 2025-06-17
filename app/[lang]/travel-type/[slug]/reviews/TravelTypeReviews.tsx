import { HeadingSection, TravelType } from '@/types';
import { getCustomerReviews, getRatingStats } from '@/services';
import { QueryCriteria } from '@/lib/query-mapper';
import { TFunction } from 'i18next';
import RatingDistribution, {
  RatingSummary,
} from '@/components/CustomerReviews/RatingDistribution';
import Section from '@/components/sections/Section';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/Container';
import { cn } from '@/lib/utils';
import RatingStats from '@/components/CustomerReviews/RatingAverage';
import QueryString from 'qs';
import CustomerReviewCard from '@/components/cards/CustomerReviewCard';
import Paginator from '@/components/Paginator';
import { notFound } from 'next/navigation';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

type TravelTypeReviewsProps = {
  travelType: TravelType;
  page: number;
  t: TFunction<string[], string>;
  lang: string;
};

async function TravelTypeReviews({
  travelType,
  page = 1,
  t,
  lang,
}: TravelTypeReviewsProps) {
  const criteria: QueryCriteria = {
    pagination: {
      page,
      pageSize: 5,
    },
    populate: {
      image: {
        fields: ['*'],
      },
      tour: {
        fields: ['title', 'slug'],
        populate: {
          country: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    filters: {
      tour: {
        travelTypes: {
          documentId: travelType.documentId,
        },
      },
    },
    locale: lang,
  };
  const ratingStatsCriteria = {
    filters: {
      travelType: {
        id: travelType.id,
      },
    },
    locale: lang,
  };
  const [reviewsResponse, ratingStatsResponse] = await Promise.all([
    getCustomerReviews(criteria),
    getRatingStats(QueryString.stringify(ratingStatsCriteria)),
  ]);

  if (
    !reviewsResponse ||
    !reviewsResponse.data ||
    !ratingStatsResponse ||
    !ratingStatsResponse.data
  ) {
    notFound();
  }

  const totalReviews = ratingStatsResponse.data?.totalReviews || 0;
  const ratingStats: RatingSummary[] = Object.entries(
    ratingStatsResponse.data.ratingStats,
  )
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([rating, reviewCount]) => ({
      rating: Number(rating),
      reviewCount: Number(reviewCount),
    }));

  const section = {
    heading: {
      segments: [
        { id: 1, text: t('common.traveler'), highlight: null, newline: false },
        {
          id: 2,
          text: t('common.reviews'),
          highlight: 'secondary',
          newline: false,
        },
      ],
    } as HeadingSection,
  };

  return (
    <Section
      bg="secondary"
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] px-0 py-20">
      <BackgroundImageWithFallback
        className="absolute inset-0 bg-center bg-no-repeat"
        url="/images/pattern.svg"
      />
      <SectionHeading segments={section.heading.segments} useContainer />
      <Container className="max-w-1200">
        {totalReviews > 0 ? (
          <div className={cn('relative z-1 flex flex-col space-y-8')}>
            <div
              className={cn(
                'flex-col justify-between gap-6 border-b border-b-gray-300 pb-6 lg:flex lg:flex-row',
              )}>
              <RatingStats
                average={ratingStatsResponse.data.avgRating}
                total={ratingStatsResponse.data.totalReviews}
                t={t}
              />
              <RatingDistribution ratingStats={ratingStats} t={t} />
            </div>
            {reviewsResponse?.data && (
              <div className={cn('flex w-full flex-col gap-8')}>
                {/* TODO: adjust to make a reuse component with customer review in WhyChooseUs section */}
                {reviewsResponse?.data.map(review => (
                  <CustomerReviewCard
                    lang={lang}
                    key={review.id}
                    review={review}
                  />
                ))}
              </div>
            )}
            {reviewsResponse?.meta?.pagination.pageCount !== 1 && (
              <Paginator
                currentPage={reviewsResponse.meta?.pagination.page ?? 1}
                totalPages={reviewsResponse.meta?.pagination.pageCount ?? 1}
              />
            )}
          </div>
        ) : (
          <div className="mx-auto mb-10 flex flex-col items-center justify-center">
            <ImageWithFallback
              src="/images/EmptyInbox.svg"
              alt="No reviews"
              width={300}
              height={300}
              className="mx-auto"
            />
            <p className="typo-xl-regular">{t('common.empty_reviews')}</p>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default TravelTypeReviews;
