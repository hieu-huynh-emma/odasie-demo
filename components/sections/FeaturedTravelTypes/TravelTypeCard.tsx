'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useTranslation } from 'react-i18next';

import { TravelType } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { getSizesByContainerWidth } from '@/utils/imageUtils';

type Props = {
  travelType: TravelType;
};

function TravelTypeCard({ travelType }: Props) {
  const { t } = useTranslation(['common']);
  const imageUrl = useResponsiveImage(travelType.image);

  return (
    <div className="group relative">
      <Link
        href={`/travel-type/${travelType.slug}`}
        title={travelType.name}
        className="block overflow-hidden rounded-sm lg:rounded-md">
        <ImageWithFallback
          src={imageUrl}
          alt={travelType.name}
          className="h-full w-full object-cover object-center transition-all group-hover:scale-105"
          width={0}
          height={0}
          sizes={getSizesByContainerWidth('quarter')}
          priority={true}
          style={{ width: '100%', height: '200px' }}
        />
      </Link>
      <h4 className="typo-2xl-bold mt-[15px] text-center text-gray-900">
        {travelType.name}
      </h4>
      <p className="typo-xl-regular mt-[15px] text-center text-gray-900">
        {t(`tour.total_tours${travelType.tours.length > 1 ? '_plural' : ''}`, {
          total: travelType.tours.length,
        })}
      </p>
    </div>
  );
}

export default TravelTypeCard;
