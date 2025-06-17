import Container from '@/components/Container';
import {
  GlobalSettings,
  OdasiePlusSection as OdasiePlusSectionType,
} from '@/types';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

export default function OdasiePlusSection({
  section,
  settings,
}: {
  section: OdasiePlusSectionType;
  settings: GlobalSettings | null;
}) {
  return (
    <div className="mx-auto h-fit w-screen max-w-[1200px] overflow-hidden">
      <Container className="relative grid w-full grid-cols-12 gap-x-3 py-20 pb-10 lg:mb-20">
        <div className="col-span-12 mt-5 grid grid-cols-12 gap-x-5 gap-y-10 border-t border-gray-300 pt-10 xl:col-span-9">
          <p className="typo-3xl-regular col-span-12 xl:col-span-4">
            {section.title}
          </p>
          <div className="relative col-span-12 flex flex-col items-center justify-between gap-y-2 rounded-sm bg-primary-500 px-6 py-10 lg:rounded-md xl:hidden xl:flex-row">
            <h4 className="typo-xl-semibold z-1 xl:flex-1">
              {section.appIntroduction}
            </h4>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <ImageWithFallback
                width={0}
                height={0}
                className="h-full w-full"
                src="/images/icons/Vector.svg"
                alt="Vector"
              />
            </div>
            <div className="z-1 flex justify-end gap-4 xl:flex-[2]">
              {settings?.googleStoreUrl && (
                <Link
                  href={settings.googleStoreUrl}
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
              {settings?.appleStoreUrl && (
                <Link
                  href={settings.appleStoreUrl}
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
          {section.paragraphs.map(paragraph => (
            <p
              key={`paragraph-${paragraph.id}`}
              className="typo-sm-regular col-span-12 xl:col-span-4">
              {paragraph.text}
            </p>
          ))}
          <div className="relative col-span-12 hidden items-center justify-between rounded-sm bg-primary-500 px-6 py-10 lg:rounded-md xl:flex">
            <h4 className="typo-xl-semibold flex-1">
              {section.appIntroduction}
            </h4>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/images/icons/Vector.svg" alt="Vector" />
            </div>
            <div className="flex flex-[2] justify-end gap-4">
              {settings?.googleStoreUrl && (
                <Link
                  href={settings?.googleStoreUrl}
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
              {settings?.appleStoreUrl && (
                <Link
                  href={settings?.appleStoreUrl}
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
        <div className="col-span-12 mt-4 xl:hidden">
          <ImageWithFallback
            width={368}
            height={368}
            src={section.image.url}
            alt="Odasie+ app"
            className="m-auto h-[368px] max-h-full w-[368px] max-w-full rounded-full object-cover object-center"
          />
        </div>
        {/* Back circle (offset shape) */}
        <div className="absolute -right-28 z-0 hidden h-[368px] w-[368px] translate-y-[32%] rounded-full bg-[#003C5F] xl:block"></div>

        {/* Foreground image (cropped in circle) */}
        <div className="absolute -right-20 hidden h-[368px] w-[368px] translate-y-1/4 overflow-hidden rounded-full xl:block">
          <ImageWithFallback
            width={368}
            height={368}
            src={section.image.url}
            alt="Odasie+ app"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Container>
    </div>
  );
}
