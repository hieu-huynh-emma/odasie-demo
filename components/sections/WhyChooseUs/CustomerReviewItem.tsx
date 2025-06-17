import Rating from '@/components/Rating';
import { CustomerReview } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { IMAGE_SIZES } from '@/utils/imageUtils';

type CustomerReviewItemProps = {
  review: CustomerReview;
};

function CustomerReviewItem({ review }: CustomerReviewItemProps) {
  return (
    <div className="overflow-hidden rounded-sm bg-white p-5 shadow-md lg:mx-15 lg:rounded-md">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-5">
          <Rating halfIncrement value={review.rating} />
          <p className="typo-lg-regular line-clamp-6 text-gray-900">
            {`“${review.comment}”`}
          </p>
        </div>
        <div className="flex flex-shrink-0 overflow-hidden rounded-sm lg:max-w-[212px]">
          {review?.image?.url && (
            <ImageWithFallback
              src={review.image?.formats?.small?.url || review.image?.url}
              alt={review.comment}
              width={0}
              height={0}
              sizes={IMAGE_SIZES.CARD}
              style={{ width: '100%', height: '212px' }}
              className="w-full"
              loading="eager"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerReviewItem;
