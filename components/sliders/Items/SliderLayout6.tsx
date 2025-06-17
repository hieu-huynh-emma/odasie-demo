'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import DynamicIcon from '@/components/DynamicIcon';
import Timeline from '@/components/Timeline';
import { FlexibleSliderDesign } from '@/types';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout6({ slider: { items, darkMode } }: Props) {
  const [{ name, icon, title, description, image, timeline }] = items;

  return (
    <div className="grid h-full max-h-[calc(100%-50px)] grid-cols-1 gap-6 sm:grid-cols-6 md:grid-cols-12 lg:grid-cols-12">
      <div className="col-span-1 flex h-full w-full flex-col justify-between gap-4 font-bold sm:col-span-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {icon && <DynamicIcon name={icon.name} size={24} />}
            <span className="text-lg sm:text-base">{name}</span>
          </div>
          <p className="text-2xl uppercase lg:text-3xl">{title}</p>
          <p className="text-base font-normal sm:text-sm">{description}</p>
        </div>
        {timeline && <Timeline timeline={timeline} darkMode={darkMode} />}
      </div>
      <div className="col-span-1 flex h-full w-full items-center justify-center overflow-hidden pb-4 sm:col-span-6">
        {image && (
          <ImageWithFallback
            src={encodeURI(image.url)}
            alt={name}
            className="bg-no-repeat object-cover"
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ width: 'auto', height: '100%' }}
          />
        )}
      </div>
    </div>
  );
}
