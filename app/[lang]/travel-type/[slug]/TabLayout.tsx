'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
type Props = {
  children: React.ReactNode;
  slug: string;
  hasReview?: boolean | null;
};

const extractTravelTypeSlug = (pathname: string) => {
  const match = pathname.match(/\/travel-type\/([^/]+)(\/tours|\/reviews)?/);
  return match ? match[0] : null;
};

export function TabLayout({ children, slug, hasReview }: Props) {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const tabValue = extractTravelTypeSlug(pathname) || `/travel-type/${slug}`;

  return (
    <Tabs value={tabValue} defaultValue={tabValue || `/travel-type/${slug}`}>
      <TabsList className="flex flex-row justify-center gap-2 bg-white pt-3">
        <TabsTrigger value={`/travel-type/${slug}`}>
          <Link href={`/travel-type/${slug}`} className="hover:text-gray-900">
            {t('common.overview')}
          </Link>
        </TabsTrigger>
        <TabsTrigger value={`/travel-type/${slug}/tours`}>
          <Link
            href={`/travel-type/${slug}/tours`}
            className="hover:text-gray-900">
            {t('common.tours')}
          </Link>
        </TabsTrigger>
        {hasReview && (
          <TabsTrigger value={`/travel-type/${slug}/reviews`}>
            <Link
              href={`/travel-type/${slug}/reviews`}
              className="hover:text-gray-900">
              {t('common.reviews')}
            </Link>
          </TabsTrigger>
        )}
      </TabsList>
      {children}
    </Tabs>
  );
}
