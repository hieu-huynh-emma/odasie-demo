import QuoteCard from '@/components/cards/QuoteCard';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { HeadingSection } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type Props = {
  heading?: HeadingSection;
  guideIntroQuote: string;
  guideAuthor: {
    name: string;
    image: string;
    position: string;
  } | null;
  image: string | null;
};

export default function TourGuideQuoteImage({
  guideIntroQuote,
  guideAuthor,
  image,
  heading,
}: Props) {
  return (
    <Container>
      {heading && (
        <SectionHeading
          segments={heading.segments}
          textVariant={heading.textVariant}
        />
      )}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[3fr_1fr]">
        {guideIntroQuote && guideAuthor && (
          <div>
            <QuoteCard quote={guideIntroQuote} author={guideAuthor} />
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          {image && (
            <ImageWithFallback
              width={296}
              height={480}
              src={image}
              alt="Quote image"
              className="h-full"
              sizes="100vw"
            />
          )}
        </div>
      </div>
    </Container>
  );
}
