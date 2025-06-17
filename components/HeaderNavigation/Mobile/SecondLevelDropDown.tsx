'use client';

import { NavigationItem } from '@/types';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';
interface Props {
  childrenItems: NavigationItem[];
  onChildClick?: (item: NavigationItem) => void; // add tracking callback
  lang: string;
}

export default function SecondLevelDropDown({
  childrenItems,
  onChildClick,
  lang,
}: Props) {
  const [selected, setSelected] = useState<NavigationItem | null>(null);
  const router = useRouter();

  const handleExpand = (hasChildren: boolean, item: NavigationItem) => {
    if (hasChildren) {
      setSelected(selected ? null : item);
    } else {
      onChildClick?.(item);
    }
  };

  return (
    <div className="grid w-full grid-cols-12 gap-2 gap-y-6 bg-white px-4 pt-3">
      {childrenItems
        .sort((a, b) => a.order - b.order)
        .filter(item => item.showOnMobile)
        .map(item => {
          const hasChildren = item.children && item.children.length > 0;
          return (
            <div
              key={item.id}
              className={cn(
                'col-span-12',
                item.image && !hasChildren && 'col-span-6',
                hasChildren && 'bg-gray-200',
              )}
              onClick={e => {
                if (hasChildren) {
                  e.preventDefault(); // Prevent navigation if has children
                } else {
                  onChildClick?.(item); // Track if it's a direct link
                  router.push(`/${lang}${item.url}`);
                }
              }}>
              {item.image ? (
                <div
                  onClick={() => handleExpand(hasChildren, item)}
                  className={cn(
                    'block h-1/3 cursor-pointer',
                    hasChildren ? 'h-[118px]' : 'h-[72px]',
                  )}>
                  <BackgroundImageWithFallback
                    className="flex h-full w-full items-end justify-between rounded-[5px] bg-cover bg-center p-3"
                    url={item.image?.url}>
                    <p className="typo-lg-bold">{item.label} </p>
                    {hasChildren && (
                      <div className="cursor-pointer">
                        {selected?.id === item.id ? <Minus /> : <Plus />}
                      </div>
                    )}
                  </BackgroundImageWithFallback>
                </div>
              ) : (
                <div
                  className="flex w-full flex-col items-center justify-center"
                  onClick={() => onChildClick?.(item)}>
                  {item.url && (
                    <Link
                      href={`/${lang}${item.url}`}
                      className="h-full w-full border-b border-gray-300 px-4 pb-3 font-normal text-gray-900 hover:underline">
                      {item.label}
                    </Link>
                  )}
                </div>
              )}

              {/* Second level inside if selected */}
              {selected?.id === item.id &&
                selected?.children &&
                selected.children.length > 0 && (
                  <div className="col-span-12 flex w-full flex-col">
                    {selected.children
                      .sort((a, b) => a.order - b.order)
                      .filter(item => item.showOnMobile)
                      .map(child => (
                        <Link
                          href={`/${lang}${child.url}`}
                          className="h-full w-full border-b border-gray-300 px-4 py-3 font-normal text-gray-900 hover:underline"
                          key={child.id}
                          onClick={() => onChildClick?.(child)} // Track nested children click too
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                )}
            </div>
          );
        })}
    </div>
  );
}
