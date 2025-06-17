//components/SPAPageViewTracker/index.tsx
'use client';

import { useSPAPageViewTracking, VisitorType } from '@/lib/tracking';

export default function SPAPageViewTracker({
  language,
  currency,
  visitor_type,
  email,
}: {
  language: string;
  currency: string;
  visitor_type: VisitorType;
  email: string;
}) {
  useSPAPageViewTracking(language, currency, visitor_type, email);
  return null;
}
