'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';
import { Image } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { useTranslation } from 'react-i18next';

type AgentCardProps = {
  agent: {
    documentId: string;
    name: string;
    quote: string;
    profileImageUrl: Image | null;
    backgroundImageUrl: Image | null;
    buttonText?: string;
    altText?: string;
  };
};

const AgentCard = ({ agent }: AgentCardProps) => {
  const {
    name,
    quote,
    profileImageUrl,
    backgroundImageUrl,
    buttonText = `Plan a Trip with ${name}`,
    altText = `${name} profile picture`,
  } = agent;

  const { t } = useTranslation(['common']);

  const profileImageUrlFormatted = useResponsiveImage(profileImageUrl, {
    defaultBreakpoint: 'sm',
  });

  const backgroundImageUrlFormatted = useResponsiveImage(backgroundImageUrl, {
    defaultBreakpoint: 'lg',
  });

  return (
    <div className="flex items-center justify-center p-2 sm:px-0 lg:px-24">
      <div className="relative w-full overflow-hidden rounded-sm shadow-lg lg:rounded-xl">
        <BackgroundImageWithFallback
          className="absolute inset-0 bg-cover bg-center"
          url={backgroundImageUrlFormatted}
        />

        <div className="absolute inset-0 rounded-sm bg-black bg-opacity-30 lg:rounded-xl"></div>

        <div className="relative z-10 flex flex-col items-center p-8 text-center text-white md:p-12">
          <ImageWithFallback
            src={profileImageUrlFormatted}
            alt={altText}
            width={96}
            height={96}
            className="mb-4 h-20 w-20 rounded-full border-4 border-white object-cover shadow-md md:h-24 md:w-24"
          />

          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            {t('common.more_question', { name })}
          </h2>

          <p className="mb-6 max-w-xl text-sm opacity-90 md:text-base">
            {quote}
          </p>

          <Link href={`/create-your-itinerary?tourGuideId=${agent.documentId}`}>
            <button className="rounded-full bg-yellow-500 px-8 py-3 font-semibold text-black shadow-md transition duration-300 ease-in-out hover:bg-yellow-600">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
