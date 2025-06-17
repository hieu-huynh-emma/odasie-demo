import FilterControls from '@/components/FilterControls';
import {
  durationFilterOptions,
  priceRangeFilterOptions,
} from '@/enums/business.enum';
import { Country, Experience } from '@/types';
import { TFunction } from 'i18next';

type TourFiltersProps = {
  experiences: Experience[];
  destinations: Country[];
  t: TFunction<string[], string>;
};

function TourFilters({ experiences, destinations, t }: TourFiltersProps) {
  return (
    <div className="flex flex-col gap-[35px] rounded-lg bg-gray-100 px-9 py-[14px] lg:flex-row lg:items-center">
      <h4 className="typo-base-semibold align-bottom uppercase text-gray-900">
        {t('common.filter')}
      </h4>
      <ul className="flex flex-wrap items-center gap-6">
        <li>
          <FilterControls
            name="country.slug"
            placeholder={t('common.destination')}
            options={destinations.map(destination => ({
              label: destination.name,
              value: destination.slug,
            }))}
          />
        </li>

        <li>
          <FilterControls
            name="experiences.slug"
            placeholder={t('common.experience')}
            options={experiences.map(exp => ({
              label: exp.name,
              value: exp.slug,
            }))}
          />
        </li>
        <li>
          <FilterControls
            name="duration"
            placeholder={t('common.duration')}
            type="range"
            options={durationFilterOptions.map(option => ({
              label: t(option.labelTranslation),
              value: option.value,
            }))}
          />
        </li>
        <li>
          <FilterControls
            name="startingPrice.price"
            placeholder={t('common.price')}
            type="range"
            options={priceRangeFilterOptions.map(option => ({
              label: t(option.labelTranslation),
              value: option.value,
            }))}
          />
        </li>
      </ul>
    </div>
  );
}

export default TourFilters;
