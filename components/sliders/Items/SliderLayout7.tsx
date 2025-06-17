'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import DynamicIcon from '@/components/DynamicIcon';
import Timeline from '@/components/Timeline';
import { FlexibleSliderDesign } from '@/types';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout7({ slider: { items, darkMode } }: Props) {
  const [{ name, icon, title, description, image, timeline }] = items;

  return (
    <div className="flex w-full flex-col gap-4 lg:bg-cover lg:bg-center lg:bg-no-repeat lg:p-0">
      <div className="flex h-full w-full flex-col items-start">
        {/* Text on the right */}
        <div className="flex w-full max-w-6xl flex-col justify-center text-left">
          <div className="mb-2 flex items-center gap-2">
            {icon && <DynamicIcon name={icon.name} size={24} />}
            <span className="text-base font-bold uppercase tracking-wide drop-shadow-lg">
              {name}
            </span>
          </div>
          <div className="mb-4 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
            {title}
          </div>
        </div>
      </div>
      {/* Image on the left */}
      <div className="flex w-full max-w-6xl flex-col justify-center gap-6 text-left lg:flex-row lg:gap-6">
        {image && (
          <div className="flex w-full max-w-[420px] flex-shrink-0 items-center justify-center lg:w-[420px]">
            <ImageWithFallback
              src={encodeURI(image.url)}
              alt={name}
              className="h-auto w-full rounded-2xl bg-no-repeat object-cover shadow-xl"
              width={0}
              height={0}
              sizes="(max-width: 640px) 100vw, 420px"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}

        {description && (
          <div className="mb-2 text-base drop-shadow-lg">{description}</div>
        )}
      </div>

      {/* Timeline at the bottom if present */}
      {timeline && (
        <div className="w-full">
          <Timeline timeline={timeline} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
}
