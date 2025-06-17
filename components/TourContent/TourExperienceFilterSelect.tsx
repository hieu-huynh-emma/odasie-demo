'use client';
import useSWR from 'swr';
import { useMemo, useState } from 'react';

import { Experience } from '@/types';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import TourGridResult from './TourGridResult';
import { QueryMapper } from '@/lib/query-mapper';
import { ExperienceConfig, TourConfig } from '@/configs';
import { getExperiences, getTours } from '@/services';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useBreakpoint from '@/hooks/useBreakPoint';
import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import CarouselFeaturedTour from '../sections/FeaturedTours/CarouselFeaturedTour';

type Props = {
  lang: string;
  params?: { [key: string]: string };
  showAllUrl: string;
  showAllText: string;
};

const chipClassName = 'min-w-[90px] border bg-white px-4 py-[10px]';

export default function TourExperienceFilterSelect({
  lang,
  params = {},
  showAllUrl,
  showAllText,
}: Props) {
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const { t } = useTranslation(['common']);
  const { isMobile } = useBreakpoint();

  // Fetch tours based on selected experience
  const { data: tours, isLoading: isTourLoading } = useSWR(
    ['/api/tours', selectedExperience],
    () => fetchTours(lang, params, selectedExperience),
  );

  // Fetch experiences
  const { data: experiences, isLoading: isExperiencesLoading } = useSWR(
    '/api/experiences',
    () => fetchExperiences(lang, params),
  );

  if (isTourLoading && isExperiencesLoading) {
    return (
      <div className="h-10 w-full">
        <Spinner size="large" />
      </div>
    );
  }

  if (tours?.data?.length === 0 && selectedExperience === 'all') {
    return <div className="mb-8 lg:mb-16" />;
  }

  return (
    <Section
      bg="secondary"
      className="scroll-to-tour-elm ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] pt-4 lg:pt-8">
      <Container className="max-w-1200">
        <div className="flex flex-col gap-y-5 pb-8">
          <ExperienceToggleGroup
            experiences={experiences?.data || []}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
            t={t}
            isLoading={isExperiencesLoading}
          />
          {isTourLoading ? (
            <div className="h-10 w-full">
              <Spinner size="large" />
            </div>
          ) : (
            <>
              {isMobile ? (
                <CarouselFeaturedTour tours={tours?.data || []} />
              ) : (
                <TourGridResult t={t} tours={tours?.data || []} />
              )}
              <div className="flex w-full justify-center">
                <Link href={showAllUrl}>
                  <Button variant="outline" className="border bg-white">
                    {showAllText}
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}

// Helper function to fetch tours
async function fetchTours(
  lang: string,
  params: { [key: string]: string },
  selectedExperience: string,
) {
  const queryMapper = new QueryMapper(TourConfig);
  const queryParams = { ...params };

  if (selectedExperience !== 'all') {
    queryParams['experiences.slug'] = selectedExperience;
  }

  const criteria = queryMapper.fromUrl(new URLSearchParams(queryParams));
  return getTours({ locale: lang, ...criteria });
}

// Helper function to fetch experiences
async function fetchExperiences(
  lang: string,
  params: { [key: string]: string },
) {
  const queryMapper = new QueryMapper(ExperienceConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(params));
  return getExperiences({ locale: lang, ...criteria });
}

// Toggle group component for experiences
function ExperienceToggleGroup({
  experiences,
  selectedExperience,
  setSelectedExperience,
  t,
  isLoading,
}: {
  experiences: Experience[];
  selectedExperience: string;
  setSelectedExperience: (value: string) => void;
  t: TFunction<string[], string>;
  isLoading: boolean;
}) {
  const experienceOptions = useMemo(
    () => [
      { name: t('common.all'), slug: 'all' } as Experience,
      ...experiences,
    ],
    [experiences, t],
  );

  if (isLoading) {
    return <div className="h-10 w-full" />;
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full justify-start lg:justify-center">
      <ToggleGroup
        value={selectedExperience}
        defaultValue="all"
        className="hidden max-w-full flex-wrap justify-start gap-2 lg:flex"
        onValueChange={setSelectedExperience}
        type="single">
        <ToggleGroupItem className={chipClassName} value="all">
          {t('common.all')}
        </ToggleGroupItem>
        {experiences.map(experience => (
          <ToggleGroupItem
            key={experience.slug}
            className={chipClassName}
            value={experience.slug}>
            {experience.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="block lg:hidden">
        <Select
          onValueChange={setSelectedExperience}
          value={selectedExperience}>
          <SelectTrigger className="min-w-[200px] max-w-[265px] bg-white">
            <SelectValue placeholder={selectedExperience} />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map(option => (
              <SelectItem key={option.slug} value={option.slug}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
