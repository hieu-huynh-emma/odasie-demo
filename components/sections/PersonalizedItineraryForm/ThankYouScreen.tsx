import { CheckCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ThankYouScreen() {
  const { t } = useTranslation('common');

  return (
    <div className="relative flex w-full translate-y-1/2 justify-center">
      <div className="mx-auto flex max-w-[1170px] flex-col items-center justify-center gap-6 p-4">
        <CheckCheck className="text-primary-500" width={96} height={96} />
        <h1 className="typo-6xl-regular text-center text-white">
          {t('create_your_itinerary.thank_you.title').toUpperCase()}
        </h1>
        <p className="typo-xl-regular text-center text-white">
          {t('create_your_itinerary.thank_you.instruction')}
          <span className="ml-1 text-primary-500">
            <a href="/about">{t('common.about_us')}</a>
          </span>
          .
        </p>
      </div>
    </div>
  );
}
