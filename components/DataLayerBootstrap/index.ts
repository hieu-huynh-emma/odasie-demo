// components/DataLayerBootstrap/index.tsx
'use client';
import { trackUserData } from '@/lib/tracking';
import { VisitorType } from '@/lib/tracking';
import { useEffect } from 'react';

// DataLayer bootstrap component
// This should be included at the root of your app (e.g., in layout.tsx)
export function DataLayerBootstrap({
  visitorType = 'visitor',
  language = 'en',
  currency = 'usd',
  customer,
}: {
  visitorType?: VisitorType;
  language?: string;
  currency?: string;
  customer?: { email: string; phone: string };
}) {
  useEffect(() => {
    // Initialize dataLayer and push user_data once
    trackUserData(visitorType, language, currency, customer);
  }, [visitorType, language, currency, customer]);

  return null;
}
