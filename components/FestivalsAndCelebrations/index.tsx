'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DestinationCard from '../cards/DestinationCard';
import { cn } from '@/lib/utils';
import { APIResponse, Festival } from '@/types';
import useBreakpoint from '@/hooks/useBreakPoint';
import { useTranslation } from 'react-i18next';

type FestivalsAndCelebrationsProps = {
  festivalResponse: APIResponse<Festival[] | null>;
  country: string;
};

function FestivalsAndCelebrations({
  festivalResponse,
  country,
}: FestivalsAndCelebrationsProps) {
  const { t } = useTranslation(['common']);
  const { isMobile } = useBreakpoint();

  if (!festivalResponse.data || !festivalResponse.data.length) {
    return null;
  }

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    centeredSlides: true,
  };

  return (
    <div>
      {isMobile ? (
        <div className="relative">
          <Slider {...mobileSettings}>
            {festivalResponse.data.map(festival => (
              <div key={festival.id} className="px-4">
                <DestinationCard
                  title=""
                  subtitle={festival.name}
                  image={festival.image}
                  url={`/discovery/festival/${festival.slug}`}
                />
              </div>
            ))}
          </Slider>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/discoveries/festivals/${country}`}
              title={t('common.see_all_celebrations')}>
              <Button variant="secondary" size="lg">
                {t('common.see_all_celebrations')}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-8 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {festivalResponse.data.map((festival, index: number) => (
              <DestinationCard
                className={cn(
                  'rounded-sm lg:rounded-md lg:rounded-sm',
                  index + 1 === festivalResponse.data?.length && 'col-span-2',
                )}
                key={festival.id}
                title=""
                subtitle={festival.name}
                image={festival.image}
                url={`/discovery/festival/${festival.slug}`}
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href={`/discoveries/festivals/${country}`}
              title={t('common.see_all_celebrations')}>
              <Button variant="secondary" size="lg">
                {t('common.see_all_celebrations')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default FestivalsAndCelebrations;
