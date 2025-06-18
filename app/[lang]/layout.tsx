//app/[lang]/layout.tsx
// import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import { dir } from 'i18next';
// import { Toaster } from '@/components/ui/toaster';
// import Footer from '@/components/Footer';
import { appConfig } from '@/configs';
import { getGlobalSettings, getNavigation } from '@/services';
// import SPAPageViewTracker from '@/components/SPAPageViewTracker';

import I18nProvider from './I18nProvider';
import './globals.css';
// import HeaderNavigation from '@/components/HeaderNavigation';
// import { DataLayerBootstrap } from '@/components/DataLayerBootstrap';
// import PageLoading from '@/components/PageLoading';
// import { Suspense } from 'react';
import { LocalizedProvider } from '@/contexts/LocalizedContext';
// import Favicon from '@/app/Favicon';

// Generate image domains from environment variable
const imageDomainsForPreconnect = process.env.REMOTE_IMAGE_PATTERNS
  ? process.env.REMOTE_IMAGE_PATTERNS.split(',').map(url =>
      url.replace(/^https?:\/\//, ''),
    )
  : [
      'odasie-staging-media-optimized.s3.ap-southeast-7.amazonaws.com',
      'odasie-staging-media-original.s3.ap-southeast-7.amazonaws.com',
      'media-staging.odasie.com',
    ];

export function generateStaticParams() {
  return appConfig.supportedLanguages.map(lng => ({ lang: lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const globalSettings = await getGlobalSettings(lang);

  if (!globalSettings.data) {
    return {};
  }

  return {
    title: globalSettings.data.siteTitle,
    description: globalSettings.data.siteDescription,
    openGraph: {
      title: globalSettings.data.siteTitle,
      description: globalSettings.data.siteDescription,
      locale: lang,
      alternateLocales: appConfig.supportedLanguages.filter(
        supportedLang => supportedLang !== lang,
      ),
    },
  };
}

async function getLayoutData(lang: string) {
  try {
    const [globalSettings, mainNavigation, footerNavigation] =
      await Promise.all([
        getGlobalSettings(lang),
        getNavigation('main-navigation', lang),
        getNavigation('footer-navigation', lang),
      ]);

    return {
      globalSettings,
      mainNavigation,
      footerNavigation,
    };
  } catch {
    return {
      globalSettings: null,
      mainNavigation: null,
      footerNavigation: null,
    };
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const { globalSettings, mainNavigation, footerNavigation } = await getLayoutData(lang);

  if (
    !globalSettings ||
    !globalSettings.data ||
    !mainNavigation ||
    !mainNavigation.data ||
    !footerNavigation ||
    !footerNavigation.data
  ) {
    notFound();
  }
  return (
    <html lang={lang} dir={dir(lang)}>
      <head>
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href={appConfig.apiUrl} />
        <link
          rel="preconnect"
          href={appConfig.apiUrl}
          crossOrigin="anonymous"
        />

        {/* Preconnect to image domains to improve performance */}
        {imageDomainsForPreconnect.map(domain => (
          <link
            key={domain}
            rel="preconnect"
            href={`https://${domain}`}
            crossOrigin="anonymous"
          />
        ))}

        {/* Resource hints for better performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Viewport optimization */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </head>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />

      {/* Load analytics scripts with proper defer/async for better performance */}
      {/*{appConfig.gaId && (*/}
      {/*  <GoogleAnalytics gaId={appConfig.gaId} dataLayerName="dataLayer" />*/}
      {/*)}*/}

      {/*{appConfig.gtmId && (*/}
      {/*  <GoogleTagManager*/}
      {/*    gtmId={appConfig.gtmId}*/}
      {/*    // only include auth/preview/cookies in non-prod*/}
      {/*    gtmScriptUrl={*/}
      {/*      !appConfig.isProd*/}
      {/*        ? `https://www.googletagmanager.com/gtm.js?id=${appConfig.gtmId}` +*/}
      {/*          `&gtm_auth=${appConfig.gtmAuth}` +*/}
      {/*          `&gtm_preview=${appConfig.gtmPreview}` +*/}
      {/*          `&gtm_cookies_win=${appConfig.gtmCookiesWindow}`*/}
      {/*        : undefined*/}
      {/*    }*/}
      {/*    dataLayerName="dataLayer"*/}
      {/*  />*/}
      {/*)}*/}

      <body suppressHydrationWarning>
        {/*<PageLoading />*/}
        <LocalizedProvider>
          <I18nProvider lang={lang}>
            {/*<HeaderNavigation*/}
            {/*  lang={lang}*/}
            {/*  settings={globalSettings.data}*/}
            {/*  navigation={mainNavigation.data}*/}
            {/*/>*/}
            {children}
            {/*<Footer*/}
            {/*  lang={lang}*/}
            {/*  settings={globalSettings.data}*/}
            {/*  navigation={footerNavigation.data}*/}
            {/*/>*/}
          </I18nProvider>
        </LocalizedProvider>
        {/*<Toaster />*/}

        {/* Load data layer and tracking scripts after main content */}
        {/*<Suspense fallback={null}>*/}
        {/*  <DataLayerBootstrap*/}
        {/*    language={lang}*/}
        {/*    currency={globalSettings.data?.defaultCurrency.code}*/}
        {/*    visitorType={globalSettings.data?.visitor_type || 'visitor'}*/}
        {/*    customer={*/}
        {/*      globalSettings.data?.email*/}
        {/*        ? { email: globalSettings.data?.email, phone: '' }*/}
        {/*        : undefined*/}
        {/*    }*/}
        {/*  />*/}
        {/*</Suspense>*/}



        {/*<Suspense fallback={null}>*/}
        {/*  <SPAPageViewTracker*/}
        {/*    language={lang}*/}
        {/*    currency={globalSettings.data?.defaultCurrency.code}*/}
        {/*    visitor_type={globalSettings.data?.visitor_type || 'visitor'}*/}
        {/*    email={globalSettings.data?.email || ''}*/}
        {/*  />*/}
        {/*</Suspense>*/}

      </body>
    </html>
  );
}
