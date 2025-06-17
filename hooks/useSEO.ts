import { seoToMetadata } from '@/utils/seo';
import { Seo } from '@/types';
import { Metadata } from 'next';

export function getCMSPageMetadata(
  seo: Seo | null | undefined,
  siteTitle?: string,
  locale?: string,
): Metadata {
  if (!seo) return {};

  // If the page has SEO data, use it
  if (seo) {
    return seoToMetadata(
      {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        keywords: seo.keywords,
        metaImage: seo.metaImage,
        metaRobots: seo.metaRobots,
      },
      siteTitle,
      locale,
    );
  }

  // Fallback to using page title if no SEO data
  return {
    title: siteTitle,
  };
}
