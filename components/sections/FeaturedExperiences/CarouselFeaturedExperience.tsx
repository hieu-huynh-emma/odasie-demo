'use client';

import { SwiperSlide } from 'swiper/react';

import Swiper from '@/components/Swiper';
import { Experience } from '@/types';

import ExperienceCard from './ExperienceCard';

type CarouselFeaturedExperienceProps = {
  experiences: Experience[];
};

function CarouselFeaturedExperience({
  experiences,
}: CarouselFeaturedExperienceProps) {
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
      centerInsufficientSlides
      autoplay>
      {experiences
        .filter(item => item.tours.length > 0)
        .map(item => {
          return (
            <SwiperSlide key={item.id}>
              <ExperienceCard experience={item} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default CarouselFeaturedExperience;
