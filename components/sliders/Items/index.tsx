'use client';

import React from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { FlexibleSliderDesign } from '@/types';
import { cn } from '@/lib/utils';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { getSizesByContainerWidth } from '@/utils/imageUtils';

interface Props {
  slider: FlexibleSliderDesign;
  children: React.ReactNode;
}

export default function SliderItem({ slider, children }: Props) {
  const imageUrl = useResponsiveImage(slider.bgImage, {
    defaultBreakpoint: 'lg',
  });
  return (
    <div className="h-full">
      <div className="item-content h-full w-full">
        <div
          className={cn(
            'relative h-[870px] w-full px-4 pt-4 text-white lg:h-[580px] lg:px-10 lg:pt-10',
            slider.darkMode && '!text-black',
            slider.layout === 'layout2' && 'lg:pr-0',
          )}>
          <ImageWithFallback
            src={imageUrl}
            alt=""
            fill
            sizes={getSizesByContainerWidth('full')}
            priority
            className="absolute inset-0 z-0 object-cover object-top"
          />
          <div className="relative z-10 h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
