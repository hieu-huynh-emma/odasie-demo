'use client';

import { SwiperSlide } from 'swiper/react';

import Swiper from '@/components/Swiper';
import DestinationCard from '@/components/cards/DestinationCard';
import { Region } from '@/types';

type CarouselFeaturedRegionsProps = {
  regions: Region[];
};

function CarouselFeaturedRegions({ regions }: CarouselFeaturedRegionsProps) {
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
      spaceBetween={24}
      slidesPerView={4}
      autoplay={false}
      centerInsufficientSlides>
      {regions.map(item => {
        return (
          <SwiperSlide key={item.id}>
            <DestinationCard
              className="h-120 rounded-sm lg:rounded-md"
              title={item.name}
              subtitle={item.country.name}
              image={item.image ?? item.country.image}
              url={`/destination/city/${item.slug}`}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CarouselFeaturedRegions;
