import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Rating from '@/components/Rating';
import { Tour } from '@/types';
import { getCustomerReviews } from '@/services';
import { QueryCriteria } from '@/lib/query-mapper';
import { TFunction } from 'i18next';

type TourReviewsProps = {
  tour: Tour;
  t: TFunction<string[], string>;
};

async function TourReviews({ tour, t }: TourReviewsProps) {
  const criteria: QueryCriteria = {
    pagination: {
      page: 1,
      pageSize: 5,
    },
    populate: ['image'],
    filters: {
      tour: tour.id,
    },
  };
  const reviews = await getCustomerReviews(criteria);
  const ratingStats = Object.entries(tour.reviewsStats.ratingStats ?? {})
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([rating, value]) => ({ rating: Number(rating), value }));

  const totalReviews = tour.reviewsStats.totalReviews ?? 0;

  return (
    <>
      {totalReviews > 0 ? (
        <div>
          <div className="flex flex-col justify-between gap-6 border-b border-b-gray-300 pb-6 lg:flex-row">
            <div className="flex flex-col gap-4">
              <h2 className="typo-lg-regular text-primary-900">
                {t('common.average_rating')}
              </h2>
              <p className="typo-6xl-bold text-secondary-500">
                {`${tour.rating}/${ratingStats.length}`}
              </p>
              <Rating halfIncrement value={tour.rating} />
              {tour.reviewsStats?.totalReviews && (
                <p className="typo-lg-regular text-primary-900">
                  {t(
                    `common.total_reviews${tour.reviewsStats?.totalReviews > 1 ? '_plural' : ''}`,
                    {
                      total: tour.reviewsStats?.totalReviews,
                    },
                  )}
                </p>
              )}
            </div>

            <div className="space-y-3">
              {ratingStats.map(({ rating, value }) => (
                <div key={rating} className="flex items-center gap-20">
                  <Rating value={rating} size={20} variant="secondary" />
                  <span className="typo-sm-regular text-gray-500">
                    {t(`common.total_reviews${value > 1 ? '_plural' : ''}`, {
                      total: value,
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {reviews?.data && (
            <div className="mt-6 flex flex-col gap-8">
              {/* TODO: adjust to make a reuse component with customer review in WhyChooseUs section */}
              {reviews?.data.map(review => (
                <div
                  key={review.id}
                  className="overflow-hidden rounded-sm bg-white p-6 shadow-md lg:rounded-md">
                  <div className="flex flex-col justify-between gap-6 lg:flex-row">
                    <div className="flex flex-col gap-5">
                      <Rating value={review.rating} halfIncrement />
                      <p className="typo-lg-regular line-clamp-6 text-gray-900">
                        {`“${review.comment}”`}
                      </p>
                    </div>
                    <div className="flex aspect-square w-[200px] overflow-hidden rounded-sm">
                      <ImageWithFallback
                        src={review.image.url}
                        alt={review.comment}
                        width={0}
                        height={0}
                        sizes="100wh"
                        style={{ width: '100%', height: '100%' }}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto mb-10 flex flex-col items-center justify-center pb-6">
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
    </>
  );
}

export default TourReviews;
