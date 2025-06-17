import { Star, StarHalf, LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';
import { clamp, roundToNearest } from '@/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type RatingProps = {
  value?: number;
  max?: number;
  halfIncrement?: boolean;
  size?: LucideProps['size'];
  className?: string;
  variant?: 'primary' | 'secondary';
  isCustom?: boolean;
  hideEmptyStars?: boolean;
};

const variantClassnames = {
  primary: 'fill-primary-500 text-primary-500',
  secondary: 'fill-gray-500 text-gray-500',
};

function Rating({
  value = 0,
  max = 5,
  halfIncrement,
  size = 24,
  className,
  variant = 'primary',
  isCustom = false,
  hideEmptyStars = false,
  ...attributes
}: RatingProps) {
  const precision = halfIncrement ? 0.5 : 1;
  const ratingValue = clamp(roundToNearest(value, precision), 0, max);
  const partiallyFilled = Number(!Number.isInteger(ratingValue));
  const filled = Math.ceil(ratingValue - partiallyFilled);
  const label = `${value} out of ${max}`;
  const backgroundStars = hideEmptyStars ? Math.ceil(ratingValue) : max;

  if (isCustom) {
    return (
      <div className="flex items-center gap-1">
        {[...Array(filled).keys()].map(key => (
          <ImageWithFallback
            aria-hidden="true"
            key={key}
            src={'/images/icons/rating.svg'}
            alt="star"
            width={14}
            height={14}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className={cn('relative inline-flex items-center', className)}
      {...attributes}>
      <div className="flex gap-2">
        {[...Array(backgroundStars).keys()].map(key => (
          <Star
            aria-hidden="true"
            key={key}
            className="fill-gray-300 text-gray-300"
            size={size}
          />
        ))}
      </div>

      <div className="absolute left-0 top-0 flex gap-2">
        {[...Array(filled).keys()].map(key => (
          <Star
            aria-hidden="true"
            key={key}
            className={variantClassnames[variant]}
            size={size}
          />
        ))}
        {Boolean(partiallyFilled) && (
          <StarHalf
            aria-hidden="true"
            key={filled}
            className={variantClassnames[variant]}
            size={size}
          />
        )}
      </div>
    </div>
  );
}

export default Rating;
