'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterOption = {
  label: string;
  value: string;
};

type FilterControlsProps = {
  name: string;
  placeholder: string;
  options: FilterOption[];
  defaultValue?: string;
  type?: 'normal' | 'range';
};

const PLACEHOLDER_VALUE = '__PLACEHOLDER_VALUE__';

function FilterControls({
  name,
  placeholder,
  options,
  defaultValue,
  type = 'normal',
}: FilterControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQueryParams = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');

    if (value === PLACEHOLDER_VALUE) {
      params.delete(paramName);

      if (type === 'range') {
        params.delete(`${paramName}_min`);
        params.delete(`${paramName}_max`);
      }
    } else if (type === 'range' && value.includes('-')) {
      const [min, max] = value.split('-');

      params.delete(paramName);

      if (min) {
        params.set(`${paramName}_min`, min);
      } else {
        params.delete(`${paramName}_min`);
      }

      if (max) {
        params.set(`${paramName}_max`, max);
      } else {
        params.delete(`${paramName}_max`);
      }
    } else {
      params.set(paramName, value);
      params.delete(`${paramName}_min`);
      params.delete(`${paramName}_max`);
    }

    return `${pathname}?${params.toString()}`;
  };

  const handleValueChange = (selectedOption: string) => {
    const newUrl = updateQueryParams(name, selectedOption);
    router.push(newUrl);
  };

  const getCurrentValue = () => {
    if (type === 'range') {
      const min = searchParams.get(`${name}_min`);
      const max = searchParams.get(`${name}_max`);

      return min && max ? `${min}-${max}` : (defaultValue ?? PLACEHOLDER_VALUE);
    }

    return searchParams.get(name) ?? defaultValue ?? PLACEHOLDER_VALUE;
  };

  return (
    <Select
      name={name}
      onValueChange={handleValueChange}
      value={getCurrentValue()}>
      <SelectTrigger className="w-full bg-white lg:w-[200px] lg:max-w-[265px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={PLACEHOLDER_VALUE} value={PLACEHOLDER_VALUE}>
          {placeholder}
        </SelectItem>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterControls;
