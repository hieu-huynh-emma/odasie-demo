import { notFound } from 'next/navigation';

import CustomerReviews from '@/components/CustomerReviews';
import { TabsContent } from '@/components/ui/tabs';
import { getExperience } from '@/services';
import { initializeI18n } from '@/lib/i18n';

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string }>;
  }>,
) {
  const { lang, slug } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const resExp = await getExperience(slug, lang);

  if (!resExp || !resExp.data) {
    notFound();
  }

  return (
    <TabsContent value={`/experience/${slug}/reviews`} className="mt-0">
      <CustomerReviews t={t} lang={lang} />
    </TabsContent>
  );
}
