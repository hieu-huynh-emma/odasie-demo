import SeasonGuide from '@/components/SeasonGuide';
import FeaturedRegions from '@/components/sections/FeaturedRegions';
import HeroSection from '@/components/sections/HeroSection';
import Section from '@/components/sections/Section';
import TourExperienceFilterSelect from '@/components/TourContent/TourExperienceFilterSelect';
import { RegionConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import { initializeI18n } from '@/lib/i18n';
import { getRegion, getRegions } from '@/services';
import { notFound } from 'next/navigation';
import TourGuideQuoteImage from './TourGuideQuoteImage';
import ArticleSection from '@/components/ArticleSection';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { tWithGrammar } from '@/utils/i18n';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; city: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, city } = await params;
  const cityResponse = await getRegion(city, lang);

  if (!cityResponse || !cityResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(
    cityResponse.data.seo,
    cityResponse.data.name,
    lang,
  );
}

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; country: string; city: string }>;
  }>,
) {
  const { lang, city: citySlug } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const cityResponse = await getRegion(citySlug, lang);
  if (!cityResponse || !cityResponse.data) {
    notFound();
  }

  const { data: city } = cityResponse;
  const { name, overview, country, article } = city;
  const queryMapper = new QueryMapper(RegionConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?country.slug=${country.slug}`),
  );
  const { data: otherCountryRegions } = await getRegions({
    ...criteria,
    locale: lang,
  });

  const tourGuide = city.quotation?.tourGuide;
  const guideIntroQuote = city.quotation?.guideIntroQuote ?? '';
  const guideAuthor = tourGuide
    ? {
        name: tourGuide.name,
        image: tourGuide.avatar.url,
        position: tourGuide.bio,
      }
    : null;

  return (
    <main className="mx-auto flex max-w-1200 flex-col">
      <HeroSection
        lang={lang}
        section={{
          image: city.image,
          heading: {
            segments: [
              {
                id: 1,
                text: name,
                highlight: 'primary',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'center',
          },
          description: overview,
        }}
        shouldGradientBg
        scrollElement={{
          label: t('common.travel_idea', { country: country.name }),
          targetSelector: '.scroll-to-tour-elm',
        }}
      />
      <Section>
        <TourGuideQuoteImage
          guideIntroQuote={guideIntroQuote}
          guideAuthor={guideAuthor}
          image={city.mapImage?.url || null}
          heading={{
            segments: [
              {
                id: 1,
                text: `${t('common.at_a', { name: city.name })} `,
                highlight: null,
                newline: false,
              },
              {
                id: 2,
                text: t('common.glance'),
                highlight: 'primary',
                newline: false,
              },
            ],
          }}
        />
      </Section>
      <Section>
        {article && (
          <ArticleSection
            content={article?.content}
            image={article?.image}
            heading={article?.heading}
          />
        )}
      </Section>
      <Section>
        <SeasonGuide
          backgroundImageUrl={city.travelSeasonBgImage}
          weatherChartUrl={city.travelSeasonChartImage || null}
          title={t('destination.season_to_go', { countryName: city.name })}
          highlight={lang === 'fr' ? 'SAISON' : 'SEASON'}
          content={city.travelSeasonInfo}
        />
      </Section>
      <TourExperienceFilterSelect
        showAllUrl={`/destination/${country.slug}/tours`}
        showAllText={tWithGrammar(
          t,
          'common.tours_country',
          { countryName: country.name },
          lang,
        )}
        lang={lang}
        params={{
          'country.slug': country.slug,
          'regions.slug': city.slug,
          'page': '1',
          'pageSize': '5',
        }}
      />
      {otherCountryRegions && otherCountryRegions.length > 0 && (
        <FeaturedRegions
          lang={lang}
          section={{
            heading: {
              segments: [
                {
                  id: 1,
                  text: t('common.areas'),
                  highlight: 'secondary',
                  newline: false,
                },
                {
                  id: 2,
                  text: t('common.you_might_like', {
                    countryName: country.name,
                  }),
                  highlight: null,
                  newline: false,
                },
              ],
            },
          }}
          regions={otherCountryRegions}
        />
      )}
      <div className="h-8 lg:h-16">
        {city.localizedSlugs && (
          <LocalizedSetter
            localizedSlugs={city.localizedSlugs}
            url="/destination/city/__slug__"
          />
        )}
      </div>
    </main>
  );
}
