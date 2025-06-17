'use client';

import { SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';

import Swiper from '@/components/Swiper';
import { Tour } from '@/types';

import TourCard from './TourCard';

type CarouselFeaturedTourProps = {
  tours: Tour[];
};

function CarouselFeaturedTour({ tours }: CarouselFeaturedTourProps) {
  const { t } = useTranslation(['common']);
  return (
    <Swiper
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={32}
      slidesPerView={3}
      centerInsufficientSlides
      centeredSlidesBounds
      autoplay>
      {tours.map(item => {
        return (
          <SwiperSlide key={item.id}>
            <TourCard tour={item} t={t} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CarouselFeaturedTour;
