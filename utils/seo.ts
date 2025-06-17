import { Metadata } from 'next';
import { appConfig } from '@/configs';

/**
 * Server-side helper function to convert CMS SEO data to Next.js Metadata format
 * Use this in generateMetadata functions in your page components
 */
export function seoToMetadata(
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    metaImage?: {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    } | null;
    metaRobots?: string | null;
  } | null,
  siteTitle?: string,
  locale?: string,
): Metadata {
  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: 'noindex, nofollow', // TODO: Add robots to seo data
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.metaImage
        ? [
            {
              url: seo.metaImage.url,
              alt: seo.metaImage.alt,
              width: seo.metaImage.width,
              height: seo.metaImage.height,
            },
          ]
        : undefined,
      locale,
      ...(locale && {
        alternateLocale: appConfig.supportedLanguages.filter(
          supportedLang => supportedLang !== locale,
        ),
      }),
    },
    twitter: {
      card: seo.metaImage ? 'summary_large_image' : 'summary',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.metaImage
        ? [
            {
              url: seo.metaImage.url,
              alt: seo.metaImage.alt,
            },
          ]
        : undefined,
    },
  };
}
