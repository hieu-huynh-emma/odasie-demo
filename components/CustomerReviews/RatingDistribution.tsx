import Rating from '@/components/Rating';
import { TFunction } from 'i18next';

export type RatingSummary = {
  rating: number;
  reviewCount: number;
};

type RatingDistributionProps = {
  ratingStats: RatingSummary[];
  t: TFunction<string[], string>;
};

function RatingDistribution({ ratingStats, t }: RatingDistributionProps) {
  return (
    <div className="space-y-3">
      {ratingStats.map(({ rating, reviewCount }) => (
        <div key={rating} className="flex items-center gap-20">
          <Rating value={rating} size={20} variant="secondary" />
          <span className="typo-sm-regular text-gray-500">
            {t(`common.total_reviews${reviewCount > 1 ? '_plural' : ''}`, {
              total: reviewCount,
            })}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RatingDistribution;
