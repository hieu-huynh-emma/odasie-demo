import { TabsContent } from '@/components/ui/tabs';
import Map from './Map';
import { getCountry } from '@/services';
import { notFound } from 'next/navigation';
import SectionHeading from '@/components/SectionHeading';
import { initializeI18n } from '@/lib/i18n';
import { LocalizedSetter } from '@/components/LocalizedSetter';

export default async function Page(
  props: Readonly<{ params: Promise<{ lang: string; country: string }> }>,
) {
  const { country, lang } = await props.params;
  const countryResponse = await getCountry(country, lang);
  if (!countryResponse || !countryResponse.data) {
    notFound();
  }
  const { t } = await initializeI18n(lang, ['common']);
  const {
    data: { lat, lng, name },
  } = countryResponse;

  return (
    <TabsContent value={`/destination/${country}/map`} className="mt-0">
      <section className="mb-10 mt-8 lg:mb-0 lg:mt-16">
        <div className="px-4 lg:px-2">
          <SectionHeading
            segments={[
              {
                id: 1,
                text: `${t('common.at_a', { name })} `,
                highlight: null,
                newline: false,
              },
              {
                id: 2,
                text: t('common.glance'),
                highlight: 'secondary',
                newline: false,
              },
            ]}
          />
        </div>
        <div className="w-full">
          <Map
            centerLocation={{
              lat,
              lng,
            }}
          />
        </div>
      </section>
      {countryResponse?.data?.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={countryResponse.data.localizedSlugs}
          url="/destination/__slug__/map"
        />
      )}
    </TabsContent>
  );
}
