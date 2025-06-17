import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import { getGlobalSettings } from '@/services';
import Container from '@/components/Container';
import SegmentText from '@/components/SectionHeading/SegmentText';
import Section from '@/components/sections/Section';
import { MobileApplicationSection } from '@/types';
import FeatureList from './FeatureList';

type MobileApplicationsProps = {
  lang: string;
  section: MobileApplicationSection;
};

async function MobileApplications({ section, lang }: MobileApplicationsProps) {
  const globalSettings = await getGlobalSettings(lang);
  const { data } = globalSettings;

  return (
    <Section>
      <Container>
        <div className="flex flex-col overflow-hidden rounded-sm bg-primary-500 lg:flex-row lg:rounded-md">
          <div className="h-[308px] lg:h-auto lg:w-1/2 lg:flex-1">
            <ImageWithFallback
              src="/images/mobile-applications.png"
              alt=""
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
                src="/images/mobile-app-logomark.png"
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: 'auto', height: '200px' }}
                className=""
              />
            </div>
            <div className="space-y-6 text-center">
              <h2 className="typo-4xl-regular text-gray-900">
                {section.heading?.segments.map(segment => (
                  <SegmentText key={segment.id} segment={segment} />
                ))}
              </h2>
              {section.description && (
                <p className="typo-xl-regular text-gray-900">
                  {section.description}
                </p>
              )}
            </div>

            <FeatureList features={section.features} />

            <div className="flex justify-center gap-4">
              {data?.googleStoreUrl && (
                <Link
                  href={data.googleStoreUrl}
                  title="Google Play"
                  target="_blank">
                  <ImageWithFallback
                    src="/images/badge-google-store.svg"
                    alt="Google Play"
                    width={0}
                    height={0}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Link>
              )}
              {data?.appleStoreUrl && (
                <Link
                  href={data.appleStoreUrl}
                  title="App Store"
                  target="_blank">
                  <ImageWithFallback
                    src="/images/badge-apple-store.svg"
                    alt="App Store"
                    width={0}
                    height={0}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default MobileApplications;
