import { Tour } from '@/types';
import HeroTourCard from './HeroTourCard';
import StandardTourCard from './StandardTourCard';
import { TFunction } from 'i18next';

type TourCardProps = {
  variant: 'standard' | 'hero';
  tour: Tour;
  t: TFunction<string[], string>;
};

function TourCard({ variant = 'standard', tour }: TourCardProps) {
  if (variant === 'hero') {
    return <HeroTourCard tour={tour} />;
  }

  return <StandardTourCard tour={tour} />;
}

export default TourCard;
