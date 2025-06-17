import { getCountries, getExperiences } from '@/services';
import FilterControls from '@/components/FilterControls';
import { TFunction } from 'i18next';
import SearchInput from './SearchInput';

async function BlogArticleFilters({
  queries = '',
  t,
}: {
  queries?: string;
  t: TFunction<string[], string>;
}) {
  const [countries, experiences] = await Promise.all([
    getCountries(),
    getExperiences(),
  ]);

  if (!countries || !countries.data || !experiences || !experiences.data) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-lg bg-gray-100 px-9 py-[14px] lg:flex-row lg:items-center lg:justify-between">
      <div className="gap-[35px] lg:flex lg:items-center">
        <h4 className="typo-base-semibold uppercase text-gray-900">
          {t('common.filter')}
        </h4>
        <ul className="my-4 flex gap-2 lg:my-0 lg:gap-6">
          <li className="flex-1">
            <FilterControls
              name="countries.slug"
              placeholder={t('common.destination')}
              options={countries.data.map(country => ({
                label: country.name,
                value: country.slug,
              }))}
            />
          </li>
          <li className="flex-1">
            <FilterControls
              name="experiences.slug"
              placeholder={t('common.experience')}
              options={experiences.data.map(exp => ({
                label: exp.name,
                value: exp.slug,
              }))}
            />
          </li>
        </ul>
      </div>
      <div>
        <SearchInput initialQuery={queries} />
      </div>
    </div>
  );
}

export default BlogArticleFilters;
