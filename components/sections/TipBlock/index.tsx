import { TipBlock as TipBlockType } from '@/types';
import Container from '@/components/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import DynamicIcon from '@/components/DynamicIcon';
import { DOMPurifyServer } from '@/lib/dompurify';

type TipBlockProps = {
  section: TipBlockType;
};

function TipBlock({ section }: TipBlockProps) {
  return (
    <Container className="mb-5">
      <div className="flex flex-col overflow-hidden rounded-sm bg-secondary-500 lg:flex-row lg:rounded-md">
        <div className="h-[308px] rounded-sm lg:h-auto lg:w-1/2 lg:flex-1 lg:rounded-md">
          <ImageWithFallback
            src={encodeURI(section.bgImage.url)}
            alt="background image"
            width={0}
            height={0}
            sizes="100vh"
            style={{ width: '100%', height: '100%' }}
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-8 px-6 py-8 lg:w-1/2 lg:flex-1 lg:px-10">
          <div className="flex justify-center">
            <ImageWithFallback
              src={encodeURI(section.logo.url)}
              alt="logo"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ width: 'auto', height: '200px' }}
              className="h-auto w-full"
            />
          </div>
          <div className="space-y-6 text-center">
            <h2 className="typo-4xl-regular text-primary-500">
              {section.title}
            </h2>
            {section.text && (
              <div
                className="typo-xl-regular text-white"
                dangerouslySetInnerHTML={{
                  __html: DOMPurifyServer.sanitize(section.text),
                }}
              />
            )}
          </div>
          {section.features &&
            section.features.map((feature, index) => (
              <div key={index} className="py-3">
                <div className="flex flex-col items-start gap-4 sm:flex-row lg:items-center">
                  <div className="rounded-full bg-primary-500 p-2">
                    <DynamicIcon
                      name={feature.icon.name}
                      size={16}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="typo-sm-bold text-white">{feature.text}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
}

export default TipBlock;
