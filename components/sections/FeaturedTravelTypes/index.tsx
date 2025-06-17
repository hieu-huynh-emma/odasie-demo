import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { TravelTypeConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import { getTravelTypes } from '@/services/travel-type';
import { Segment } from '@/types';
import CarouselFeaturedTravelTypes from './CarouselFeaturedTravelTypes';
import { TFunction } from 'i18next';

type Props = {
  lang: string;
  currentSlug?: string;
  t: TFunction<string[], string>;
};

async function FeaturedTravelTypes({ lang, currentSlug, t }: Props) {
  const queryMapper = new QueryMapper(TravelTypeConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(`?pageSize=10`));
  const res = await getTravelTypes({ locale: lang, ...criteria });

  if (!res.data || !res.data.length) {
    return null;
  }

  const travelTypes = res.data.filter(
    travelType => travelType.slug !== currentSlug,
  );

  const segments = [
    {
      id: '1',
      text: t('blog.you_may_also'),
      highlight: null,
      newline: false,
    },
    {
      id: '2',
      text: t('blog.like'),
      highlight: 'secondary',
      newline: false,
    },
  ] as Segment[];

  return (
    <Section>
      <SectionHeading segments={segments} useContainer />
      <Container>
        <CarouselFeaturedTravelTypes travelTypes={travelTypes} />
      </Container>
    </Section>
  );
}

export default FeaturedTravelTypes;
