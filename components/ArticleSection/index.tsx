'use client';
import { HeadingSection, Image as ImageType } from '@/types';
import SectionHeading from '../SectionHeading';
import Container from '@/components/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Article from './Article';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { getSizesByContainerWidth } from '@/utils/imageUtils';

type Props = {
  heading?: HeadingSection;
  image: ImageType;
  content: string;
};

export default function ArticleSection({ heading, image, content }: Props) {
  const imageUrl = useResponsiveImage(image);
  return (
    <Container className="flex flex-col">
      {heading && (
        <SectionHeading
          segments={heading.segments}
          textVariant={heading.textVariant}
        />
      )}
      {imageUrl && (
        <ImageWithFallback
          width={0}
          height={0}
          alt="Article image"
          src={imageUrl}
          sizes={getSizesByContainerWidth('full')}
          priority={true}
          className="oject-contain h-auto w-full rounded-sm lg:h-[600px] lg:rounded-[25px]"
        />
      )}
      {content && <Article content={content} />}
    </Container>
  );
}
