'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';

import SliderLayout1 from './Items/SliderLayout1';
import SliderLayout2 from './Items/SliderLayout2';
import SliderLayout3 from './Items/SliderLayout3';
import SliderLayout4 from './Items/SliderLayout4';
import SliderLayout5 from './Items/SliderLayout5';
import SliderLayout6 from './Items/SliderLayout6';
import SliderLayout7 from './Items/SliderLayout7';
import {FlexibleSliderDesign} from '@/types';
import SliderItem from './Items';

// Slider settings for react-slick
const SLIDER_SETTINGS = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false,
            },
        },
    ],
};

interface Props {
    slider: FlexibleSliderDesign[];
}

// Map layout keys to their respective components
const SLIDER_COMPONENTS: Record<
    string,
    React.FC<{ slider: FlexibleSliderDesign }>
> = {
    layout1: SliderLayout1,
    layout2: SliderLayout2,
    layout3: SliderLayout3,
    layout4: SliderLayout4,
    layout5: SliderLayout5,
    layout6: SliderLayout6,
    layout7: SliderLayout7,
};

export default function FlexibleSlider({slider = []}: Props) {
    if (!slider?.length) return null;

    return (
        <div className="flexible-slider-container overflow-hidden rounded-sm lg:rounded-md">
            <Slider className="h-full w-full px-0" {...SLIDER_SETTINGS}>
                {slider.map((slide, index) => {
                    const SlideComponent = SLIDER_COMPONENTS[slide.layout];
                    if (!SlideComponent) {
                        console.warn(`Layout ${slide.layout} not found`);
                        return null;
                    }
                    return (
                        <SliderItem key={`${slide.layout}-${index}`} slider={slide}>
                            <SlideComponent slider={{...slide}}/>
                        </SliderItem>
                    );
                })}
            </Slider>
        </div>
    );
}
