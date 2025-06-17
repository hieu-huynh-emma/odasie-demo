'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import {
  Swiper as SwiperReact,
  SwiperProps as SwiperReactProps,
} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type SwiperProps = SwiperReactProps & {
  paginationElm?: React.ReactNode;
};

function Swiper({ paginationElm, ...swiperProps }: SwiperProps) {
  const swiperRef = useRef<SwiperType>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const props: SwiperProps = {
    ...swiperProps,
    modules: [
      Navigation,
      A11y,
      Autoplay,
      ...(Array.isArray(swiperProps.modules) ? swiperProps.modules : []),
    ],
    navigation: {
      prevEl: navigationPrevRef.current!,
      nextEl: navigationNextRef.current!,
    },
    onBeforeInit: (swiper: SwiperType) => {
      swiperRef.current = swiper;

      if (swiperProps.onBeforeInit) {
        swiperProps.onBeforeInit(swiper);
      }
    },
  };

  const onSlidePrev = () => {
    swiperRef.current?.slidePrev();
  };
  const onSlideNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="relative">
      <SwiperReact
        {...props}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      />
      {paginationElm ? (
        paginationElm
      ) : (
        <div className="">
          <button
            className="absolute -left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-lg lg:-left-5"
            ref={navigationPrevRef}
            onClick={onSlidePrev}>
            <ChevronLeft size={24} color="rgb(var(--colors-primary-500))" />
          </button>
          <button
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-lg lg:-right-5"
            ref={navigationNextRef}
            onClick={onSlideNext}>
            <ChevronRight size={24} color="rgb(var(--colors-primary-500))" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Swiper;
