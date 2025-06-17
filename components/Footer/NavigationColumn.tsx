import { NavigationItem } from '@/types';
import { sortByOrder } from '@/utils';
import Link from 'next/link';

type NavigationColumnProps = {
  navItem: NavigationItem;
  lang: string;
};

function NavigationColumn({ navItem, lang }: NavigationColumnProps) {
  return (
    <div className="col-span-12 flex flex-col gap-3 lg:col-span-2">
      <h4 className="typo-base-bold text-gray-900">{navItem.label}</h4>
      <ul className="flex flex-row flex-wrap gap-2 lg:flex-col">
        {sortByOrder(navItem.children).map((item, index) => (
          <li
            key={index}
            className="typo-sm-regular flex flex-row gap-3 text-gray-900">
            <Link
              href={`/${lang}${item.url}`}
              title={item.label}
              className="whitespace-nowrap hover:underline">
              {item.label}
            </Link>
            {index !== navItem.children.length - 1 && (
              <div className="h-full border-r-2 border-gray-900 lg:hidden" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationColumn;
