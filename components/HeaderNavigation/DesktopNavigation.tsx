'use client';

import { GlobalSettings, Navigation } from '@/types';
import Container from '@/components/Container';
import { ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import NavigationCard from './NavigationCard';
import { sortByOrder } from '@/utils';
import Link from 'next/link';
import {
  trackClickCTA,
  trackClickCategory,
  trackExpandCategoryGroup,
} from '@/lib/tracking'; // Import all tracking
import { useTranslation } from 'react-i18next';
import ContactLink from '../Footer/ContactLink';

interface HeaderNavigationProps {
  lang: string;
  settings: GlobalSettings;
  navigation: Navigation;
  variant: 'transparent' | 'white';
}

export default function DesktopNavigation({
  lang,
  settings,
  navigation,
  variant = 'transparent',
}: HeaderNavigationProps) {
  const { t } = useTranslation(['common']);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [firstChildHoverId, setFirstChildHoverId] = useState<string | null>(
    null,
  );

  const isHovering = hoverId !== null;
  const hoveringItem = navigation.items.find(item => item.id === hoverId);
  const firstChildHoveringItem = hoveringItem?.children.find(
    item => item.id === firstChildHoverId,
  );

  return (
    <div
      onMouseEnter={() => setHoverId('container')}
      onMouseLeave={() => setHoverId(null)}
      className={cn(
        'fixed z-[100] h-[70px] min-h-fit w-full transition-colors duration-300 ease-in-out',
        variant === 'transparent' ? 'text-white' : 'bg-white text-black',
        'hover:bg-[#FFFFFF]/50 hover:text-black hover:backdrop-blur-2xl',
      )}>
      <Container className="flex w-full items-center justify-between">
        {/* Logo and main navigation */}
        <div className="flex items-center gap-x-6">
          <Link href={`/${lang}`}>
            <img
              className="h-[36px] w-[124px] transition ease-in-out"
              src={
                variant === 'white' || isHovering
                  ? '/images/odasie-logo-black.svg'
                  : '/images/odasie-logo-white.svg'
              }
              alt="Ôdasie Logo"
            />
          </Link>

          {/* Main nav items */}
          {sortByOrder(navigation.items)
            .filter(item => item.showOnDesktop)
            .map(item => {
              const hasChildren = item.children && item.children.length > 0;
              const isItemHovering = hoverId === item.id;
              const onMouseEnter = () => {
                setHoverId(item.id);
                if (hasChildren) {
                  trackExpandCategoryGroup(item.label); // Track expanding group
                }
              };
              // Track click on top-level item
              const onClick = () => trackClickCTA(item.id);
              const content = (
                <>
                  <div>{item.label}</div>
                  {hasChildren ? (
                    isItemHovering ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )
                  ) : null}
                </>
              );
              const className = cn(
                'typo-base-regular flex cursor-pointer items-center gap-x-1 py-5',
                isItemHovering && 'text-secondary-500',
              );

              return (
                <div key={`header-nav-${item.id}`}>
                  {!hasChildren && item.url ? (
                    <Link
                      href={`/${lang}${item.url}`}
                      onMouseEnter={onMouseEnter}
                      onClick={onClick}
                      className={className}>
                      {content}
                    </Link>
                  ) : (
                    <div
                      onMouseEnter={onMouseEnter}
                      onClick={onClick}
                      className={className}>
                      {content}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Right side CTAs */}
        <div className="ms-10 flex items-center gap-x-2">
          <ContactLink
            textClassName="typo-sm-semibold text-center"
            className={cn(
              'rounded-[200px] px-[18px] py-[9px] transition-colors ease-in-out hover:border-white hover:bg-gray-50',
              isHovering || variant === 'white'
                ? 'border border-black text-black'
                : 'border border-white text-white',
            )}
            type="phone"
            href={`tel:${settings.contactInfo.phone}`}
            label={settings.contactInfo.phone}
          />
          <div>
            <img
              className="h-full w-[65px]"
              src="/images/travelers-choice.avif"
              alt="Travelers Choice"
            />
          </div>
          <NavigationChip
            lang={lang}
            href={`/create-your-itinerary`}
            content={t('common.create_itinerary')}
            variant="primary"
            onClick={() => trackClickCTA('create_itinerary')}
          />
          {/* TODO: Add search functionality  */}
          {/* <Search
            className="cursor-pointer"
            onClick={() => trackClickCTA('search_icon')}
          /> */}
        </div>
      </Container>

      {/* Expanded menu for categories */}
      {hoveringItem && hoveringItem.children.length > 0 && (
        <div className="relative h-[418px] overflow-y-auto text-sm">
          <Container className="grid h-full w-full grid-cols-12">
            <div className="absolute bottom-0 left-0 right-0 top-0 -translate-x-2/3 bg-[#FFFFFF]/75"></div>

            {/* First level of categories */}
            <div className="relative col-span-4 text-black">
              {hoveringItem.children
                .filter(child => child.showOnDesktop)
                .map(child => (
                  <Link
                    key={child.id}
                    href={`/${lang}${child.url}`}
                    onMouseEnter={() => setFirstChildHoverId(child.id)}
                    onClick={() => {
                      setHoverId(null);
                      trackClickCTA(child.id);
                      trackClickCategory(child.label); // Track category click
                    }}
                    className={cn(
                      'group relative flex w-full items-center justify-start gap-x-2 rounded-sm py-3 text-sm font-medium transition ease-in-out hover:underline lg:rounded-md',
                    )}>
                    <span className="block uppercase">{child.label}</span>
                    <ArrowDownRight className="hidden max-h-[20px] group-hover:block" />
                  </Link>
                ))}
            </div>

            {/* Second level of sub-categories */}
            <div className="col-span-4">
              {firstChildHoveringItem &&
                sortByOrder(firstChildHoveringItem.children)
                  .filter(grandChild => grandChild.showOnDesktop)
                  .map(grandChild => (
                    <Link
                      key={grandChild.id}
                      href={`/${lang}${grandChild.url}`}
                      onClick={() => {
                        setHoverId(null);
                        trackClickCTA(grandChild.id);
                        trackClickCategory(grandChild.label); // Track deeper category click
                      }}
                      className={cn(
                        'group relative flex items-center justify-start gap-x-2 rounded-sm p-3 text-sm font-medium transition ease-in-out hover:underline lg:rounded-md',
                      )}>
                      <span className="block uppercase">
                        {grandChild.label}
                      </span>
                    </Link>
                  ))}
            </div>

            {/* Navigation card (image etc.) */}
            <div className="col-span-4 flex justify-end">
              {firstChildHoveringItem?.navigationCard && (
                <NavigationCard
                  card={firstChildHoveringItem.navigationCard}
                  url={firstChildHoveringItem.url}
                  lang={lang}
                />
              )}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

function NavigationChip({
  variant,
  content,
  href,
  lang,
  onClick,
}: {
  variant: 'outlined' | 'primary' | 'black';
  content: string;
  href: string;
  lang: string;
  onClick?: () => void;
}) {
  let style = '';
  switch (variant) {
    case 'black':
      style = 'border-black border text-black';
      break;
    case 'outlined':
      style = 'border border-white text-white';
      break;
    case 'primary':
      style = 'bg-primary-500 text-black';
      break;
  }

  return (
    <Link
      href={`/${lang}${href}`}
      onClick={onClick}
      className={cn(
        'rounded-[200px] px-[18px] py-[9px] transition-colors ease-in-out hover:bg-gray-50',
        style,
      )}>
      <p className="typo-sm-semibold text-center">{content}</p>
    </Link>
  );
}
