import { OdasieAgencySectionType } from '@/types'; // Adjust type if needed
import Container from '@/components/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import clsx from 'clsx';
import SectionHeading from '@/components/SectionHeading';
import { DOMPurifyServer } from '@/lib/dompurify';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

export default function OdasieAgencySection({
  section,
}: {
  section: OdasieAgencySectionType;
  lang: string;
}) {
  const { heading, description, bgImage, logo, cards } = section;

  const middleCard = cards.length > 0 ? cards[0] : null;
  const bottomCard = cards.length > 1 ? cards[1] : null;

  return (
    <div>
      <BackgroundImageWithFallback
        className="relative mx-auto ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-8 max-w-[100vw] bg-cover bg-top lg:mt-16 lg:min-h-[956px]"
        url={bgImage.url}>
        <div className="mx-auto w-full max-w-[1200px] overflow-hidden">
          <Container className="my-10 flex flex-col-reverse items-center lg:mt-20 lg:flex-row">
            {/* White Card - mobile: relative stacking, desktop: absolute left */}
            <div className="z-10 mx-4 mt-6 w-[542px] max-w-full rounded-[32px] bg-white p-6 shadow-xl">
              {/* Heading */}
              {heading && (
                <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-900">
                  <SectionHeading segments={heading.segments} />
                </h2>
              )}

              {/* Description */}
              <p className="typo-lg-regular mb-4 whitespace-pre-wrap">
                {description}
              </p>
            </div>
            <div className="flex flex-1 justify-center">
              {logo && (
                <div className="z-10 mt-4 flex max-w-md">
                  <ImageWithFallback
                    src={logo.url.replace(/\s+/g, '')}
                    alt="Odasie Logo"
                    width={0}
                    height={0}
                    className="w-full"
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                      height: '96px',
                      width: 'auto',
                    }}
                  />
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Middle Section Desktop (First Card) */}
        {middleCard && (
          <div className="bottom-0 left-0 z-10 mx-auto hidden w-full justify-center lg:absolute lg:flex lg:translate-y-1/3">
            <div className="w-full max-w-[1200px] lg:flex lg:justify-end">
              <div
                key={middleCard.id}
                className={clsx(
                  'flex-col gap-x-10 overflow-x-hidden rounded-[32px] bg-white p-8 px-8 lg:flex',
                  middleCard.imageRight ? 'lg:flex-row-reverse' : 'lg:flex-row',
                )}>
                {/* Image */}
                {middleCard.image && (
                  <div className="rounded-[40px]">
                    <ImageWithFallback
                      src={middleCard.image.url}
                      alt="Odasie image"
                      width={356}
                      height={0}
                      sizes="100vw"
                      style={{ objectFit: 'cover' }}
                      className="h-[487px] max-h-full rounded-[40px] object-contain object-left-top"
                      priority
                    />
                  </div>
                )}
                {/* Text Content */}
                <div
                  className="w-full lg:w-[448px]"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurifyServer.sanitize(middleCard.description),
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </BackgroundImageWithFallback>
      <Container className="mx-auto w-full max-w-[1200px]">
        {/* Middle Section Mobile (First Card) */}
        {middleCard && (
          <div
            key={middleCard.id}
            className={clsx('my-5 flex flex-col bg-white lg:hidden')}>
            {/* Image */}
            {middleCard.image && (
              <div className="flex w-full justify-center">
                <ImageWithFallback
                  src={middleCard.image.url}
                  alt="Odasie image"
                  width={356}
                  height={326}
                  sizes="100vw"
                  className="rounded-[40px] object-cover object-center"
                  priority
                />
              </div>
            )}
            {/* Text Content */}
            <div
              className="mt-5 w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurifyServer.sanitize(middleCard.description),
              }}
            />
          </div>
        )}
        {/* Bottom Section (Second Card) */}

        {bottomCard && (
          <div
            key={bottomCard.id}
            className={clsx(
              'my-10 flex flex-col items-start gap-6 lg:my-0 lg:mb-10 lg:h-screen lg:translate-y-1/3', // Adjusted padding here
              bottomCard.imageRight ? 'lg:flex-row-reverse' : 'lg:flex-row',
            )}>
            {/* Image */}
            {bottomCard.image && (
              <div className="flex w-full flex-1 items-center justify-center gap-6 lg:justify-end">
                {/* Left cropped part */}
                <div
                  className="h-[419px] w-[166px] rounded-[40px] bg-cover bg-left"
                  style={{
                    backgroundImage: `url(${bottomCard.image.url})`,
                  }}
                />

                {/* Right (main) part */}
                <div
                  className="h-[493px] w-[231px] rounded-[40px] bg-cover bg-right"
                  style={{
                    backgroundImage: `url(${bottomCard.image.url})`,
                  }}
                />
              </div>
            )}

            {/* Text Content */}
            <div
              className="w-full max-w-full lg:w-[624px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurifyServer.sanitize(bottomCard.description),
              }}
            />
          </div>
        )}
      </Container>
    </div>
  );
}
