'use client';

import Container from '@/components/Container';
import DynamicIcon from '@/components/DynamicIcon';
import { cn } from '@/lib/utils';
import { GlobalSettings, Navigation, NavigationItem } from '@/types';
import {
  ChevronDown,
  ChevronUp,
  ListCheck,
  Menu,
  TabletSmartphone,
  X,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import SecondLevelDropDown from './SecondLevelDropDown';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { sortByOrder } from '@/utils';
import Link from 'next/link';
import {
  trackClickCTA,
  trackExpandCategoryGroup,
  trackClickCategory,
} from '@/lib/tracking'; // add new tracking imports
import { useTranslation } from 'react-i18next';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import ContactLink from '@/components/Footer/ContactLink';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface HeaderNavigationProps {
  lang: string;
  settings: GlobalSettings;
  navigation: Navigation;
}

// Focus trap for accessibility
function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.dispatchEvent(new CustomEvent('closeMobileMenu'));
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isActive]);

  return containerRef;
}

export default function MobileNavigation({
  lang,
  settings,
  navigation,
}: HeaderNavigationProps) {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [firstLevelSelected, setFirstLevelSelected] =
    useState<NavigationItem | null>(null);

  const menuRef = useFocusTrap(openDropdown);

  // Handle opening and closing the dropdown with no flickering
  const toggleDropdown = (open: boolean) => {
    if (open) {
      document.body.classList.add('scrollbar-hide');
      setTimeout(() => {
        setOpenDropdown(true);
      }, 10);
    } else {
      setOpenDropdown(false);
      setTimeout(() => {
        document.body.classList.remove('scrollbar-hide');
      }, 300); // Match this with animation duration
    }
  };

  useEffect(() => {
    const handleCloseMenu = () => toggleDropdown(false);
    document.addEventListener('closeMobileMenu', handleCloseMenu);

    return () => {
      document.removeEventListener('closeMobileMenu', handleCloseMenu);
      document.body.classList.remove('scrollbar-hide');
    };
  }, []);

  const onExpand = (item: NavigationItem) => {
    setFirstLevelSelected(item);
    trackExpandCategoryGroup(item.label);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) {
      toggleDropdown(false);
    }
  };

  return (
    <>
      <div className="scrollbar-hide fixed z-[49] h-[64px] w-full bg-white text-black">
        <Container className="flex h-full w-full items-center justify-between">
          <div
            onClick={() => {
              router.push(`/${lang}`);
              toggleDropdown(false);
            }}>
            <ImageWithFallback
              className="h-[32px] w-[110px]"
              src="/images/odasie-logo-black.svg"
              alt="Ôdasie Logo"
              width={0}
              height={0}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <div className="border-1 typo-sm-semibold rounded-[200px] border px-3 py-2">
              <ContactLink
                type="phone"
                href={`tel:${settings.contactInfo.phone}`}
                label={settings.contactInfo.phone}
              />
            </div>
            {openDropdown ? (
              <X
                className="cursor-pointer"
                onClick={() => toggleDropdown(false)}
                aria-label="Close menu"
              />
            ) : (
              <Menu
                className="cursor-pointer"
                onClick={() => toggleDropdown(true)}
                aria-label="Open menu"
              />
            )}
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {openDropdown && (
          <motion.div
            ref={menuRef}
            className="scrollbar-hide fixed bottom-0 top-[64px] z-[49] w-full overflow-y-auto bg-white text-black"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 300,
              duration: 0.2,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragDirectionLock>
            <Container className="flex flex-col px-0">
              {sortByOrder(navigation.items)
                .filter(item => item.showOnMobile)
                .map(item => {
                  const hasChildren = item.children && item.children.length > 0;
                  const selected = item.id === firstLevelSelected?.id;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'typo-base-semibold relative',
                        selected && 'text-white',
                      )}>
                      <div
                        className="relative flex items-center justify-between border-b border-gray-300 px-4"
                        onClick={() => {
                          if (hasChildren) {
                            onExpand(item);
                          }
                          trackClickCTA(item.id); // Track CTA click
                        }}>
                        {selected && (
                          <motion.div
                            className="absolute inset-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[#00425E]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <div className="flex w-full items-center gap-x-2">
                          {item.icon && (
                            <DynamicIcon name={item.icon.name} size={20} />
                          )}
                          <a
                            href={
                              hasChildren ? undefined : `/${lang}/${item.url}`
                            }
                            className="w-full flex-1 cursor-pointer py-4">
                            {item.label}
                          </a>
                        </div>
                        {hasChildren && (
                          <div
                            onClick={e => {
                              e.stopPropagation();
                              if (selected) {
                                setFirstLevelSelected(null);
                              } else {
                                onExpand(item);
                              }
                            }}
                            className="cursor-pointer">
                            {selected ? (
                              <ChevronUp className="cursor-pointer" />
                            ) : (
                              <ChevronDown className="cursor-pointer" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* Second Level Dropdown */}
                      <AnimatePresence>
                        {hasChildren && selected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}>
                            <SecondLevelDropDown
                              lang={lang}
                              childrenItems={item.children}
                              onChildClick={child => {
                                toggleDropdown(false);
                                trackClickCategory(child.label);
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

              {/* CTA buttons */}
              <div className="px-4">
                <Link
                  href={`/${lang}/create-your-itinerary`}
                  className="my-2 flex w-full items-center justify-center gap-x-1 rounded-[40px] bg-primary-500 px-5 py-3 text-black"
                  onClick={() => trackClickCTA('create_itinerary')}>
                  <ListCheck />
                  <p className="typo-sm-semibold">
                    {t('common.create_itinerary')}
                  </p>
                </Link>
              </div>

              <div className="px-4">
                <Link
                  href={`/${lang}/create-your-itinerary`}
                  className="my-2 flex w-full items-center justify-center gap-x-1 rounded-[40px] bg-[#00425E] px-5 py-3 text-white"
                  onClick={() => trackClickCTA('login_odasie')}>
                  <TabletSmartphone />

                  <p className="typo-sm-semibold">
                    {t('common.login_to_odasie')}
                  </p>
                </Link>
              </div>

              <div className="mt-2 px-4">
                <LanguageSwitcher
                  defaultLanguage={settings.defaultLanguage}
                  languages={settings.languages}
                />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
