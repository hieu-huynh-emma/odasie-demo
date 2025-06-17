import Container from '@/components/Container';
import Section from '@/components/sections/Section';
import { DOMPurifyServer } from '@/lib/dompurify';
import { ContentSection as ContentSectionType } from '@/types';

import ExpandableItems from './ExpandableItems';

type ContentSectionProps = {
  section: ContentSectionType;
};

function ContentSection({ section }: ContentSectionProps) {
  return (
    <Section
      bg="secondary"
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw]">
      <Container className="max-w-1200">
        <div className="mx-auto max-w-1200 border border-gray-300 bg-white p-8">
          {section.content && (
            <div
              className="small-text-mobile prose max-w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurifyServer.sanitize(section.content),
              }}
            />
          )}
          {section.expandableItems && section.expandableItems.length > 0 ? (
            <ExpandableItems items={section.expandableItems} />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default ContentSection;
