import { getGlobalSettings } from '@/services';
import { TFunction } from 'i18next';
import { ContactUsSection } from '@/types';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import ContactLink from '@/components/Footer/ContactLink';

export default async function InformationSection({
  section,
  lang,
  t,
}: {
  section: ContactUsSection;
  lang: string;
  t: TFunction<string[], string>;
}) {
  const globalSettings = await getGlobalSettings(lang);
  const { data } = globalSettings;
  return (
    <>
      <div className="me-5 flex flex-col gap-y-6">
        {section.title && (
          <h1 className="typo-4xl-bold text-primary-500 sm:typo-6xl-bold">
            {section.title}
          </h1>
        )}
        {section.subTitle && (
          <h3 className="typo-xl-regular text-white sm:typo-3xl-regular">
            {section.subTitle}
          </h3>
        )}
        {data?.contactInfo.address && (
          <div className="flex gap-x-3">
            <MapPin className="text-primary-500" />
            <Link
              target="_blank"
              href={data.contactInfo.googleMapLink}
              className="typo-lg-regular text-white">
              {t('common.address', { address: data?.contactInfo.address })}
            </Link>
          </div>
        )}
        {data?.contactInfo.email && (
          <div className="flex gap-x-3">
            <Mail className="text-primary-500" />
            <Link
              href={`mailto:${data?.contactInfo.email}`}
              title={data?.contactInfo.email}>
              <span className="typo-lg-regular text-white">
                {data?.contactInfo.email}
              </span>
            </Link>
          </div>
        )}
        {data?.contactInfo.phone && (
          <div className="flex w-fit items-center gap-x-2 rounded-[40px] bg-white px-5 py-3 hover:bg-gray-100">
            <Phone width={15} height={15} size={15} fontWeight={500} />
            <ContactLink
              type="phone"
              href={`tel:${data.contactInfo.phone}`}
              label={data.contactInfo.phone}
            />
          </div>
        )}
      </div>
    </>
  );
}
