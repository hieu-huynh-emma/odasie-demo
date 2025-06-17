import Link from 'next/link';
import { TFunction } from 'i18next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { Button } from '@/components/ui/button';
import { Segment, Tour } from '@/types';
import CarouselFeaturedTour from '@/components/sections/FeaturedTours/CarouselFeaturedTour';

type Props = {
  tours: Tour[];
  toursUrl: string;
  t: TFunction<string[], string>;
};

async function TravelTypeFeaturedTours({ tours, toursUrl, t }: Props) {
  if (!tours || !tours.length) {
    return null;
  }

  const segments = [
    {
      id: '1',
      text: `${t('common.experience_title')} `,
      highlight: null,
      newline: false,
    },
    {
      id: '2',
      text: t('common.the_theme'),
      highlight: 'secondary',
      newline: false,
    },
  ] as Segment[];

  return (
    <Section
      bg="secondary"
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-8 max-w-[100vw] pb-8 lg:mt-16 lg:pb-16">
      <SectionHeading segments={segments} position="center" useContainer />
      <Container className="max-w-1200">
        <CarouselFeaturedTour tours={tours} />
      </Container>

      <div className="mt-12 flex justify-center">
        <Link href={toursUrl} title="See all tours">
          <Button variant="secondary" size="lg">
            {t('experience.see_all_tours')}
          </Button>
        </Link>
      </div>
    </Section>
  );
}

export default TravelTypeFeaturedTours;
