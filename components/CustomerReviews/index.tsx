import Section from '@/components/sections/Section';
import { FilterValue, QueryCriteria } from '@/lib/query-mapper';
import { getCustomerReviews, getRatingStats } from '@/services';
import RatingStats from './RatingAverage';
import RatingDistribution, { RatingSummary } from './RatingDistribution';
import CustomerReviewCard from '../cards/CustomerReviewCard';
import Paginator from '../Paginator';
import SectionHeading from '../SectionHeading';
import Container from '../Container';
import { HeadingSection } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { Button } from '../ui/button';
import QueryString from 'qs';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

async function CustomerReviews({
  direction = 'row',
  pageSize = 10,
  showPaginator = true,
  buttonNavigation,
  t,
  lang,
  reviewsFilterCriteria = {},
  ratingStatsCriteria = {
    locale: lang,
  },
}: {
  lang: string;
  direction?: 'row' | 'column';
  pageSize?: number;
  showPaginator?: boolean;
  buttonNavigation?: {
    url: string;
    text: string;
  };
  t: TFunction<string[], string>;
  reviewsFilterCriteria?:
    | Record<string, FilterValue | FilterValue[]>
    | undefined;
  ratingStatsCriteria?: Record<string, FilterValue | FilterValue[]> | undefined;
}) {
  const criteria: QueryCriteria = {
    pagination: {
      page: 1,
      pageSize,
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
    filters: reviewsFilterCriteria,
    locale: lang,
  };
  const reviewsResponse = await getCustomerReviews(criteria);
  const ratingStatsResponse = await getRatingStats(
    QueryString.stringify(ratingStatsCriteria),
  );

  if (
    !reviewsResponse ||
    !reviewsResponse.data ||
    !ratingStatsResponse ||
    !ratingStatsResponse.data
  ) {
    return null;
  }

  const totalReviews = ratingStatsResponse.data.totalReviews || 0;
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
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] px-0 pb-8 lg:pb-16">
      <BackgroundImageWithFallback
        className="absolute inset-0 bg-center bg-no-repeat"
        url="/images/pattern.svg"
      />
      <div className="relative z-1">
        <SectionHeading
          segments={
            lang === 'en'
              ? section.heading.segments
              : section.heading.segments.reverse()
          }
          useContainer
        />
      </div>

      <Container className="-mt-8 max-w-1200 lg:-mt-16">
        {totalReviews > 0 ? (
          <>
            <div
              className={cn(
                'relative z-1 flex space-y-8',
                direction === 'row' ? 'flex-col' : 'flex-row justify-around',
              )}>
              <div
                className={cn(
                  'hidden gap-6 pb-6 lg:flex',
                  direction === 'row'
                    ? 'flex-col justify-between border-b border-b-gray-300 lg:flex-row'
                    : 'items-between flex-col',
                )}>
                <RatingStats
                  average={ratingStatsResponse.data.avgRating}
                  total={ratingStatsResponse.data.totalReviews}
                  t={t}
                />
                <RatingDistribution ratingStats={ratingStats} t={t} />
              </div>
              {reviewsResponse?.data && (
                <div
                  className={cn(
                    'flex flex-col gap-8',
                    direction === 'row' ? 'w-full' : 'max-w-[725px]',
                  )}>
                  {/* TODO: adjust to make a reuse component with customer review in WhyChooseUs section */}
                  {reviewsResponse?.data.map(review => (
                    <CustomerReviewCard
                      lang={lang}
                      key={review.id}
                      review={review}
                    />
                  ))}
                  {buttonNavigation && (
                    <Link href={buttonNavigation.url}>
                      <Button className="bg-white" variant="outline">
                        {buttonNavigation.text}
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
            {showPaginator &&
              reviewsResponse?.meta?.pagination.pageCount !== 1 && (
                <Paginator
                  currentPage={reviewsResponse.meta?.pagination.page ?? 1}
                  totalPages={reviewsResponse.meta?.pagination.pageCount ?? 1}
                />
              )}
          </>
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

export default CustomerReviews;
