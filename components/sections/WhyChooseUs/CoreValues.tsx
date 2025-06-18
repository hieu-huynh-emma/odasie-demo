import DynamicIcon from '@/components/DynamicIcon';
import { CoreValue } from '@/types';
import clsx from 'clsx';

type CoreValueItemProps = {
  value: CoreValue;
  primary: boolean;
};

function CoreValueItem({ value, primary }: CoreValueItemProps) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-sm bg-white p-6 lg:rounded-md">
      <div
        className={clsx(
          'mx-auto flex h-15 w-15 items-center justify-center rounded-full',
          primary ? 'bg-primary-500' : 'bg-secondary-500',
        )}>
        <DynamicIcon
          name={value.icon.name}
          size={16}
          className={clsx('h-8 w-8', primary ? 'text-gray-900' : 'text-white')}
        />
      </div>
      <h3 className="typo-lg-bold text-center text-gray-900">{value.title}</h3>
      <p className="typo-sm-regular text-center text-gray-900">
        {value.description}
      </p>
    </div>
  );
}

type CoreValuesProps = {
  values: CoreValue[];
};

function CoreValues({ values }: CoreValuesProps) {
  return (
    <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-2 lg:grid-cols-4">
      {values?.map((value, index) => (
        <CoreValueItem key={index} value={value} primary={index % 2 === 1} />
      ))}
    </div>
  );
}

export default CoreValues;
