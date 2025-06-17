'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import DynamicIcon from '@/components/DynamicIcon';
import Timeline from '@/components/Timeline';
import { FlexibleSliderDesign } from '@/types';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout4({ slider: { items, darkMode } }: Props) {
  const [{ name, icon, title, description, timeline, image }] = items;

  return (
    <div className="flex h-full w-full flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="flex h-full flex-col justify-start text-left lg:col-span-7">
        <div className="mb-2 flex items-center gap-2">
          {icon && <DynamicIcon name={icon.name} size={24} />}
          {name && (
            <span className="text-base font-bold uppercase tracking-wide drop-shadow-lg">
              {name}
            </span>
          )}
        </div>
        {title && (
          <div className="mb-4 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
            {title}
          </div>
        )}
        {description && (
          <div className="mb-4 text-base drop-shadow-lg">{description}</div>
        )}
        {timeline && (
          <div className="pt-4">
            <Timeline timeline={timeline} darkMode={darkMode} />
          </div>
        )}
      </div>
      <div className="h-full flex-col items-center justify-center text-left lg:col-span-5 lg:flex lg:h-full">
        {image && (
          <ImageWithFallback
            src={encodeURI(image.url)}
            alt={name || 'description'}
            className="h-full w-full rounded-xl object-cover sm:h-[160px]"
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
}
