import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DestinationSelect from './DestinationSelect';
import { durationFilterOptions } from '@/enums/business.enum';
import { Queries } from '.';
import KeywordInput from './KeywordInput';
import { TFunction } from 'i18next';

interface Props {
  label: string;
  placeholder: string;
  filterType: 'keyword' | 'destination' | 'duration';
  setQueries: (queries: Queries) => void;
  queries: Queries;
  lang: string;
  t: TFunction;
}

export default function FilterComponent({
  label,
  placeholder,
  filterType,
  queries,
  setQueries,
  lang,
  t,
}: Props) {
  let children: React.ReactNode = null;
  switch (filterType) {
    case 'keyword':
      children = (
        <KeywordInput
          queries={queries}
          setQueries={setQueries}
          placeholder={placeholder}
        />
      );
      break;
    case 'destination':
      children = (
        <DestinationSelect
          lang={lang}
          value={
            queries.regionSlug
              ? `${queries.countrySlug}__${queries.regionSlug}`
              : queries.countrySlug
          }
          onChange={(regionSlug, countrySlug) => {
            setQueries({
              ...queries,
              regionSlug,
              countrySlug,
            });
          }}
          placeholder={placeholder}
        />
      );
      break;
    case 'duration':
      children = (
        <Select
          onValueChange={value => {
            setQueries({
              ...queries,
              duration: value,
            });
          }}
          value={queries.duration}
          name="duration">
          <SelectTrigger className="border-none px-0 py-1 shadow-none focus:ring-0">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {durationFilterOptions.map(duration => (
              <SelectItem key={duration.value} value={duration.value}>
                {t(duration.labelTranslation)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col">
      <label className="text-md font-semibold text-gray-800">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
