'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import FilterComponent from './FilterComponent';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '../ui/spinner';
import { trackSearch } from '@/lib/tracking';
import { useTranslation } from 'react-i18next';

export type Queries = {
  keyword: string;
  regionSlug: string;
  countrySlug: string;
  duration: string;
  duration_min?: string;
  duration_max?: string;
};
const availableQueryKeys = ['keyword', 'duration_min', 'duration_max'];

export default function HomeSearchBar({ lang }: { lang: string }) {
  const { t } = useTranslation(['common']);
  const [redirecting, setRedirecting] = useState(false);
  const { toast, dismiss } = useToast();
  const [queries, setQueries] = useState<Queries>({
    keyword: '',
    regionSlug: '',
    countrySlug: '',
    duration: '',
  });
  const router = useRouter();

  const onSearch = () => {
    if (!queries.countrySlug && !queries.regionSlug) {
      const { id: toastId } = toast({
        title: t('destination.title'),
        description: t('destination.description'),
        className: 'border-2 border-yellow-200 bg-yellow-500 text-black',
      });
      setTimeout(() => {
        dismiss(toastId);
      }, 60000);
      return;
    }
    setRedirecting(true);
    if (queries.duration) {
      const [min, max] = queries.duration.split('-');
      queries.duration_min = min;
      queries.duration_max = max;
    }

    trackSearch(
      queries.countrySlug,
      new Date().toISOString().split('T')[0], // today's date (can adjust)
      queries?.duration || '',
      queries?.keyword || '',
    );

    const filteredQueries = Object.fromEntries(
      Object.entries(queries).filter(
        ([key, value]) => availableQueryKeys.includes(key) && !!value,
      ),
    );
    router.push(
      `/destination/${queries.countrySlug}/tours?${new URLSearchParams(filteredQueries as any).toString()}`,
    );
  };

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[1024px] rounded-2xl bg-white shadow-lg">
      <div className="flex flex-col p-4 md:flex-row md:items-center md:gap-2">
        {/* Keyword */}
        <div className="mb-3 flex-1 md:mb-0 md:border-r md:border-gray-200 md:pr-2">
          <FilterComponent
            lang={lang}
            label={t('common.keyword')}
            placeholder={t('common.keyword_placeholder')}
            filterType="keyword"
            queries={queries}
            setQueries={setQueries}
            t={t}
          />
        </div>

        {/* Destination */}
        <div className="mb-3 flex-1 md:mb-0 md:border-r md:border-gray-200 md:px-2">
          <FilterComponent
            lang={lang}
            label={t('common.destination')}
            placeholder={t('common.destination_placeholder')}
            filterType="destination"
            queries={queries}
            setQueries={setQueries}
            t={t}
          />
        </div>

        {/* Duration */}
        <div className="mb-3 flex-1 md:mb-0 md:pl-2">
          <FilterComponent
            lang={lang}
            label={t('common.duration')}
            placeholder={t('common.duration_placeholder')}
            filterType="duration"
            queries={queries}
            setQueries={setQueries}
            t={t}
          />
        </div>

        {/* Search Button */}
        <div className="mt-2 w-full md:ml-2 md:mt-0 md:max-w-[80px]">
          <Button
            onClick={onSearch}
            variant="primary"
            className="flex h-14 w-full items-center justify-center rounded-full">
            {redirecting ? (
              <Spinner className="size-6 text-white" />
            ) : (
              <img
                src="/images/icons/search.svg"
                alt="search"
                className="size-6"
              />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
