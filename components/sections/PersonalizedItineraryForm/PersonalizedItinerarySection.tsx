import { getTour } from '@/services';
import { ItineraryFormSection } from '@/types';
import PersonalizedItineraryForm from '.';
import { getTourGuide } from '@/services/tour-guide';
import { initializeI18n } from '@/lib/i18n';

export default async function PersonalizedItinerarySection({
  lang,
  section,
  queryParameters,
  url,
}: {
  lang: string;
  section: ItineraryFormSection;
  queryParameters: { [key: string]: string | string[] };
  url: string | undefined;
}) {
  const tourSlug = queryParameters?.tourSlug as string | undefined;
  const tourGuideId = queryParameters?.tourGuideId as string | undefined;
  let tourGuideLogo = section?.defaultTourGuide?.avatar?.url;
  let backGroundImageUrl = section?.bgImage?.url;
  const { t } = await initializeI18n(lang, ['common']);
  let destinationName = t('create_your_itinerary.title');
  if (tourSlug) {
    const tour = (await getTour(tourSlug, lang)).data;
    if (!tour) {
      return <></>;
    }
    destinationName = tour.title;
    if (tour?.tourGuide?.avatar) {
      tourGuideLogo = tour.tourGuide.avatar.url;
    }
    if (tour?.image) {
      backGroundImageUrl = tour.image.url;
    }
  }
  if (tourGuideId) {
    const tourGuide = (
      await getTourGuide(tourGuideId, lang, { populate: { avatar: true } })
    ).data;
    if (tourGuide?.avatar) {
      tourGuideLogo = tourGuide.avatar.url;
    }
  }

  return (
    <PersonalizedItineraryForm
      steps={section.steps}
      tourGuideLogo={tourGuideLogo}
      backGroundImageUrl={backGroundImageUrl}
      destinationName={destinationName}
      url={url}
      lang={lang}
      emailTemplate={section.emailTemplate}
      emailForOdasieTemplateId={section.emailTemplateForOdasie}
    />
  );
}
