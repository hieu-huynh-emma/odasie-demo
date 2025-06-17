import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TravelWithUsSection as TravelWithUsSectionType } from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

type TravelWithUsSectionProps = {
  lang: string;
  section: TravelWithUsSectionType;
};

function getPosition(index: number) {
  switch (index) {
    case 0:
      return 'left-5';
    case 1:
      return 'z-2';
    case 2:
      return '-left-5';
    default:
      return null;
  }
}

function TravelWithUsSection({ section }: TravelWithUsSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh/2)] flex-col items-center justify-center py-5 lg:min-h-[calc(100vh/3)] lg:py-20">
      {section.bgImage?.url && (
        <div
          className="absolute inset-0 w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${encodeURI(section.bgImage.url)})`,
            width: '100vw',
            maxWidth: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
          }}
        />
      )}
      <div className="absolute inset-0 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] bg-black/35" />
      <Container className="relative z-2 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] flex h-full w-screen max-w-[100vw] flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-7 text-white">
          <div className="relative flex max-w-1200 flex-row">
            {section.avatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className={cn(
                  'border-1/2 relative h-16 w-16 overflow-hidden rounded-full border-white bg-white',
                  getPosition(index),
                )}>
                <ImageWithFallback
                  src={avatar.url}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full rounded-full object-cover p-0.5"
                />
              </div>
            ))}
          </div>
          <SectionHeading
            segments={section.heading?.segments}
            description={section.description}
            position={section.heading?.position}
            textVariant={section.heading?.textVariant ?? 'secondary'}
            useContainer
          />
          <div className="flex w-full flex-col justify-center gap-4 lg:w-auto lg:flex-row lg:gap-7">
            {section.callToActions.map(cta => (
              <Button
                className="w-full p-0 lg:w-auto"
                key={cta.id}
                size="lg"
                variant={cta.type === 'primary' ? 'primary' : 'secondary'}>
                <Link
                  className="h-full px-4 leading-44px"
                  href={cta.url}
                  target={cta.newTab ? '_blank' : '_self'}>
                  {cta.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TravelWithUsSection;
