'use client';

import { SwiperSlide } from 'swiper/react';

import Swiper from '@/components/Swiper';
import { CustomerReview } from '@/types';
import CustomerReviewItem from './CustomerReviewItem';

type CarouselCustomerReviewProps = {
  reviews: CustomerReview[];
};

function CarouselCustomerReview({ reviews }: CarouselCustomerReviewProps) {
  return (
    <Swiper slidesPerView={1} autoplay={false}>
      {reviews.map(review => (
        <SwiperSlide key={review.id}>
          <CustomerReviewItem review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselCustomerReview;
