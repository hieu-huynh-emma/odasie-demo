import Rating from '@/components/Rating';
import { TFunction } from 'i18next';

type RatingAverageProps = {
  average?: number;
  max?: number;
  total?: number;
  t: TFunction<string[], string>;
};

function RatingAverage({
  average = 0,
  max = 5,
  total = 0,
  t,
}: RatingAverageProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="typo-lg-regular text-primary-900">
        {t('common.average_rating')}
      </h2>
      <p className="typo-6xl-bold text-secondary-500">{`${average}/${max}`}</p>
      <Rating halfIncrement value={average} />
      <p className="typo-lg-regular text-primary-900">
        {t(`common.total_reviews${total > 1 ? '_plural' : ''}`, { total })}
      </p>
    </div>
  );
}

export default RatingAverage;
