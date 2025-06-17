'use client';

import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Image } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';

interface SeasonGuideProps {
  backgroundImageUrl: Image | null;
  weatherChartUrl: Image | null;
  title: string;
  highlight: string;
  content: string;
}

export default function SeasonGuide({
  backgroundImageUrl,
  weatherChartUrl,
  title,
  highlight,
  content,
}: SeasonGuideProps) {
  const [guide, setGuide] = useState('');

  const ImageUrl = useResponsiveImage(backgroundImageUrl);

  const weatherChartImageUrl = useResponsiveImage(weatherChartUrl, {
    defaultBreakpoint: 'lg',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sanitized = DOMPurify.sanitize(content);
      setGuide(sanitized);
    }
  }, [content]);

  return (
    <section
      className="relative -mt-8 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] bg-cover bg-center text-white lg:-mt-16"
      style={{ backgroundImage: `url(${ImageUrl})` }}>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-medium md:text-5xl">
          {title.split(new RegExp(`(${highlight})`, 'i')).map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <span key={i} className="uppercase text-primary-500">
                {part}
              </span>
            ) : (
              <span className="uppercase" key={i}>
                {part}
              </span>
            ),
          )}
        </h1>
        {/* Render HTML paragraphs */}
        <div
          className="mt-8 space-y-6 text-sm leading-relaxed !text-white md:text-base"
          dangerouslySetInnerHTML={{
            __html: guide,
          }}
        />
      </div>

      <div className="relative z-10 flex justify-center px-4 pb-10 lg:pb-20">
        {weatherChartUrl && (
          <ImageWithFallback
            src={weatherChartImageUrl}
            alt="Monthly weather chart"
            className="w-full max-w-4xl rounded-sm shadow-lg lg:rounded-xl"
            width={500}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
    </section>
  );
}
