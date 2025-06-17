'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';
import { getSizesByContainerWidth } from '@/utils/imageUtils';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type DestinationCardProps = {
  title: string;
  subtitle?: string;
  image: ImageType;
  url: string;
  variant?: 'featured' | 'secondary';
  className?: string;
};

function DestinationCard({
  title,
  subtitle,
  image,
  url,
  variant,
  className,
}: DestinationCardProps) {
  const imageUrl = useResponsiveImage(image, {
    defaultBreakpoint: 'sm',
  });
  return (
    <div
      className={cn(
        'group relative h-full overflow-hidden after:absolute after:inset-0 after:block after:bg-gradient-to-t after:from-black after:to-black/0 after:opacity-30 lg:min-h-[285px]',
        variant === 'featured' ? 'row-span-2' : '',
        variant === 'featured' ? 'min-h-75' : 'min-h-50',
        className,
      )}>
      <Link href={url} title={title} className={cn('absolute inset-0 z-3')} />
      <ImageWithFallback
        src={imageUrl}
        alt={title}
        className="absolute left-0 top-0 object-cover object-center transition-all group-hover:scale-105"
        width={0}
        height={0}
        sizes={getSizesByContainerWidth('third')}
        style={{ width: '100%', height: '100%' }}
        priority
      />
      <div className="relative z-2 flex h-full flex-col items-center justify-end p-6 text-center">
        {subtitle && (
          <p className="text-smaller-xl typo-xl-regular uppercase text-white">
            {subtitle}
          </p>
        )}
        <h4 className="text-smaller-3xl typo-3xl-bold uppercase text-white">
          {title}
        </h4>
      </div>
    </div>
  );
}

export default DestinationCard;
