import { FeatureBlock as FeatureBlockType } from '@/types';
import Section from '../Section';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/Container';
import FeatureBlockContent from './FeatureBlockConent';
type FeatureBlockProps = {
  section: FeatureBlockType;
};

function FeatureBlock({ section }: FeatureBlockProps) {
  return (
    <Section>
      <SectionHeading
        segments={section.heading?.segments}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        shouldHideSegmentSpacing={true}
      />
      <Container>
        {section.blocks.map(block => (
          <FeatureBlockContent key={block.id} block={block} />
        ))}
      </Container>
    </Section>
  );
}
export default FeatureBlock;
