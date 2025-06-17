'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { TourGallery } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type CarouselTourGalleryProps = {
  gallery: TourGallery;
};

function CarouselTourGallery({ gallery }: CarouselTourGalleryProps) {
  if (!gallery) {
    return null;
  }

  return (
    <Swiper
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
      {gallery.map(item => (
        <SwiperSlide key={item.id} className="!w-[90%]">
          <ImageWithFallback
            src={item.url}
            alt={'item.alt'}
            className="max-h-[400px] rounded-sm object-cover lg:rounded-md"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselTourGallery;
