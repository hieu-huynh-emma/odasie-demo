'use client';

import { SwiperSlide } from 'swiper/react';

import Swiper from '@/components/Swiper';
import { TravelType } from '@/types';

import TravelTypeCard from './TravelTypeCard';

type Props = {
  travelTypes: TravelType[];
};

function CarouselFeaturedTravelTypes({ travelTypes }: Props) {
  return (
    <Swiper
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      spaceBetween={32}
      slidesPerView={3}
      autoplay>
      {travelTypes
        .filter(item => item.tours.length > 0)
        .map(item => {
          return (
            <SwiperSlide key={item.id}>
              <TravelTypeCard travelType={item} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default CarouselFeaturedTravelTypes;
