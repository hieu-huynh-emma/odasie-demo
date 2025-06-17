'use client';
import { NavigationCard as NavigationCardType } from '@/types';
import { Button } from '../ui/button';
import DynamicIcon from '../DynamicIcon';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NavigationCard({
  card,
  url,
  lang,
}: {
  card: NavigationCardType | null;
  url: string | null;
  lang: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-[304px] overflow-hidden bg-gray-900 text-white shadow-lg">
      {/* Content */}
      <div className="p-4">
        {/* Image */}
        <img
          src={card?.image.url}
          className={cn(
            'mb-3 h-48 w-full rounded-xs object-cover transition-opacity',
            isLoading ? 'opacity-0' : 'opacity-100',
          )}
          onLoad={() => setIsLoading(false)}
        />
        <h3 className="typo-lg-semibold">{card?.title}</h3>
        <p className="mt-2 text-sm text-white">{card?.description}</p>

        <div className="mt-4 flex items-center gap-x-3">
          <Link href={`/${lang}${url ?? card?.url}`}>
            <Button>{card?.buttonLabel}</Button>
          </Link>
          <div className="flex items-center gap-x-2">
            <DynamicIcon
              name={card?.extraIcon?.name || ''}
              size={16}
              className="text-primary-500"
            />
            <span>{card?.extraInfo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
