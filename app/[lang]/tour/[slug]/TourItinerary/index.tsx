import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { HeadingSection, Tour } from '@/types';
import { TFunction } from 'i18next';
import DaysNavigation from './DaysNavigation';
import TourDayDetails from './TourDayDetails';
import TourItineraryProvider from './TourItineraryProvider';
import TourMap from './TourMap';

function TourItinerary({
  tour,
  t,
}: {
  tour: Tour;
  t: TFunction<string[], string>;
}) {
  const heading: HeadingSection = {
    segments: [
      { id: 1, text: t('common.day_by_day'), highlight: null, newline: false },
      {
        id: 1,
        text: t('common.itinerary'),
        highlight: 'secondary',
        newline: false,
      },
    ],
  };

  if (tour.itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      <SectionHeading
        segments={heading.segments}
        position="left"
        useContainer
      />
      <div>
        <TourItineraryProvider itinerary={tour.itinerary}>
          <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] hidden max-w-[100vw] bg-gray-100 lg:block">
            <Container className="max-w-1200">
              <DaysNavigation />
            </Container>
          </div>

          <Container>
            <div className="flex h-fit flex-col-reverse md:h-[calc(0.75*100vh)] md:flex-row">
              <TourDayDetails
                tour={tour}
                className="h-fit w-full md:h-full md:overflow-y-auto lg:w-1/3"
              />
              <div className="mb-5 w-full overflow-hidden md:mb-0 lg:w-2/3">
                <TourMap />
              </div>
            </div>
          </Container>
        </TourItineraryProvider>
      </div>
    </div>
  );
}

export default TourItinerary;
