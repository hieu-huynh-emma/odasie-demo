'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';
import { Image as ImageType } from '@/types';
import SliderWithArrowImage from './SliderWithArrowImage';

interface Props {
  slider: {
    image: ImageType;
    title: string;
    subTitle: string;
  }[];
}

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white md:left-4 md:h-12 md:w-12">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 translate-x-[2px] md:h-6 md:w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white md:right-4 md:h-12 md:w-12">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 translate-x-[5px] md:h-6 md:w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
);

export default function SliderWithArrows({ slider }: Props) {
  const [centerPadding, setCenterPadding] = useState('150px');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const updatePadding = () => {
      setCenterPadding(window.innerWidth < 768 ? '20px' : '150px');
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding,
    autoplay: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  return (
    <div className="relative mx-auto overflow-visible rounded-sm lg:rounded-md">
      <Slider className="slider-with-arrow" {...settings}>
        {slider.map((slide, i) => (
          <div
            key={i}
            className="relative mx-2 overflow-hidden rounded-sm px-4 md:px-6 lg:rounded-md">
            {/* Maintain aspect ratio using padding-bottom trick */}
            <div className="relative w-full overflow-hidden rounded-sm pb-[56.25%] lg:rounded-md">
              <SliderWithArrowImage
                image={slide.image}
                title={slide.title}
                i={i}
                currentSlide={currentSlide}
              />
            </div>

            {/* bottom-left text */}
            <div className="absolute bottom-8 left-6 z-10 text-white md:bottom-12 md:left-12">
              <h2 className="text-lg font-bold md:text-2xl">{slide.title}</h2>
              <p className="text-xs opacity-90 md:text-sm">{slide.subTitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
