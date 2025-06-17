'use client';

import { useEffect } from 'react';
import { trackVoyageView } from '@/lib/tracking';

type VoyageTrackerProps = {
  country: string;
  language: string;
};

export default function VoyageTracker({
  country,
  language,
}: VoyageTrackerProps) {
  useEffect(() => {
    trackVoyageView(country, language);
  }, [country, language]);

  return null; // No UI
}
