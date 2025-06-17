'use client';

import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useTranslation } from 'react-i18next';

import { Experience } from '@/types';
import { getSizesByContainerWidth } from '@/utils/imageUtils';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type ExperienceCardProps = {
  experience: Experience;
};

function ExperienceCard({ experience }: ExperienceCardProps) {
  const { t } = useTranslation(['common']);
  const imageUrl = useResponsiveImage(experience.image, {
    defaultBreakpoint: 'sm',
  });

  return (
    <div className="group relative">
      <Link
        href={`/discovery/experience/${experience.slug}`}
        title={experience.name}
        className="block overflow-hidden rounded-sm lg:rounded-md">
        <ImageWithFallback
          src={imageUrl}
          alt={experience.name}
          className="h-full w-full object-cover object-center transition-all group-hover:scale-105"
          width={0}
          height={0}
          sizes={getSizesByContainerWidth('quarter')}
          style={{ width: '100%', height: '200px' }}
          priority={true}
        />
      </Link>
      <h4 className="typo-2xl-bold mt-[15px] text-center text-gray-900">
        {experience.name}
      </h4>
      <p className="typo-xl-regular mt-[15px] text-center text-gray-900">
        {t(`tour.total_tours${experience.tours.length > 1 ? '_plural' : ''}`, {
          total: experience.tours.length,
        })}
      </p>
    </div>
  );
}

export default ExperienceCard;
