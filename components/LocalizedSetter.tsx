'use client';

import { useLocalized } from '@/contexts/LocalizedContext';
import { useEffect } from 'react';

export function LocalizedSetter({
  localizedSlugs,
  url,
}: {
  localizedSlugs?: { [key: string]: string };
  url?: string; // e.g. /tour/__slug__
}) {
  const { setLocalizedSlugs } = useLocalized();

  useEffect(() => {
    if (localizedSlugs) {
      if (url) {
        const updatedSlugs = Object.keys(localizedSlugs).reduce(
          (acc, key) => {
            acc[key] = url.replace('__slug__', localizedSlugs[key]);
            return acc;
          },
          {} as { [key: string]: string },
        );
        setLocalizedSlugs(updatedSlugs);
      } else {
        setLocalizedSlugs(localizedSlugs);
      }
    }
  }, [localizedSlugs, url, setLocalizedSlugs]);

  return null;
}
