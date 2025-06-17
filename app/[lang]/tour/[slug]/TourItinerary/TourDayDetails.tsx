'use client';

import { ChevronRight, ChevronLeft, Calendar, CheckCheck } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import { cn } from '@/lib/utils';
import { Tour } from '@/types';

import ListAccommodations from './ListAccommodations';
import { useTourItinerary } from './TourItineraryProvider';

import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import useResponsiveImage from '@/hooks/useResponsiveImage';

function TourDayDetails({
  className,
  tour,
}: {
  className?: string;
  tour: Tour;
}) {
  const { t } = useTranslation(['common']);
  const { tourDayDetails, setPrevDay, setNextDay, activeDay } =
    useTourItinerary();

  const imageUrl = useResponsiveImage(tour.image, {
    defaultBreakpoint: 'md',
  });

  if (!tourDayDetails) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <div className="relative">
        {tourDayDetails.images && tourDayDetails.images?.length > 0 ? (
          <Swiper
            className="h-61"
            navigation
            slidesPerView="auto"
            spaceBetween={28}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            style={
              {
                '--swiper-pagination-color': 'white',
                '--swiper-pagination-bullet-inactive-color':
                  'rgb(var(--colors-gray-400))',
                '--swiper-navigation-color': 'white',
                '--swiper-pagination-bullet-inactive-opacity': 1,
              } as React.CSSProperties
            }>
            {tourDayDetails.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <ImageWithFallback
                  src={image?.url}
                  alt={image.alt || 'day detail'}
                  fill
                  className="object-cover object-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ImageWithFallback
            src={imageUrl}
            alt={tourDayDetails.subTitle}
            className="h-51 w-full object-cover object-center lg:h-61"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="relative flex flex-col items-center justify-center border-b border-gray-300 bg-white px-12 py-6">
        <div className="typo-gray-900 typo-base-regular mb-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{tourDayDetails.title}</span>
        </div>
        <h3 className="typo-2xl-bold text-center text-gray-900">
          {tourDayDetails.subTitle}
        </h3>
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <button
            className={cn(
              'h-11 w-11 rounded-full bg-white p-2.5 text-center shadow-lg',
              activeDay === 0 && 'invisible',
            )}
            onClick={setPrevDay}>
            <ChevronLeft className="h-6 w-6 text-primary-500" />
          </button>
          <button
            className={cn(
              'h-11 w-11 rounded-full bg-white p-2.5 text-center shadow-lg',
              activeDay === tour.itinerary.length - 1 && 'invisible',
            )}
            onClick={setNextDay}>
            <ChevronRight className="h-6 w-6 text-primary-500" />
          </button>
        </div>
      </div>
      {tourDayDetails.description && (
        <div
          className="typo-base-regular px-8 py-5 text-gray-900"
          // TODO: fix dompurify on client
          dangerouslySetInnerHTML={{
            __html: tourDayDetails.description,
          }}
        />
      )}
      <div className="mt-2 flex flex-col gap-y-5 border-b border-gray-300 px-8 pb-7">
        {tourDayDetails.services && tourDayDetails.services.length > 0 && (
          <div className="flex flex-wrap gap-x-2">
            <CheckCheck className="text-secondary-500" />
            <div className="typo-base-bold">Daily Services:</div>
            {tourDayDetails.services.map((service, index) => (
              <div
                key={index}
                className="typo-base-regular border-r border-gray-300 pr-2 last:border-none">
                {service.text}
              </div>
            ))}
          </div>
        )}
        {tourDayDetails.meals && tourDayDetails.meals.length > 0 && (
          <div className="flex flex-wrap gap-x-2">
            <CheckCheck className="text-secondary-500" />
            <div className="typo-base-bold">{t('common.meals')}:</div>
            {tourDayDetails.meals.map((meal, index) => (
              <div
                key={index}
                className="typo-base-regular border-r border-gray-300 pr-2 last:border-none">
                {meal.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {tourDayDetails.hotels.length > 0 ? (
        <div className="py-5 pr-2">
          <ListAccommodations accommodations={tourDayDetails.hotels} t={t} />
        </div>
      ) : null}
    </div>
  );
}

export default TourDayDetails;
