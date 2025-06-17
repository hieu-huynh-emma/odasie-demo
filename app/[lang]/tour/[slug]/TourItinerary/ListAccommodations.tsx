import { Hotel } from '@/types';
import AccommodationCard from './AccommodationCard';
import { TFunction } from 'i18next';

function ListAccommodations({
  accommodations,
  t,
}: {
  accommodations: Hotel[];
  t: TFunction<string[], string>;
}) {
  return (
    <div className="space-y-5">
      <h4 className="typo-lg-bold text-gray-900">{t('tour.accommodations')}</h4>
      {accommodations.map(item => (
        <AccommodationCard key={item.id} accommodation={item} />
      ))}
    </div>
  );
}

export default ListAccommodations;
