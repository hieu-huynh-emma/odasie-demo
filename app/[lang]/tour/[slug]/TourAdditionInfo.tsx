import { CircleCheck, CircleX } from 'lucide-react';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { DOMPurifyServer } from '@/lib/dompurify';
import { Tour } from '@/types';
import Link from 'next/link';
import { TFunction } from 'i18next';

type TourAdditionInfoProps = {
  tour: Tour;
  t: TFunction<string[], string>;
};

async function TourAdditionInfo({ tour, t }: TourAdditionInfoProps) {
  return (
    <div className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] bg-gray-100 py-10 lg:py-20">
      <Container className="max-w-1200 space-y-12">
        <h2 className="typo-5xl-regular text-center uppercase">
          {t('tour.date_price')}
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
              <div className="space-y-2 rounded-sm bg-white p-6 shadow-sm">
                <p className="typo-lg-semibold text-gray-900">
                  {t('tour.suggest_duration')}
                </p>
                <p className="typo-2xl-regular text-gray-900">
                  {t('common.day', { days: tour.duration })}
                </p>
              </div>
              <div className="h-full space-y-4 rounded-sm bg-primary-500 p-6 shadow-sm">
                <p className="typo-lg-semibold text-gray-900">
                  {t('tour.price_from')}
                </p>
                <p className="typo-5xl-bold text-secondary-500">
                  {`${new Intl.NumberFormat().format(tour.startingPrice?.price)} ${tour.startingPrice?.currency}`}
                </p>
              </div>
            </div>
            <div className="col-span-12 space-y-4 rounded-sm bg-white p-6 shadow-sm lg:col-span-4">
              <CircleCheck
                size={40}
                className="fill-secondary-500 text-white"
              />
              <div>
                <strong>{t('tour.price_include')}</strong>
                <div
                  className="prose mt-3 prose-ul:list-disc prose-li:my-0 prose-li:marker:text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurifyServer.sanitize(tour.inclusions),
                  }}
                />
              </div>
            </div>
            <div className="col-span-12 space-y-4 rounded-sm bg-white p-6 shadow-sm lg:col-span-4">
              <CircleX size={40} className="fill-secondary-500 text-white" />
              <div>
                <strong>{t('tour.price_not_include')}</strong>
                <div
                  className="prose mt-3 prose-ul:list-disc prose-li:my-0 prose-li:marker:text-black"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurifyServer.sanitize(tour.exclusions),
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="typo-base-regular mx-auto max-w-screen-md space-y-5 text-center text-black"
            dangerouslySetInnerHTML={{
              __html: DOMPurifyServer.sanitize(tour.notes),
            }}
          />
        </div>

        <div className="text-center">
          <Button variant="primary" size="xl">
            <Link href={`/create-your-itinerary?tourSlug=${tour.slug}`}>
              {t('tour.request_trip_qoute')}
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default TourAdditionInfo;
