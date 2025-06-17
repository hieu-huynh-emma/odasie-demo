'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { tWithGrammar } from '@/utils/i18n';

type Props = {
  children: React.ReactNode;
  slug: string;
  countryName: string;
  hasLinkedTours?: boolean | null;
  hasReview?: boolean | null;
};

function extractTravelTypeSlug(pathname: string) {
  const match = pathname.match(/\/destination\/([^/]+)\/([^/]+)/);
  return match ? `/destination/${match[1]}/${match[2]}` : null;
}

export function DestinationTab({
  children,
  slug,
  countryName,
  hasLinkedTours,
  hasReview,
}: Props) {
  const pathname = usePathname();
  const tabValue = extractTravelTypeSlug(pathname) || `/destination/${slug}`;
  const { t, i18n } = useTranslation(['common']);

  // Get current language
  const lang = i18n.language;

  return (
    <Tabs value={tabValue} defaultValue={tabValue}>
      <TabsList className="scrollbar-hide relative flex flex-row justify-start gap-2 pl-4 pr-4 pt-3 md:justify-center">
        <TabsTrigger value={`/destination/${slug}`}>
          <Link
            href={`/destination/${slug}`}
            className="whitespace-nowrap hover:text-gray-900">
            <span className="hidden md:inline">
              {tWithGrammar(
                t,
                'common.discover_country',
                { countryName },
                lang,
              )}
            </span>
            <span className="inline md:hidden">{t('common.discover')}</span>
          </Link>
        </TabsTrigger>
        {hasLinkedTours && (
          <TabsTrigger value={`/destination/${slug}/tours`}>
            <Link
              href={`/destination/${slug}/tours`}
              className="whitespace-nowrap hover:text-gray-900">
              <span className="hidden md:inline">
                {tWithGrammar(t, 'common.tours_country', { countryName }, lang)}
              </span>
              <span className="inline md:hidden">{t('common.tours')}</span>
            </Link>
          </TabsTrigger>
        )}
        <TabsTrigger value={`/destination/${slug}/map`}>
          <Link
            href={`/destination/${slug}/map`}
            className="whitespace-nowrap hover:text-gray-900">
            {t('common.map')}
          </Link>
        </TabsTrigger>
        {hasReview && (
          <TabsTrigger value={`/destination/${slug}/reviews`}>
            <Link
              href={`/destination/${slug}/reviews`}
              className="whitespace-nowrap hover:text-gray-900">
              {t('common.reviews')}
            </Link>
          </TabsTrigger>
        )}
      </TabsList>
      {children}
    </Tabs>
  );
}
