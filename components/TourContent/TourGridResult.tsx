import { Tour } from '@/types';
import TourCard from '../cards/TourCard';
import { cn } from '@/lib/utils';
import { TFunction } from 'i18next';

type Props = {
  tours: Tour[];
  className?: string;
  t: TFunction<string[], string>;
};

export default function TourGridResult({ tours, t }: Props) {
  const toursLength = tours.length;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {tours.map((tour, index) => {
        const col = (index + 1) % 3;
        const isHeroCard =
          index === 0 ||
          (index === toursLength - 1 && (col === 0 || col === 1));

        return (
          <div
            key={tour.id}
            className={cn(
              'col-span-12',
              isHeroCard ? 'lg:col-span-8' : 'lg:col-span-4',
            )}>
            <TourCard
              tour={tour}
              variant={isHeroCard ? 'hero' : 'standard'}
              t={t}
            />
          </div>
        );
      })}
    </div>
  );
}
