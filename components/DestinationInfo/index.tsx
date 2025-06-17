import React from 'react';
import {
  Clock,
  Building2,
  Euro,
  PlaneLanding,
  Utensils,
  Languages,
  HeartHandshake,
} from 'lucide-react';
import Container from '../Container';
import { Country } from '@/types';
import { TFunction } from 'i18next';

type DestinationInfoProps = {
  country: Country;
  t: TFunction<string[], string>;
};

const DestinationInfo = ({ country, t }: DestinationInfoProps) => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
        {/* Capital Section */}
        <div className="order-1 rounded-sm bg-secondary-500 p-6 sm:col-span-12 lg:col-span-3 lg:rounded-md">
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-[#197C81] p-2.5">
              <Building2 className="text-white" size={20} />
            </div>
            <div>
              <strong className="typo-base-bold uppercase text-white">
                {t('destination.capital')}:{' '}
              </strong>
              <span className="type-base-regular uppercase text-white">
                {country.capital}
              </span>
            </div>
          </div>
        </div>

        {/* Time Difference Section */}
        <div className="relative order-3 row-span-2 rounded-sm bg-[#197C81] p-6 sm:col-span-12 lg:order-2 lg:col-span-6 lg:rounded-md">
          <div
            className="absolute inset-0 bg-right bg-no-repeat"
            style={{ backgroundImage: 'url(/images/time-person.svg)' }}
          />
          <div className="relative z-2 flex items-start gap-6 pr-30">
            <div className="rounded-full bg-secondary-500 p-2.5">
              <Clock className="text-white" size={20} />
            </div>
            <div className="text-white">
              <strong className="typo-base-bold uppercase text-white">
                {t('destination.time_difference')}
              </strong>
              <div>
                {country.name} is{' '}
                <span className="font-bold">
                  {`${country.timeDifferenceSummer} `}
                </span>
                {` ${t('destination.summer')} `}
                <span className="text-sm">
                  ({t('destination.time_difference_period_summer')})
                </span>
                <span className="font-bold">
                  {` ${country.timeDifferenceWinter} `}
                </span>
                {` ${t('destination.winter')} `}
                <span className="text-sm">
                  ({t('destination.time_difference_period_winter')})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Religion Section */}
        <div className="order-6 row-span-2 rounded-sm bg-gray-100 p-6 sm:col-span-12 lg:order-3 lg:col-span-3 lg:rounded-md">
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-secondary-500 p-2.5">
              <HeartHandshake className="text-white" size={20} />
            </div>
            <strong className="typo-base-bold uppercase text-gray-900">
              {t('destination.religion')}
            </strong>
          </div>
          <p className="typo-lg-regular mt-4 text-gray-900">
            {country.religion}
          </p>
        </div>

        {/* Currency Section */}
        <div className="order-2 row-span-3 rounded-sm bg-secondary-500 p-3 sm:col-span-12 lg:order-4 lg:col-span-3 lg:rounded-md lg:p-6">
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-[#197C81] p-2.5">
              <Euro className="text-white" size={20} />
            </div>
            <div>
              <strong className="typo-base-bold uppercase text-white">
                {t('global_settings.label_currency')}:{' '}
              </strong>
              <span className="type-base-regular uppercase text-white">
                {country.currency}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-row items-center justify-center gap-2 text-center text-white lg:mt-8 lg:flex-col lg:gap-4">
            <p className="typo-3xl-bold uppercase lg:typo-4xl-bold">1 EURO</p>
            <p className="typo-3xl-bold uppercase lg:typo-4xl-bold">≈</p>
            <p className="typo-3xl-bold uppercase lg:typo-4xl-bold">
              {country.exchangeRate} {country.currency}
            </p>
          </div>
        </div>

        {/* Prices Section */}
        <div className="order-4 row-span-2 flex flex-col gap-4 sm:col-span-12 lg:order-5 lg:col-span-3 lg:gap-8">
          <div className="rounded-sm bg-gray-100 p-6 lg:rounded-md">
            <div className="flex items-center gap-6">
              <div className="rounded-full bg-secondary-500 p-2.5">
                <PlaneLanding className="text-white" size={20} />
              </div>
              <div>
                <p className="typo-base-bold uppercase text-gray-900">
                  {t('destination.average_flight_price')}
                </p>
                <p className="typo-base-regular text-gray-900">
                  {country.averageFlightPrice} €
                </p>
              </div>
            </div>
          </div>
          <div className="order-5 rounded-sm bg-gray-100 p-6 lg:order-6 lg:rounded-md">
            <div className="flex items-center gap-6">
              <div className="rounded-full bg-secondary-500 p-2.5">
                <Utensils className="text-white" size={20} />
              </div>
              <div>
                <p className="typo-base-bold uppercase text-gray-900">
                  {t('destination.average_meal_price')}
                </p>
                <p className="typo-base-regular text-gray-900">
                  {country.averageMealPrice} €
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Section */}
        <div className="order-7 row-span-2 rounded-sm bg-primary-500 p-6 sm:col-span-12 lg:col-span-6 lg:rounded-md">
          <div className="mb-2 flex items-center gap-6">
            <div className="rounded-full bg-secondary-500 p-2.5">
              <Languages className="text-white" size={20} />
            </div>
            <strong className="typo-base-bold uppercase text-gray-900">
              {t('global_settings.label_language')}
            </strong>
          </div>
          <p className="typo-lg-regular mt-4 text-gray-900">
            {country.language}
          </p>
          <div className="mt-4 flex justify-between gap-4">
            <p className="typo-lg-regular">
              <span className="font-bold">{t('destination.hello_saying')}</span>
              : {country.helloSaying}
            </p>
            <p className="typo-lg-regular">
              <span className="font-bold">
                {t('destination.thank_you_saying')}
              </span>
              : {country.thankYouSaying}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DestinationInfo;
