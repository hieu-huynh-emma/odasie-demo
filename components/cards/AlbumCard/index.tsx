'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Image as ImageType } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { getSizesByContainerWidth } from '@/utils/imageUtils';

type AlbumCardProps = {
  image: ImageType;
  title: string;
  buttonText: string;
  buttonLink: string;
  targetSelector?: string;
};

function AlbumCard({
  image,
  title,
  buttonText,
  buttonLink,
  targetSelector,
}: AlbumCardProps) {
  const router = useRouter();
  const imageUrl = useResponsiveImage(image, {
    defaultBreakpoint: 'md',
  });

  const handleClick = () => {
    if (targetSelector) {
      const contentBlockElm = document.querySelector(targetSelector || '');
      if (contentBlockElm) {
        const rect = contentBlockElm.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 100,
          behavior: 'smooth',
        });
      }
    } else {
      router.push(buttonLink);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-sm shadow-lg lg:rounded-md">
      <div className="relative aspect-[3/4] max-h-[200px] w-full lg:max-h-none">
        <ImageWithFallback
          className="h-full max-h-[200px] w-full object-cover lg:max-h-none"
          src={imageUrl || '/images/default-image.jpg'}
          alt={title}
          fill
          sizes={getSizesByContainerWidth('quarter')}
          priority={true}
        />
        <div className="absolute bottom-0 flex h-[calc(100%-70px)] w-full flex-col items-center justify-end bg-gradient-to-t from-gray-900 to-transparent p-6">
          {/* title should be each word on a new line */}
          <h3 className="typo-xl-semibold mb-3 text-center text-white">
            {title}
          </h3>
          <div
            onClick={handleClick}
            className="typo-base-semibold flex cursor-pointer items-center gap-2 rounded-sm border border-white px-4 py-2 text-white transition-colors hover:bg-white hover:text-black lg:rounded-md">
            {buttonText}
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
