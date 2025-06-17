import PersonalizedItinerarySection from '@/components/sections/PersonalizedItineraryForm/PersonalizedItinerarySection';
import { getCmsPage } from '@/services';
import { cmsPageUrlTransform } from '@/services/shared';
import { ItineraryFormSection } from '@/types';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; pageUrl: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, pageUrl } = await params;
  const cmsPageResponse = await getCmsPage(`/${pageUrl}`, lang);

  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(
    cmsPageResponse.data.seo,
    'Create your itinerary',
    lang,
  );
}

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}>) {
  const [{ lang }, queryParameters] = await Promise.all([params, searchParams]);
  const pageUrl = cmsPageUrlTransform('create-your-itinerary', queryParameters);
  const cmsPage = await getCmsPage(`/${pageUrl}`, lang);
  const blocks = cmsPage?.data?.blocks;
  const section = blocks?.find(
    block => block.__component === 'section.itinerary-form-section',
  ) as ItineraryFormSection;
  const url = cmsPage?.data?.url;

  return (
    <PersonalizedItinerarySection
      lang={lang}
      section={section}
      queryParameters={queryParameters}
      url={url}
    />
  );
}
