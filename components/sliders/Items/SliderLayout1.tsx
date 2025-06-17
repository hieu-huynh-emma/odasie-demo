'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { FlexibleSliderDesign } from '@/types';
import DynamicIcon from '@/components/DynamicIcon';
import { getSizesByContainerWidth } from '@/utils/imageUtils';
import useResponsiveImage from '@/hooks/useResponsiveImage';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout1({ slider: { items } }: Props) {
  const [{ name, icon, title, subTitle, description, image }] = items;

  const imageUrl = useResponsiveImage(image, {
    defaultBreakpoint: 'md',
  });

  return (
    <div className="flex h-full flex-col items-start justify-start text-left lg:grid lg:w-full lg:grid-cols-12 lg:items-stretch lg:gap-8">
      {/* Text Content */}
      <div className="mb-4 flex flex-col justify-start lg:col-span-6 lg:mb-0">
        <div className="mb-2 flex items-center gap-2">
          {icon && <DynamicIcon name={icon.name} size={24} />}
          {name && (
            <span className="text-base font-bold uppercase tracking-wide">
              {name}
            </span>
          )}
        </div>
        {title && (
          <div className="mb-2 text-2xl font-bold uppercase lg:text-3xl">
            {title}
          </div>
        )}
      </div>
      {/* Image Content */}

      <div className="relative flex h-full w-full flex-col items-start justify-start lg:col-span-6">
        {subTitle && (
          <div className="mb-2 text-base font-semibold">{subTitle}</div>
        )}
        {description && (
          <div className="mx-auto mb-4 max-w-xl text-base md:mx-0 lg:mx-0">
            {description}
          </div>
        )}
        {image && (
          <ImageWithFallback
            src={imageUrl}
            alt={name || 'slider image'}
            className="mx-auto w-full rounded-sm object-cover shadow-lg sm:max-h-[200px] md:mx-0 md:max-h-[100px] lg:mx-0 lg:max-h-[280px] lg:rounded-md"
            width={0}
            height={0}
            sizes={getSizesByContainerWidth('third')}
            priority={true}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
}
