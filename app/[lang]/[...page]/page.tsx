import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import PageRenderer from '@/components/PageRenderer';
import { getCmsPage } from '@/services';
import { initializeI18n } from '@/lib/i18n';
import { cmsPageUrlTransform } from '@/services/shared';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { getCMSPageMetadata } from '@/hooks/useSEO';

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ lang: string; page: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [{ lang, page }, queryParameters, parentMetadata] = await Promise.all([
    params,
    searchParams,
    parent,
  ]);
  const pageUrl = cmsPageUrlTransform(page.join('/'), queryParameters);
  const cmsPage = await getCmsPage(`/${pageUrl}`, lang);

  if (!cmsPage || !cmsPage.data) {
    return parentMetadata as Metadata;
  }

  return getCMSPageMetadata(
    cmsPage.data.seo,
    parentMetadata.title?.absolute as string,
    lang,
  );
}

export default async function CmsPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ lang: string; page: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}>) {

  const [{ lang, page }, queryParameters] = await Promise.all([
    params,
    searchParams,
  ]);
  const { t } = await initializeI18n(lang, ['common']);
  const pageUrl = cmsPageUrlTransform(page.join('/'), queryParameters);
  const cmsPage = await getCmsPage(`/${pageUrl}`, lang);

  if (!cmsPage || !cmsPage.data) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-1200 flex-col">
      {cmsPage.data.localizedSlugs && (
        <LocalizedSetter localizedSlugs={cmsPage.data.localizedSlugs} />
      )}
      <PageRenderer
        lang={lang}
        blocks={cmsPage.data.blocks}
        url={cmsPage.data.url}
        queryParameters={queryParameters}
        t={t}
      />
    </main>
  );
}
