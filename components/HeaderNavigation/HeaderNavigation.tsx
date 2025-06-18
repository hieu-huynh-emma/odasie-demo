'use client';
import { GlobalSettings, Navigation } from '@/types';
import { useEffect, useState } from 'react';
import MobileNavigation from './Mobile/MobileNavigation';
import useBreakpoint from '@/hooks/useBreakPoint';
import DesktopNavigation from './DesktopNavigation';

interface HeaderNavigationProps {
    lang: string;
    settings: GlobalSettings;
    navigation: Navigation;
}

function checkIsBlogDetailPage() {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    return /\/blog\/[a-zA-Z0-9-]+/.test(currentUrl);
}

export default function HeaderNavigation({
                                             lang,
                                             settings,
                                             navigation,
                                         }: HeaderNavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isMobile } = useBreakpoint();

    useEffect(() => {
        setIsScrolled(checkIsBlogDetailPage());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setIsScrolled(true);
                return;
            }
            if (checkIsBlogDetailPage()) return;
            setIsScrolled(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div id="header-navigation-bar" className="scrollbar-hide">
            {isMobile ? (
                <MobileNavigation
                    lang={lang}
                    settings={settings}
                    navigation={navigation}
                />
            ) : (
                <DesktopNavigation
                    lang={lang}
                    settings={settings}
                    navigation={navigation}
                    variant={isScrolled ? 'white' : 'transparent'}
                />
            )}
        </div>
    );
}
