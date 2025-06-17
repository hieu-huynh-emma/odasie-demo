import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

import Rating from '@/components/Rating';
import { CustomerReview } from '@/types';
import { MapPin } from 'lucide-react';
import { initializeI18n } from '@/lib/i18n';

type CustomerReviewCardProps = {
  review: CustomerReview;
  lang: string;
};

async function CustomerReviewCard({ lang, review }: CustomerReviewCardProps) {
  const { t } = await initializeI18n(lang, ['common']);
  return (
    <div className="overflow-hidden rounded-sm bg-white p-6 shadow-md lg:rounded-md">
      <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
        <div className="flex flex-[3] flex-col gap-4">
          <Rating value={review.rating} halfIncrement />
          <p className="typo-lg-regular text-gray-900">
            {`“${review.comment}”`}
          </p>
          <p className="typo-base-regular text-gray-500">
            {t('common.from_the') + ' '}
            <Link
              href={`/tour/${review?.tour?.slug}`}
              className="typo-base-semibold text-secondary-500 underline">
              {review?.tour?.title}
            </Link>{' '}
            {t('common.trip') + '.'}
          </p>
          <div className="flex flex-row items-center gap-2 text-gray-900">
            <MapPin size={18} />
            <span className="typo-base-regular text-gray-900">
              {review?.tour?.country?.name}
            </span>
          </div>
        </div>
        <div className="flex aspect-square h-[100px] w-[100px] flex-1 justify-end overflow-hidden lg:h-[212px] lg:w-[212px]">
          <ImageWithFallback
            src={review.image.url}
            alt={review.comment}
            width={212}
            height={212}
            className="lg:min-h-none max-h-[100px] rounded-sm object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerReviewCard;
