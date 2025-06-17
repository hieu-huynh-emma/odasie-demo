'use client';

import DynamicIcon from '@/components/DynamicIcon';
import { FlexibleSliderDesign } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout2({ slider: { items } }: Props) {
  const [{ name, icon, title, description, image }, { image: image2 }] = items;

  return (
    <div
      className="flex h-full w-full flex-col items-start lg:grid lg:grid-cols-12 lg:gap-8 lg:bg-cover lg:bg-center lg:bg-no-repeat"
      style={{ backgroundPosition: 'right' }}>
      {/* Title and main text */}
      <div className="flex h-full flex-col justify-start text-left lg:col-span-8">
        <div className="mb-2 flex items-center gap-2">
          {icon && <DynamicIcon name={icon.name} size={24} />}
          {name && (
            <span className="text-base font-bold uppercase tracking-wide">
              {name}
            </span>
          )}
        </div>
        {title && (
          <div className="mb-6 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
            {title}
          </div>
        )}
        <div className="flex w-full flex-col items-start gap-4 md:flex-col lg:flex-row lg:justify-between">
          {image && (
            <div className="sn:max-h-[160px] h-full max-h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-lg md:max-h-[300px] lg:w-[120px]">
              <ImageWithFallback
                src={encodeURI(image.formats?.small?.url || image.url)}
                alt={name || 'slider image'}
                className="rounded-sm bg-top bg-no-repeat object-cover lg:max-h-[314px]"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          )}
          <div className="flex-1 text-base drop-shadow-lg">{description}</div>
        </div>
      </div>
      <div className="-mt-4 flex h-full w-full flex-row items-end justify-start lg:col-span-4 lg:mt-0 lg:justify-end">
        {image2 && (
          <ImageWithFallback
            src={encodeURI(image2.url)}
            alt={name || 'description'}
            className="w-full rounded-xl object-cover"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
}
