'use client';

import { Tour } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
type HeroTourCardProps = {
  tour: Tour;
};

function HeroTourCard({ tour }: HeroTourCardProps) {
  const { t } = useTranslation(['common']);
  const imageUrl = useResponsiveImage(tour.image, {
    defaultBreakpoint: 'md',
  });

  return (
    <div className="group relative h-full min-h-100 overflow-hidden rounded-sm lg:rounded-md">
      <ImageWithFallback
        src={imageUrl}
        alt={tour.title || ''}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <Link
        href={`/tour/${tour.slug}`}
        title={tour.title}
        className="absolute inset-0 z-2"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-white lg:p-10">
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="typo-3xl-bold line-clamp-2">{tour.title}</h2>
          <div className="mt-6 flex flex-col items-center gap-3 lg:flex-row">
            <span
              className={cn(
                buttonVariants({ variant: 'primary', size: 'md' }),
              )}>
              <span className="font-normal">{t('common.from')}</span>
              {`${new Intl.NumberFormat().format(tour.startingPrice?.price)} ${tour.startingPrice?.currency}`}{' '}
              {`/ ${tour.startingPrice?.unit}`}
            </span>
            <span
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'md' }),
              )}>
              {t('common.day', { days: tour.duration })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroTourCard;
