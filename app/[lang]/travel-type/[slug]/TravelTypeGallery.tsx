import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { Image, Segment } from '@/types';
import SliderWithArrows from '@/components/sliders/SliderWithArrows';
import { TFunction } from 'i18next';

type Props = {
  gallery: Image[];
  t: TFunction<string[], string>;
};

function TravelTypeGallery({ gallery, t }: Props) {
  if (!gallery || !gallery.length) {
    return null;
  }

  const segments = [
    { id: 1, text: t('common.all'), newline: false },
    {
      id: 2,
      text: t('common.await') + ' ',
      highlight: 'secondary',
      newline: false,
    },
    { id: 3, text: t('common.for_you_discover'), newline: false },
  ] as Segment[];

  return (
    <Section>
      <SectionHeading segments={segments} />
      <Container>
        <SliderWithArrows
          slider={gallery.map(image => ({
            image: image,
            title: image.caption || '',
            subTitle: image.alternativeText || '',
          }))}
        />
      </Container>
    </Section>
  );
}

export default TravelTypeGallery;
