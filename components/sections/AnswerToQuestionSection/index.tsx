import type { AnswerToQuestionSection } from '@/types/section';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { IMAGE_SIZES, DEFAULT_IMAGE_QUALITY } from '@/utils/imageUtils';

interface Props {
  section: AnswerToQuestionSection;
}

export default function AnswerToQuestionSection({ section }: Props) {
  const { heading, sideImage, sideText, text, images } = section;

  return (
    <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] flex min-h-[400px] max-w-[100vw] flex-col items-center justify-center gap-8 px-4 py-10">
      {/* Heading */}
      <div className="mb-4 flex w-full max-w-1200 items-start justify-center">
        <h2 className="typo-3xl-bold line-clamp-2 w-full border border-gray-200 bg-[#00324C] px-4 py-2 text-left text-white">
          {heading}
        </h2>
      </div>
      {/* Main content row */}
      <div className="flex w-full max-w-1200 flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
        {/* Left: Side image and text */}
        {(sideImage || sideText) && (
          <div className="mb-6 flex w-full min-w-[180px] max-w-[320px] flex-col items-center justify-center lg:mb-0 lg:w-[320px] lg:items-center lg:justify-center">
            {sideText && (
              <div
                className="prose prose-lg mb-2 w-full text-center italic"
                dangerouslySetInnerHTML={{ __html: sideText }}
              />
            )}
            {sideImage && (
              <ImageWithFallback
                src={sideImage.url}
                alt={sideImage.alt || 'Side illustration'}
                width={320}
                height={320}
                sizes={IMAGE_SIZES.SIDEBAR}
                quality={DEFAULT_IMAGE_QUALITY}
                className="h-[180px] w-auto rounded-xl object-cover lg:h-[320px]"
              />
            )}
          </div>
        )}
        {/* Center: Text or Images */}
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          {text ? (
            <div
              className="prose prose-lg w-full max-w-2xl text-left"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          ) : images && images.length > 0 ? (
            <div className="grid w-full grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-20">
              {images.map(img => (
                <ImageWithFallback
                  key={img.id}
                  src={img.url}
                  alt={img.alt || 'Answer image'}
                  width={400}
                  height={400}
                  sizes={IMAGE_SIZES.GALLERY}
                  quality={DEFAULT_IMAGE_QUALITY}
                  className="h-auto w-full max-w-[400px] rounded-xl object-cover"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
