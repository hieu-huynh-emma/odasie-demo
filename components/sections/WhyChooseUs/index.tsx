import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { WhyChooseUsSection } from '@/types';

import CoreValues from './CoreValues';
import CustomerReviews from './CustomerReviews';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

type WhyChooseUsProps = {
  lang: string;
  section: WhyChooseUsSection;
};

function WhyChooseUs({ lang, section }: WhyChooseUsProps) {
  const numberOfItems = Number(section.customerReviews?.numberOfItems);

  return (
    <section className="relative flex flex-col gap-8 py-10 lg:gap-16 lg:py-20">
      <BackgroundImageWithFallback
        className="absolute inset-0 -z-10 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] bg-cover bg-center"
        url={section.bgImage?.url || ''}
      />

      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        useContainer
        position={section.heading?.position ?? 'center'}
        textVariant={section.heading?.textVariant ?? 'secondary'}
      />
      {!isNaN(numberOfItems) && numberOfItems > 0 && (
        <CustomerReviews lang={lang} numberOfItems={numberOfItems} />
      )}
      <Container>
        <CoreValues values={section.coreValues} />
      </Container>
    </section>
  );
}

export default WhyChooseUs;
