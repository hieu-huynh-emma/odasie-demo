import { AssociatedBlock as AssociatedBlockType } from '@/types';
import Section from '../Section';
import SectionHeading from '@/components/SectionHeading';
import Container from '@/components/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import AssociatedContent from './AssociatedContent';

type AssociatedBlockProps = {
  section: AssociatedBlockType;
};
function AssociatedBlock({ section }: AssociatedBlockProps) {
  return (
    <Section>
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
      />
      <Container>
        {section.blocks.map(block => (
          <div
            key={block.id}
            className="grid grid-cols-1 items-start justify-start gap-4 py-6 text-left lg:grid-cols-[240px_1fr] lg:gap-8">
            <div className="col-span-1 flex justify-start lg:mb-0 lg:justify-end">
              <ImageWithFallback
                src={encodeURI(block.logo.url)}
                alt={block.title}
                width={240}
                height={240}
                className="h-32 w-32 object-contain lg:h-[240px] lg:w-[240px]"
              />
            </div>
            <div className="col-span-1 flex w-full justify-start">
              <AssociatedContent block={block} />
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}

export default AssociatedBlock;
