import CustomerReviews from '@/components/CustomerReviews';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { TabsContent } from '@/components/ui/tabs';
import { initializeI18n } from '@/lib/i18n';
import { getCountry } from '@/services';
import { notFound } from 'next/navigation';

export default async function Page(
  props: Readonly<{ params: Promise<{ lang: string; country: string }> }>,
) {
  const { country, lang } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const countryResponse = await getCountry(country, lang);
  if (!countryResponse || !countryResponse.data) {
    notFound();
  }

  return (
    <TabsContent value={`/destination/${country}/reviews`} className="mt-0">
      <CustomerReviews
        pageSize={10}
        t={t}
        reviewsFilterCriteria={{
          tour: {
            country: {
              documentId: countryResponse.data.documentId,
            },
          },
        }}
        lang={lang}
        ratingStatsCriteria={{
          filters: {
            country: {
              id: countryResponse.data.id,
            },
          },
          locale: lang,
        }}
      />
      {countryResponse?.data?.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={countryResponse.data.localizedSlugs}
          url="/destination/__slug__/reviews"
        />
      )}
    </TabsContent>
  );
}
