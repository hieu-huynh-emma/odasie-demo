import OdasiePlusSection from '@/components/sections/OdasiePlusSection';
import { getCmsPage, getGlobalSettings } from '@/services';
import { OdasiePlusSection as OdasiePlusSectionType } from '@/types';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const cmsPageResponse = await getCmsPage('/odasie-plus', lang);

  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, 'Odasie Plus', lang);
}

export default async function Page({ params, searchParams }: Props) {
  const [{ lang }] = await Promise.all([params, searchParams]);
  const [{ data: page }, { data: settings }] = await Promise.all([
    getCmsPage('/odasie-plus', lang),
    getGlobalSettings(lang),
  ]);
  const odasiePlusSection = page?.blocks.find(
    block => block.__component === 'section.odasie-plus-section',
  );

  return (
    <div>
      <div className="w-full p-0">
        <iframe
          id="mobile-app"
          className="h-screen w-full shadow-sm"
          src="https://espace-client.odasie.fr"
          frameBorder="0"></iframe>
      </div>
      <OdasiePlusSection
        section={odasiePlusSection as OdasiePlusSectionType}
        settings={settings}
      />
    </div>
  );
}
