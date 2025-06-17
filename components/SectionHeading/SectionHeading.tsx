import Container from '@/components/Container';
import { Segment } from '@/types';
import SegmentText from './SegmentText';
import { cn } from '@/lib/utils';
import { DOMPurifyServer } from '@/lib/dompurify';
import SectionContent from './SectionContent';

type SectionHeadingProps = {
  segments?: Segment[];
  description?: string;
  position?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2';
  textVariant?: 'primary' | 'secondary';
  useContainer?: boolean;
  ratingCountryId?: number;
  scrollElement?: {
    targetSelector?: string;
    label: string;
    href?: string;
  };
  shouldHideSegmentSpacing?: boolean;
  lang?: string;
  rating?: any;
  isMobile?: boolean;
};

function SectionHeading({
  segments,
  description,
  position = 'center',
  as: HeadingTag = 'h2',
  textVariant = 'primary',
  useContainer = false,
  shouldHideSegmentSpacing = false,
  scrollElement,
  ratingCountryId,
  rating,
  isMobile,
}: SectionHeadingProps) {
  const getPosition = (position: string) => {
    switch (position) {
      case 'left':
        return 'items-start text-left';
      case 'center':
        return 'items-center text-center';
      case 'right':
        return 'items-end text-right';
      default:
        return null;
    }
  };

  const headingClass =
    HeadingTag === 'h2' ? 'typo-5xl-regular' : 'typo-6xl-regular';

  const subHeadingSize = isMobile ? '2xl' : HeadingTag === 'h2' ? '4xl' : '5xl';

  const HeadingBlock = (
    <div
      className={cn(
        'flex flex-col pb-8 lg:pb-16',
        ratingCountryId && 'pb-0 lg:pb-0',
        getPosition(position),
      )}>
      {/* Critical content that renders immediately on server */}
      <HeadingTag
        className={cn(
          'uppercase',
          isMobile ? 'typo-3xl-regular' : headingClass,
          textVariant === 'primary' && 'text-gray-900',
          textVariant === 'secondary' && 'text-white',
        )}>
        {segments?.map(segment => (
          <SegmentText
            key={`${segment.id}_${segment.text}`}
            segment={segment}
            shouldHideSpacing={shouldHideSegmentSpacing}
            subHeadingSize={subHeadingSize}
          />
        ))}
      </HeadingTag>

      {/* Critical description that renders immediately on server */}
      {description && (
        <div
          className={cn(
            'typo-md-regular prose mt-4 max-w-full lg:typo-lg-regular lg:mt-8',
            textVariant === 'primary' && 'text-gray-900 [&_*]:text-gray-900',
            textVariant === 'secondary' && 'text-white [&_*]:text-white',
          )}
          dangerouslySetInnerHTML={{
            __html: DOMPurifyServer.sanitize(description),
          }}
        />
      )}

      {/* Progressive content loaded on client */}
      <SectionContent
        ratingCountryId={ratingCountryId}
        rating={rating}
        scrollElement={scrollElement}
      />
    </div>
  );

  return useContainer ? <Container>{HeadingBlock}</Container> : HeadingBlock;
}

export default SectionHeading;
