'use client';

import DynamicIcon from '@/components/DynamicIcon';
import Timeline from '@/components/Timeline';
import { FlexibleSliderDesign } from '@/types';

interface Props {
  slider: FlexibleSliderDesign;
}

export default function SliderLayout3({ slider: { items, darkMode } }: Props) {
  const [item1, item2] = items;

  return (
    <div className="flex h-full w-full flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-12 lg:bg-cover lg:bg-center lg:bg-no-repeat">
      {/* Left Block */}
      <div className="flex flex-col justify-start text-left">
        <div className="mb-2 flex items-center gap-2">
          {item1.icon && <DynamicIcon name={item1.icon.name} size={24} />}
          <span className="text-lg font-bold uppercase tracking-wide drop-shadow-lg">
            {item1.name}
          </span>
        </div>
        {item1.subTitle && (
          <div className="font-semibolddrop-shadow-lg mb-2 text-base">
            {item1.subTitle}
          </div>
        )}
        {item1.title && (
          <div className="mb-4 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
            {item1.title}
          </div>
        )}
        {item1.description && (
          <div className="text-base drop-shadow-lg">{item1.description}</div>
        )}
        {item1.timeline && (
          <div className="mb-4 flex justify-center lg:justify-start">
            <Timeline timeline={item1.timeline} darkMode={darkMode} />
          </div>
        )}
      </div>

      {/* Right Block */}
      <div className="flex flex-col-reverse justify-start text-left lg:flex-col">
        {item2.timeline && (
          <div className="mb-4 flex justify-center lg:justify-start">
            <Timeline timeline={item2.timeline} darkMode={darkMode} />
          </div>
        )}
        <div>
          <div className="mb-2 mt-4 flex items-center gap-2">
            {item2.icon && <DynamicIcon name={item2.icon.name} size={24} />}
            <span className="tracking-wid text-lg font-bold uppercase drop-shadow-lg">
              {item2.name}
            </span>
          </div>
          {item2.subTitle && (
            <div className="mb-2 text-base font-semibold drop-shadow-lg">
              {item2.subTitle}
            </div>
          )}
          {item2.title && (
            <div className="mb-4 text-2xl font-bold uppercase leading-tight drop-shadow-lg lg:text-3xl">
              {item2.title}
            </div>
          )}
          {item2.description && (
            <div className="text-base drop-shadow-lg">{item2.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
