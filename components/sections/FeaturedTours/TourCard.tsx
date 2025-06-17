'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { Clock3 } from 'lucide-react';

import { Tour } from '@/types';
import { getSizesByContainerWidth } from '@/utils/imageUtils';
import { IMAGE_SIZES } from '@/utils/imageUtils';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type TourCardProps = {
  tour: Tour;
  t: TFunction<string[], string>;
};

function TourCard({ tour, t }: TourCardProps) {
  const imageUrl = useResponsiveImage(tour.image, {
    defaultBreakpoint: 'md',
  });

  return (
    <div className="group relative overflow-hidden rounded-sm bg-white shadow-md lg:rounded-md">
      <div className="relative w-full overflow-hidden group-hover:opacity-75">
        <Link
          href={`/tour/${tour.slug}`}
          title={tour.title}
          className="tour-popup-link left-0 top-0 h-full w-full">
          <ImageWithFallback
            src={imageUrl}
            alt={tour.title}
            className="h-full w-full object-cover object-center"
            width={0}
            height={0}
            sizes={getSizesByContainerWidth('third')}
            priority
            style={{ width: '100%', height: '240px' }}
          />
        </Link>
      </div>
      <div className="mt-5">
        <div className="px-5">
          <h3 className="typo-xl-bold line-clamp-1 text-center text-gray-900">
            <Link href={`/tour/${tour.slug}`} title={tour.title}>
              {tour.title}
            </Link>
          </h3>
          <p className="typo-base-regular my-2 line-clamp-2 h-12 text-center text-gray-900">
            {tour.description}
          </p>
        </div>
        <div className="flex justify-between bg-gray-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <Clock3 size={18} color="rgb(var(--colors-secondary-500))" />
            <span className="typo-sm-regular text-gray-900">
              {t('common.day', { days: tour.duration })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={tour?.tourGuide?.avatar?.url}
              alt={tour.tourGuide?.name || 'tour guide'}
              width={0}
              height={0}
              sizes={IMAGE_SIZES.SIDEBAR}
              className="rounded-full"
              style={{ width: 24, height: 24 }}
            />
            {tour.tourGuide?.name && (
              <span className="typo-sm-regular text-gray-900">
                {t('common.guided_by', { name: tour.tourGuide?.name })}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-primary-500 py-2">
        <Link
          href={`/tour/${tour.slug}`}
          title={tour.title}
          className="flex items-center gap-1 px-3 py-2">
          <span className="typo-base-regular text-gray-900">
            {t('common.from')}
          </span>
          <span className="typo-2xl-semibold px-2 text-gray-900">
            {`${new Intl.NumberFormat().format(tour.startingPrice?.price)} ${tour.startingPrice?.currency}`}
          </span>
          <span className="typo-sm-regular text-gray-900">{`/ ${tour.startingPrice?.unit}`}</span>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
