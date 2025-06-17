'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { FeatureBlockDetail } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import VideoMedia from '../HeroSection/VideoMedia';
import { cn } from '@/lib/utils';
import DynamicIcon from '@/components/DynamicIcon';
type FeatureBlockContentProps = {
  block: FeatureBlockDetail;
};

export default function FeatureBlockContent({
  block,
}: FeatureBlockContentProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sanitized = DOMPurify.sanitize(block.text);
      setContent(sanitized);
    }
  }, [block.text]);

  return (
    <div
      key={block.id}
      className="grid grid-cols-1 items-center gap-8 py-6 lg:grid-cols-12">
      <div
        className={cn(
          'flex-col items-center justify-center lg:col-span-5',
          block.textPosition === 'right' ? 'lg:order-2' : 'lg:order-1',
        )}>
        <div className="mb-4 inline-block rounded-lg bg-white/80 py-2">
          <h1 className="align-center lg:align-left relative inline text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
            {block.title}
            {block.icon && (
              <span className="absolute -right-7 bottom-0 inline-block align-middle lg:bottom-2">
                <DynamicIcon
                  name={block.icon.name}
                  size={24}
                  color={block.icon.color || undefined}
                />
              </span>
            )}
          </h1>
        </div>
        <div
          className="text-base text-gray-600 sm:text-lg md:text-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div
        className={cn(
          'flex items-center justify-center lg:col-span-7',
          block.textPosition === 'right' ? 'lg:order-1' : 'lg:order-2',
        )}>
        {block.image && (
          <ImageWithFallback
            src={encodeURI(block.image.url)}
            alt={block.title}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full rounded-lg border-r-8 border-blue-200 object-cover shadow-md"
            priority
          />
        )}
        {block.video && (
          <div className="w-full">
            <VideoMedia src={block.video.src} poster={block.video.poster} />
          </div>
        )}
      </div>
    </div>
  );
}
