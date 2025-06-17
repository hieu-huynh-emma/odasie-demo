'use client';

import { useTranslation } from 'react-i18next';
import RatingComponent from '../Rating';

export default function SectionRating({ rating }: { rating: any }) {
  const { t } = useTranslation(['common']);

  return (
    <>
      {rating && (
        <div className="mt-4 flex items-center gap-2">
          <p className="typo-lg-bold text-white">{`${rating?.data?.avgRating || 0} / 5`}</p>
          <RatingComponent value={rating?.data?.avgRating || 0} halfIncrement />
          <p className="text-white">
            (
            {t(
              `common.total_reviews${rating?.data?.totalReviews > 1 ? '_plural' : ''}`,
              { total: rating?.data?.totalReviews || 0 },
            )}
            )
          </p>
        </div>
      )}
    </>
  );
}
