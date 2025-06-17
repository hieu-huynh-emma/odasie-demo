'use client';

import { SwiperSlide } from 'swiper/react';

import Swiper from '@/components/Swiper';
import { BlogArticle } from '@/types';

import BlogArticleCard from './BlogArticleCard';

type CarouselBlogArticleProps = {
  articles: BlogArticle[];
};

function CarouselBlogArticle({ articles }: CarouselBlogArticleProps) {
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
      slidesPerView={4}
      autoplay={false}
      centerInsufficientSlides>
      {articles.map((item, index) => {
        return (
          <SwiperSlide key={item.id}>
            <BlogArticleCard
              article={item}
              index={index}
              priority={index < 2}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CarouselBlogArticle;
