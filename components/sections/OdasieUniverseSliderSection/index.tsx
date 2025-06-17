import { OdasieUniverseSliderSection as OdasieUniverseSliderSectionType } from '@/types';
import Container from '@/components/Container';
import FlexibleSlider from '@/components/sliders/FlexibleSlider';
import SectionHeading from '@/components/SectionHeading';

export default function OdasieUniverseSliderSection({
  section,
}: {
  section: OdasieUniverseSliderSectionType;
  lang: string;
}) {
  return (
    <Container className="mt-8 w-full lg:mt-16">
      {section.heading && (
        <SectionHeading segments={section.heading.segments} position="center" />
      )}
      <div>
        <FlexibleSlider slider={section.flexibleSliders} />
      </div>
    </Container>
  );
}
