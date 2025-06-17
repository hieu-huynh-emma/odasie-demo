'use client';

import { cn } from '@/lib/utils';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { format } from 'date-fns';
import { FlexibleSliderTimeline } from '@/types';

type Props = {
  timeline: FlexibleSliderTimeline;
  darkMode?: boolean;
};

export default function Timeline({ timeline: { dates }, darkMode }: Props) {
  if (!dates?.length) return null;

  return (
    <div className="flex w-full justify-start">
      <div className="flex min-h-[56px] min-w-[300px]">
        {dates.map((item, index) => (
          <div
            key={`timeline-${index}`}
            className="flex flex-col items-end justify-center">
            <div className="relative flex w-full items-center justify-center">
              <div
                className={cn(
                  'w-[60px] border-t',
                  index === 0 && 'w-[20px]',
                  darkMode && 'border-black',
                )}
              />
              {item.isActive ? (
                <div className="relative -mt-[5px] flex flex-col items-center">
                  <ImageWithFallback
                    src="/images/icons/odasie-icon.svg"
                    alt="timeline active"
                    width={18}
                    height={18}
                    style={{
                      width: 'auto',
                      height: 'auto',
                    }}
                  />
                  <span className="absolute top-[24px] text-lg font-bold text-yellow-400 sm:text-2xl">
                    {format(item.date, 'yyyy')}
                  </span>
                </div>
              ) : (
                <div
                  className={cn(
                    'relative h-[8px] w-[8px] rounded-full bg-white',
                    darkMode && 'bg-black',
                  )}>
                  <span className="absolute -left-[14px] top-[18px] text-sm font-normal sm:text-base">
                    {format(item.date, 'yyyy')}
                  </span>
                </div>
              )}
              {index === dates.length - 1 && (
                <div
                  className={cn(
                    'w-[20px] border-t',
                    darkMode && 'border-black',
                  )}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
