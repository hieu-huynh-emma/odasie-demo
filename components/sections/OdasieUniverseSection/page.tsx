import Link from 'next/link';
import Container from '@/components/Container';
import DynamicIcon from '@/components/DynamicIcon';
import SectionHeading from '@/components/SectionHeading';
import FlexibleSlider from '@/components/sliders/FlexibleSlider';
import { Button } from '@/components/ui/button';
import { OdasieUniverseSection as OdasieUniverseSectionType } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Props {
  lang: string;
  section: OdasieUniverseSectionType;
}
export default function OdasieUniverseSection({ section }: Props) {
  return (
    <div className="pt-8 lg:pt-16">
      {section.heading && (
        <div>
          <SectionHeading
            segments={section.heading.segments}
            useContainer
            position={section.heading.position ?? 'center'}
            textVariant={section.heading.textVariant ?? 'secondary'}
          />
        </div>
      )}
      <Container className="grid w-full grid-flow-row-dense grid-cols-12 gap-x-5 gap-y-5">
        {section.destinationCard && (
          <div className="relative order-2 col-span-12 flex h-full max-h-[580px] flex-col items-center justify-between rounded-sm px-6 py-5 lg:order-1 lg:col-span-3 lg:rounded-md">
            <ImageWithFallback
              src={
                section.destinationCard.bgImage?.formats?.medium?.url ||
                section.destinationCard.bgImage?.url
              }
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              priority
              className="absolute inset-0 z-0 rounded-sm object-cover lg:rounded-md"
            />
            <div
              className="absolute left-0 right-0 top-0 z-0 flex h-[250px] rounded-t-md opacity-80 bg-blend-multiply mix-blend-multiply"
              style={{
                background: `linear-gradient(0deg, rgba(217, 217, 217, 0) 15.35%, #000000 100%)`,
              }}
            />
            <div className="z-10 flex items-center gap-x-[10px]">
              {section.destinationCard.icon && (
                <DynamicIcon
                  name={section.destinationCard.icon.name}
                  color="white"
                  width={64}
                  height={64}
                  className="m-auto h-[64px] w-[64px]"
                />
              )}
              {section.destinationCard.title && (
                <h4 className="text-[20px] font-bold uppercase leading-[105%] tracking-normal text-white">
                  {section.destinationCard.title}
                </h4>
              )}
            </div>
            <div className="z-10 flex flex-col items-center gap-y-5">
              <p className="typo-2xl-bold text-center uppercase text-white">
                {section.destinationCard.region.name}
              </p>
              {section.destinationCard?.callToAction && (
                <div className="flex justify-center">
                  <Link
                    href={section.destinationCard.callToAction.url}
                    title={section.destinationCard.callToAction.label}>
                    <Button variant="primary" className="text-black">
                      {section.destinationCard.callToAction.label}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="order-1 col-span-12 lg:order-2 lg:col-span-9">
          <FlexibleSlider slider={section.flexibleSliders} />
        </div>
      </Container>
    </div>
  );
}
