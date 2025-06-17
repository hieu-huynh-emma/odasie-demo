import Paginator from '@/components/Paginator';
import TourFilters from './TourFilters';
import { notFound } from 'next/navigation';
import { getExperiences, getTours } from '@/services';
import { TourConfig, ExperienceConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import TourGridResult from './TourGridResult';
import { TFunction } from 'i18next';

type Props = {
  lang: string;
  urlSearchParams: { [key: string]: string };
  showPaginator?: boolean;
  t: TFunction<string[], string>;
};
async function fetchTours(
  lang: string,
  urlSearchParams: { [key: string]: string },
) {
  const queryMapper = new QueryMapper(TourConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(urlSearchParams));

  return getTours({ locale: lang, ...criteria });
}

async function fetchExperiences(
  lang: string,
  urlSearchParams: { [key: string]: string },
) {
  const queryMapper = new QueryMapper(ExperienceConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(urlSearchParams));
  return getExperiences({ locale: lang, ...criteria });
}

export default async function TourContent({
  lang,
  urlSearchParams,
  showPaginator = true,
  t,
}: Props) {
  const [resTours, resExperiences] = await Promise.all([
    fetchTours(lang, urlSearchParams),
    fetchExperiences(lang, urlSearchParams),
  ]);

  if (!resTours?.data || !resExperiences?.data) {
    notFound();
  }

  const { data: tours } = resTours;
  const { data: experiences } = resExperiences;

  return (
    <div className="space-y-7">
      <TourFilters experiences={experiences} t={t} />
      <TourGridResult tours={tours} t={t} />
      {showPaginator && (
        <Paginator
          currentPage={resTours.meta?.pagination?.page || 1}
          totalPages={resTours.meta?.pagination?.pageCount || 1}
        />
      )}
    </div>
  );
}
