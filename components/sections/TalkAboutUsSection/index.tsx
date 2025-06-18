import Container from '@/components/Container';
import InstagramDisplay from '@/components/Instagram';
import SectionHeading from '@/components/SectionHeading';
import { TalkAboutUsSection as TalkAboutUsSectionType } from '@/types';
import Marquee from 'react-fast-marquee';
import Card from './Card';

export default function TalkAboutUsSection({
  section,
}: {
  section?: TalkAboutUsSectionType;
  lang: string;
}) {
  return (
    <div className="mx-0 mt-8 flex max-w-[1200px] flex-col lg:mx-auto lg:mt-16">
      {section?.heading && (
        <div>
          <SectionHeading
            segments={section.heading.segments}
            useContainer
            position={section.heading.position ?? 'center'}
            textVariant={section.heading.textVariant ?? 'secondary'}
          />
        </div>
      )}
      <Marquee gradient autoFill className="mx-auto h-[96px] max-w-[1200px]">
        {section?.marqueeSlides?.map(slide => {
          if (!slide.image?.url) return null;
          return (
            <img
              key={slide.id}
              src={slide.image.url}
              alt="Brand image"
              className="mx-8 my-auto h-[48px] object-contain object-center"
            />
          );
        })}
      </Marquee>
      <div className="mt-8 rounded-[32px] bg-gray-200 p-6 lg:mt-16">
        <Container className="mx-auto grid w-full grid-cols-1 gap-4 lg:max-w-[1200px] lg:grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            {section?.instagram && (
              <InstagramDisplay instagram={section.instagram} />
            )}
          </div>
          {section?.embedVideo && (
            <div className="col-span-12 md:col-span-6">
              <div
                className="relative overflow-hidden"
                dangerouslySetInnerHTML={{ __html: section.embedVideo }}
              />
            </div>
          )}
          {section?.cards?.map(card => {
            return (
              <div
                key={`card-${card.id}`}
                className="col-span-12 md:col-span-6">
                <Card card={card} />
              </div>
            );
          })}
        </Container>
      </div>
    </div>
  );
}
