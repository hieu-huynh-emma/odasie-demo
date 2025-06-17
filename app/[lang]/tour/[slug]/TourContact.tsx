import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { GlobalSettings, Tour } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import DynamicIcon from '@/components/DynamicIcon';
import { TFunction } from 'i18next';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type TourContactProps = {
  tour: Tour;
  globalSetting: GlobalSettings;
  t: TFunction<string[], string>;
};

async function TourContact({ tour, t, globalSetting }: TourContactProps) {
  return (
    <div className="sticky top-0 overflow-hidden rounded-sm border border-gray-300 shadow-md lg:rounded-md">
      <div className="flex flex-col items-center space-y-2 bg-primary-500 px-5 py-4">
        <p className="typo-base-regular text-gray-800">
          {t('tour.get_travel_idea')}
        </p>
        <p className="typo-3xl-bold text-secondary-500">
          {`${new Intl.NumberFormat().format(tour.startingPrice?.price)} ${tour.startingPrice?.currency}`}{' '}
          <span className="typo-2xl-bold">{`/ ${tour.startingPrice?.unit}`}</span>
        </p>
        <p className="typo-lg-semibold text-gray-800">
          {t('tour.location', {
            duration: tour.duration,
            location: tour.regions.length,
          })}
        </p>
      </div>
      <div className="flex flex-col items-center space-y-3 px-5 py-4">
        <p className="typo-base-regular text-gray-800"> {t('tour.trip_by')}</p>
        {tour.tourGuide?.avatar?.url ? (
          <Avatar className="h-23 w-23">
            <AvatarImage
              src={tour.tourGuide?.avatar?.url}
              alt={tour.tourGuide?.name || 'tour guide'}
            />
            <AvatarFallback>{tour.tourGuide?.name}</AvatarFallback>
          </Avatar>
        ) : (
          <ImageWithFallback
            src={tour.tourGuide?.avatar?.url}
            alt="tour guide"
            width={96}
            height={96}
            className="mb-4 h-23 w-23 rounded-full border-4 border-white object-cover shadow-md md:h-23 md:w-23"
          />
        )}
        <div className="space-y-1 text-center">
          <p className="typo-xl-semibold text-gray-900">
            {tour.tourGuide?.name}
          </p>
          <p className="typo-xs-regular text-gray-600">{tour.tourGuide?.bio}</p>
        </div>
        {tour.tourFeatures && tour.tourFeatures.length > 0 ? (
          <div className="!mt-5 flex w-full flex-row justify-around">
            {tour.tourFeatures?.map(feat => (
              <div
                key={feat.id}
                className="flex flex-col items-center justify-center gap-2">
                <DynamicIcon name={feat.icon.name} size={24} />
                <span className="typo-xs-regular text-gray-900">
                  {feat.name}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="px-5">
        <Separator className="bg-gray-300" />
      </div>
      <div className="flex flex-col items-center px-5 py-4">
        <Link href={`/create-your-itinerary?tourSlug=${tour.slug}`}>
          <Button variant="primary" size="lg">
            {t('tour.personalized', { name: tour.tourGuide?.name })}
            <ArrowRight size={20} />
          </Button>
        </Link>
        <p className="typo-xs-semibold mt-5 text-center text-gray-900">
          {t('tour.ask_question')}
          <Link
            href={globalSetting.faqPage.url}
            className="ml-1 mr-1 underline">
            FAQ
          </Link>
          {t('common.or')}
          <Link
            href={globalSetting.policyPage?.url || ''}
            className="ml-1 underline">
            {t('tour.general_conditions')}
          </Link>
        </p>
        <p className="typo-xs-semibold text-gray-900">
          {t('common.consult')}
          <Link
            href={globalSetting.insurancePage.url}
            className="ml-1 underline">
            {t('common.insurance')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TourContact;
