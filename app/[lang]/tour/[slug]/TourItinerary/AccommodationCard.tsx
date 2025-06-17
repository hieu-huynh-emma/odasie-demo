import Rating from '@/components/Rating';
import { Hotel } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

function AccommodationCard({ accommodation }: { accommodation: Hotel }) {
  return (
    <div className="flex flex-row gap-3 rounded-sm border border-gray-300 p-3">
      <div className="overflow-hidden rounded-[8px]">
        {accommodation?.image?.url && (
          <ImageWithFallback
            src={
              accommodation?.image?.formats?.small?.url ||
              accommodation?.image?.url
            }
            alt={accommodation?.name || ''}
            className="h-24 w-24 object-cover object-center"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div>
        <Rating value={accommodation.rating} hideEmptyStars halfIncrement />
        <h4 className="typo-lg-semibold mt-1 text-gray-900">
          {accommodation.name}
        </h4>
      </div>
    </div>
  );
}

export default AccommodationCard;
