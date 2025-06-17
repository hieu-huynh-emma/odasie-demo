'use client';

import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTourItinerary } from './TourItineraryProvider';
import { useEffect, useRef } from 'react';

function DaysNavigation() {
  const swiperRef = useRef<SwiperType>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const { itinerary, setCurrentDay, activeDay } = useTourItinerary();

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeDay) {
      swiperRef.current.slideTo(activeDay);
    }
  }, [activeDay, swiperRef]);

  const onSlideChange = (swiper: SwiperType) => {
    setCurrentDay(swiper.activeIndex);
  };

  const onSlideClick = (swiper: SwiperType) => {
    swiper.slideTo(swiper.clickedIndex);
  };

  const onSlidePrev = () => {
    swiperRef.current?.slidePrev();
  };
  const onSlideNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative">
      <Swiper
        slidesPerView="auto"
        modules={[Navigation]}
        centeredSlidesBounds
        className=""
        onSlideChange={onSlideChange}
        onClick={onSlideClick}
        onReachEnd={swiper => (swiper.snapGrid = [...swiper.slidesGrid])}
        onBeforeInit={(swiper: SwiperType) => (swiperRef.current = swiper)}>
        {itinerary.map((item, index) => (
          <SwiperSlide
            key={item.id}
            className="group !flex !w-fit max-w-[300px] !flex-row hover:cursor-pointer hover:bg-gray-200">
            <div className="flex flex-col px-6 pb-2 pt-2 group-[.swiper-slide-active]:border-b-4 group-[.swiper-slide-active]:border-primary-600 group-[.swiper-slide-active]:bg-white">
              <strong className="typo-base-semibold text-gray-900">
                {item.title}
              </strong>
              <span className="typo-base-regular line-clamp-3 h-17">
                {item.subTitle}
              </span>
            </div>
            {index !== itinerary.length - 1 && (
              <div className="flex flex-col items-center justify-center px-3 py-10">
                <ChevronRight className="h-7 w-7 text-gray-400" />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="">
        {activeDay !== 0 && (
          <button
            className="absolute -left-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-lg"
            ref={navigationPrevRef}
            onClick={onSlidePrev}>
            <ChevronLeft size={24} color="rgb(var(--colors-primary-500))" />
          </button>
        )}
        {activeDay !== itinerary.length - 1 && (
          <button
            className="absolute -right-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-lg"
            ref={navigationNextRef}
            onClick={onSlideNext}>
            <ChevronRight size={24} color="rgb(var(--colors-primary-500))" />
          </button>
        )}
      </div>
    </div>
  );
}

export default DaysNavigation;
