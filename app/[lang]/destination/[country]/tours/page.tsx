import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import SectionHeading from '@/components/SectionHeading';
import { TabsContent } from '@/components/ui/tabs';
import TourContent from '@/components/TourContent';
import { initializeI18n } from '@/lib/i18n';
import { getCountry } from '@/services';
import { LocalizedSetter } from '@/components/LocalizedSetter';

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; country: string }>;
    searchParams: Promise<{ [key: string]: string }>;
  }>,
) {
  const [{ lang, country }, urlSearchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const countryResponse = await getCountry(country, lang);
  const { t } = await initializeI18n(lang, ['common']);

  return (
    <TabsContent value={`/destination/${country}/tours`} className="mt-0">
      <Section>
        <SectionHeading
          segments={[
            {
              id: 1,
              text: t('tour.travel_ideas'),
              highlight: null,
              newline: false,
            },
            {
              id: 2,
              text: ` ${countryResponse?.data?.name}`, // Usually proper nouns are not translated
              highlight: 'secondary',
              newline: false,
            },
          ]}
        />
        <Container className="space-y-8">
          <TourContent
            lang={lang}
            urlSearchParams={{
              ...urlSearchParams,
              'country.slug': country,
            }}
            t={t}
          />
        </Container>
      </Section>
      {countryResponse?.data?.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={countryResponse.data.localizedSlugs}
          url="/destination/__slug__/tours"
        />
      )}
    </TabsContent>
  );
}
