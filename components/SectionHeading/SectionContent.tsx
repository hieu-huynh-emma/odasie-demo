'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '../ui/button';

const SectionRating = dynamic(() => import('./SectionRating'), {
  ssr: false,
  loading: () => null,
});

const ScrollToTargetButton = dynamic(() => import('../ScrollToTargetButton'), {
  ssr: false,
  loading: () => null,
});

type SectionContentProps = {
  ratingCountryId?: number;
  rating?: any;
  scrollElement?: {
    targetSelector?: string;
    label: string;
    href?: string;
  };
};

export default function SectionContent({
  ratingCountryId,
  rating,
  scrollElement,
}: SectionContentProps) {
  return (
    <>
      {ratingCountryId && (
        <Suspense fallback={null}>
          <SectionRating rating={rating} />
        </Suspense>
      )}
      {scrollElement && (
        <Suspense fallback={null}>
          <div className="mt-4 lg:mt-8">
            {scrollElement.href ? (
              <Link href={scrollElement.href}>
                <Button variant="primary" className="cursor-pointer">
                  {scrollElement.label}
                </Button>
              </Link>
            ) : (
              <ScrollToTargetButton
                targetSelector={scrollElement.targetSelector || ''}>
                {scrollElement.label}
              </ScrollToTargetButton>
            )}
          </div>
        </Suspense>
      )}
    </>
  );
}
