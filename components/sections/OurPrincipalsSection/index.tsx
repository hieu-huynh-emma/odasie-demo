import React from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { OurPrincipalsSectionType } from '@/types';
import SectionHeading from '@/components/SectionHeading';
import { DOMPurifyServer } from '@/lib/dompurify';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { TFunction } from 'i18next';

export default function OurPrincipalsSection({
  section,
  t,
}: {
  section: OurPrincipalsSectionType;
  lang: string;
  t: TFunction<string[], string>;
}) {
  const { heading, description, subDescription, image, bgImage, card, logos } =
    section;

  return (
    <section>
      {/* Mobile content card */}
      <Container className="block lg:hidden">
        <div className="flex h-fit flex-col items-center rounded-br-[40px] bg-white lg:hidden">
          <ImageWithFallback
            src={image.url}
            alt={image.alt || 'Travelers silhouettes at sunset'}
            width={358}
            height={494}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-3xl object-contain object-right"
          />
          <div className="mt-5 flex w-full justify-center">
            {<SectionHeading segments={heading.segments} position="left" />}
          </div>

          <div
            className="mt-5 w-full"
            dangerouslySetInnerHTML={{
              __html: DOMPurifyServer.sanitize(description),
            }}
          />
        </div>

        <div
          className="mb-10 mt-5 w-full"
          dangerouslySetInnerHTML={{
            __html: DOMPurifyServer.sanitize(subDescription),
          }}
        />
      </Container>
      <div
        className="relative z-10 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] flex max-w-[100vw] items-end bg-cover bg-center lg:h-[1551px]"
        style={{ backgroundImage: `url(${bgImage.url})` }}>
        <div
          className="absolute left-0 top-0 z-[20] hidden h-[1100px] w-[1130px] -translate-x-1/4 -translate-y-[100%] bg-contain bg-no-repeat lg:block"
          style={{
            backgroundImage: `url(/images/HalfCircle.png)`,
          }}
        />
        {/* Main content container desktop */}
        <div className="left-0 right-0 top-0 hidden lg:absolute lg:block">
          <Container className="mx-auto w-full max-w-[1200px]">
            <div className="absolute left-0 right-1/2 top-0 -z-1 h-full -translate-y-[10px] bg-white" />

            <div className="-translate-y-[10px] rounded-br-[40px] bg-white pb-10 pr-6 pt-4 xl:w-[75vw]">
              {/* Heading - "OUR PRINCIPALS" */}
              {<SectionHeading segments={heading.segments} position="left" />}

              {/* Content grid */}
              <div className="mt-5 grid grid-cols-12">
                <div className="col-span-6 space-y-8">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurifyServer.sanitize(description),
                    }}
                  />
                </div>

                {/* Right column with image */}
                <div className="col-span-5 flex justify-end">
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt || 'Travelers silhouettes at sunset'}
                    width={343}
                    height={494}
                    sizes="100vw"
                    className="rounded-3xl object-contain object-right"
                  />
                </div>
              </div>

              <div
                className="mt-5 w-full"
                dangerouslySetInnerHTML={{
                  __html: DOMPurifyServer.sanitize(subDescription),
                }}
              />
            </div>
          </Container>
        </div>

        {/* Eco-Responsibility Section with Background */}
        <div className="w-full">
          <div className="container mx-auto max-w-[1200px] p-4 sm:px-2 lg:px-8 lg:py-24">
            <div className="grid grid-cols-12 gap-6">
              {/* Eco Card */}
              <div className="order-2 col-span-12 md:order-1 md:col-span-5 lg:col-span-4">
                <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
                  <h3 className="mb-6 text-3xl font-bold text-[#00425E]">
                    {card.title}
                  </h3>

                  <div className="space-y-6">
                    <p className="typo-lg-regular">{card.description}</p>
                    <Button
                      className="typo-base-medium w-full px-4 py-0 lg:w-auto"
                      size="lg"
                      variant="secondary"
                      asChild>
                      <Link
                        href="/our-action"
                        className="typo-base-medium flex items-center gap-2">
                        {t('common.learn_more')}
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Press Logos */}
              <div className="order-1 col-span-12 flex items-center justify-center md:order-2 md:col-span-7 lg:col-span-8 lg:justify-end">
                <div className="flex max-w-[362px] flex-wrap items-center justify-center">
                  {logos.map((logo, index) => (
                    <div
                      key={index}
                      className="mb-4 ml-4 flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-xl">
                      <ImageWithFallback
                        src={logo.url}
                        alt="Business Insider"
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                        style={{
                          width: 'auto',
                          height: '100%',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
