'use client';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select';
import { getCountries, getRegions } from '@/services';
import { Region } from '@/types';
import { useMemo } from 'react';
import { Spinner } from '../ui/spinner';
import useSWR from 'swr';

export default function DestinationSelect({
  placeholder,
  value,
  onChange,
  lang,
}: {
  placeholder: string;
  lang: string;
  value: string;
  onChange: (regionSlug: string, countrySlug: string) => void;
}) {
  // Fetch tours based on selected experience
  const { data: regions, isLoading: isRegionsLoading } = useSWR(
    ['/api/regions'],
    () =>
      getRegions({
        populate: {
          country: {
            fields: ['name', 'slug'],
          },
        },
        locale: lang,
      }),
  );

  // Fetch experiences
  const { data: country, isLoading: isCountryLoading } = useSWR(
    '/api/country',
    () => getCountries({ locale: lang }),
  );

  const desttinationOptions = useMemo(() => {
    const grouped = regions?.data?.reduce(
      (acc, region) => {
        const countrySlug = region.country?.slug;
        if (!countrySlug) return acc;
        if (!acc[countrySlug]) {
          acc[countrySlug] = [];
        }
        acc[countrySlug].push(region);
        return acc;
      },
      {} as Record<string, Region[]>,
    );
    country?.data?.forEach(country => {
      if (grouped && !grouped[country.slug]) {
        grouped[country.slug] = [
          {
            country: {
              name: country.name,
              slug: country.slug,
              id: country.id,
              documentId: country.documentId,
            },
          } as any,
        ];
      }
    });
    return grouped;
  }, [regions?.data, country?.data]);

  if (isCountryLoading || isRegionsLoading || !desttinationOptions)
    return <Spinner className="mt-2 h-4 w-4" />;

  return (
    <Select
      onValueChange={value => {
        const [countrySlug, regionSlug] = value.split('__');
        onChange(regionSlug, countrySlug);
      }}
      value={value}
      name="destination">
      <SelectTrigger className="border-none px-0 py-1 text-gray-700 shadow-none focus:ring-0">
        <SelectValue
          placeholder={placeholder}
          className="placeholder:text-gray-400"
        />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {Object.entries(desttinationOptions).map(([countrySlug, regions]) => {
          const countryName = regions[0]?.country?.name;

          return (
            <SelectGroup key={countrySlug}>
              <SelectItem
                className="font-bold text-gray-900 hover:text-primary-500 hover:no-underline"
                value={countrySlug}>
                {countryName}
              </SelectItem>
              {regions.map(
                region =>
                  region.id && (
                    <SelectItem
                      key={region.id}
                      value={`${countrySlug}__${region.slug}`}
                      className="text-gray-700 hover:text-primary-500 hover:no-underline">
                      {region.name}
                    </SelectItem>
                  ),
              )}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
