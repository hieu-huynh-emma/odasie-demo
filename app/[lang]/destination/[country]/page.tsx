import { TabsContent } from '@/components/ui/tabs';
import DestinationInfo from '@/components/DestinationInfo';
import { notFound } from 'next/navigation';
import { getCountry, getCustomerReviews, getFestivals } from '@/services';
import Container from '@/components/Container';
import FeaturedExperiences from '@/components/sections/FeaturedExperiences';
import Section from '@/components/sections/Section';
import QuoteCard from '@/components/cards/QuoteCard';
import { QueryMapper } from '@/lib/query-mapper';
import { FestivalConfig } from '@/configs';
import SectionHeading from '@/components/SectionHeading';
import VideoMedia from '@/components/sections/HeroSection/VideoMedia';
import SliderWithArrows from '@/components/sliders/SliderWithArrows';
import SeasonGuide from '@/components/SeasonGuide';
import FestivalsAndCelebrations from '@/components/FestivalsAndCelebrations';
import AlbumCard from '@/components/cards/AlbumCard';
import FAQs from '@/components/faq';
import AgentCard from '@/components/cards/AgentCard';
import CustomerReviews from '@/components/CustomerReviews';
import TourExperienceFilterSelect from '@/components/TourContent/TourExperienceFilterSelect';
import VoyageTracker from '@/components/VoyageTracker';
import { initializeI18n } from '@/lib/i18n';
import ScrollToTop from '@/components/ScrollToTop';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { Metadata } from 'next';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getCMSPageMetadata } from '@/hooks/useSEO';

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string; country: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, country } = await params;
  const countryResponse = await getCountry(country, lang);

  if (!countryResponse || !countryResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(
    countryResponse.data.seo,
    countryResponse.data.name,
    lang,
  );
}

export default async function Page(
  props: Readonly<{
    params: Promise<{ lang: string; country: string }>;
  }>,
) {
  const { lang, country } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const queryMapper = new QueryMapper(FestivalConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(`?countries.slug=${country}`),
  );

  const [countryResponse, festivalResponse] = await Promise.all([
    getCountry(country, lang),
    getFestivals({
      locale: lang,
      ...criteria,
    }),
  ]);

  if (
    !countryResponse ||
    !countryResponse.data ||
    !festivalResponse ||
    !festivalResponse.data
  ) {
    notFound();
  }

  const reviewsResponse = await getCustomerReviews({
    filters: {
      tour: {
        country: {
          documentId: countryResponse.data.documentId,
        },
      },
    },
    pagination: { ...criteria.pagination, pageSize: 1 },
    locale: lang,
    populate: {},
  });

  const hasReview = reviewsResponse.data && reviewsResponse.data.length > 0;

  const guideIntroQuote = countryResponse.data.quotation?.guideIntroQuote ?? '';
  const tourGuide = countryResponse.data.quotation?.tourGuide;
  const guideDiscussion = countryResponse.data.guideDiscussion;
  const guideAuthor = tourGuide
    ? {
        name: tourGuide.name,
        image: tourGuide.avatar.url,
        position: tourGuide.bio,
      }
    : null;

  const countryName = countryResponse.data.name;
  const immersiveTitle =
    countryResponse.data.immersiveExperience?.title ||
    t('destination.immersive_title', {
      countryName: countryName.toUpperCase(),
    });
  const immersiveButtonText =
    countryResponse.data.immersiveExperience?.buttonText ||
    t('destination.immersive_title', {
      countryName: countryName.toUpperCase(),
    });
  const immersiveButtonLink =
    countryResponse.data.immersiveExperience?.buttonLink || '/album/thailand';
  const immersiveImage =
    countryResponse.data.immersiveImage || countryResponse.data.image;

  const videoUrl = countryResponse.data.video?.url;
  const videoPoster = countryResponse.data.image.url;

  const seasonGuideProps = {
    backgroundImageUrl: countryResponse.data.travelSeasonBgImage,
    weatherChartUrl: countryResponse.data.travelSeasonChartImage || null,
    title: t('destination.season_to_go', { countryName }),
    highlight: lang === 'fr' ? 'SAISON' : 'SEASON',
    content: countryResponse.data.travelSeasonInfo,
  };

  return (
    <TabsContent value={`/destination/${country}`} className="mt-0">
      <VoyageTracker country={countryName} language={lang} />
      <Section>
        <SectionHeading
          segments={[
            {
              id: 1,
              text: t('common.guided_tour'),
              highlight: null,
              newline: false,
            },
            {
              id: 2,
              text: ` ${countryResponse?.data?.name}`, // Usually proper nouns are not translated
              highlight: 'secondary',
              newline: true,
            },
          ]}
        />
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_1fr]">
          <div>
            <QuoteCard quote={guideIntroQuote} author={guideAuthor} />
          </div>
          <div>
            <AlbumCard
              image={immersiveImage}
              title={immersiveTitle}
              buttonText={immersiveButtonText}
              buttonLink={immersiveButtonLink}
              targetSelector=".scroll-to-gallery-elm"
            />
          </div>
        </Container>
      </Section>
      <Section>
        <DestinationInfo country={countryResponse.data} t={t} />
      </Section>
      <div className="mt-8 lg:mt-16">
        <TourExperienceFilterSelect
          showAllUrl={`/destination/${country}/tours`}
          showAllText={t('destination.see_all_tours', { countryName })}
          lang={lang}
          params={{
            'country.slug': country,
            'page': '1',
            'pageSize': '5',
          }}
        />
      </div>

      <Section>
        <SeasonGuide {...seasonGuideProps} />
      </Section>
      <Section className="scroll-to-gallery-elm">
        <SectionHeading
          segments={[
            {
              id: 1,
              text: t('common.immersive'),
              highlight: null,
              newline: false,
            },
            { id: 2, text: t('common.in'), highlight: null, newline: false },
            {
              id: 3,
              text: countryName,
              highlight: 'secondary',
              newline: false,
            },
          ]}
        />
        <Container>
          <SliderWithArrows
            slider={countryResponse.data.gallery.images.map(image => ({
              image: image,
              title: image.caption || '',
              subTitle: image.alternativeText || '',
            }))}
          />
        </Container>
      </Section>
      {videoUrl && (
        <Section>
          <Container>
            <SectionHeading
              segments={[
                {
                  id: 5,
                  text: t('destination.video_by', { countryName }),
                  highlight: null,
                  newline: false,
                },
                {
                  id: 6,
                  text: 'ÔDASIE', // Usually proper nouns are not translated
                  highlight: 'secondary',
                  newline: false,
                },
              ]}
            />
            <div className="mt-5">
              <VideoMedia src={videoUrl} poster={videoPoster} />
            </div>
          </Container>
        </Section>
      )}
      {festivalResponse.data.length > 0 && (
        <Section>
          <SectionHeading
            segments={[
              {
                id: 7,
                text: t('destination.festivals_celebrations'),
                highlight: null,
                newline: false,
              },
              {
                id: 8,
                text: countryName,
                highlight: 'secondary',
                newline: false,
              },
            ]}
          />
          <Container>
            <FestivalsAndCelebrations
              festivalResponse={festivalResponse}
              country={country}
            />
          </Container>
        </Section>
      )}
      <FeaturedExperiences
        lang={lang}
        section={{
          heading: {
            segments: [
              {
                id: 9,
                text: t('destination.top_experience'),
                highlight: null,
                newline: false,
              },
              {
                id: 10,
                text: countryName,
                highlight: 'secondary',
                newline: false,
              },
            ],
          },
          numberOfItems: 10,
        }}
        params={{
          'countries.slug': country,
        }}
      />
      {hasReview && (
        <Section>
          <CustomerReviews
            showPaginator={false}
            direction="column"
            pageSize={2}
            buttonNavigation={{
              text: t('destination.show_all_reviews'),
              url: `/destination/${country}/reviews`,
            }}
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
        </Section>
      )}
      <Section>
        <Container>
          <FAQs faqs={countryResponse.data.faqs} t={t} />
        </Container>
      </Section>
      <Container>
        {guideDiscussion && (
          <AgentCard
            agent={{
              documentId:
                guideDiscussion?.tourGuide?.documentId.toString() || '',
              name: guideDiscussion?.tourGuide?.name || '',
              quote: guideDiscussion?.quote,
              profileImageUrl: guideDiscussion?.tourGuide?.avatar || null,
              backgroundImageUrl: guideDiscussion?.bgImage || null,
            }}
          />
        )}
      </Container>
      <ScrollToTop />
      {countryResponse.data.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={countryResponse.data.localizedSlugs}
          url="/destination/__slug__"
        />
      )}
    </TabsContent>
  );
}
