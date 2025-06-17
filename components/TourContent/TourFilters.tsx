import FilterControls from '@/components/FilterControls';
import SearchBar from '@/components/FilterControls/SearchBar';
import {
  durationFilterOptions,
  priceRangeFilterOptions,
} from '@/enums/business.enum';
import { TFunction } from 'i18next';
import { Experience } from '@/types';

type TourFiltersProps = {
  experiences: Experience[];
  t: TFunction<string[], string>;
};

function TourFilters({ experiences, t }: TourFiltersProps) {
  return (
    <div className="flex flex-col gap-6 rounded-sm bg-gray-100 px-4 py-[14px] lg:flex-row lg:items-center lg:gap-[35px] lg:rounded-md lg:px-9">
      <h4 className="typo-base-semibold pt-4 align-bottom uppercase text-gray-900 lg:pt-0">
        {t('common.filter')}
      </h4>
      <ul className="flex flex-wrap items-center gap-x-2 gap-y-4 lg:gap-6">
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
        <li>
          <SearchBar name="keyword" placeholder={t('common.keyword')} />
        </li>
      </ul>
    </div>
  );
}

export default TourFilters;
