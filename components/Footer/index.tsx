import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import Container from '@/components/Container';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { initializeI18n } from '@/lib/i18n';
import { GlobalSettings, Navigation } from '@/types';

import NavigationColumn from './NavigationColumn';
import SocialPlatform from './SocialPlatform';
// import CurrencySwitcher from '../CurrencySwitcher';
import { sortByOrder } from '@/utils';
import ContactLink from './ContactLink';
import Newsletter from '../Newsletter';

type FooterProps = {
  lang: string;
  settings: GlobalSettings;
  navigation: Navigation;
};

async function Footer({ lang, settings, navigation }: FooterProps) {
  const { t } = await initializeI18n(lang, ['common']);
  return (
    <footer id="footer" className="relative pb-16 pt-10">
      {settings.footer.bgImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${encodeURI(settings.footer.bgImage.url)})`,
          }}></div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(315deg, rgba(189, 255, 244, 0.00) 10.27%, rgba(180, 253, 248, 0.35) 25.71%, #A4FAFF 83.79%)',
          opacity: 0.85,
        }}></div>

      <Container className="relative z-10 mx-auto max-w-1200">
        <div
          className="grid grid-cols-12 gap-8 lg:gap-12"
          key="footer-navigation">
          <div
            className="col-span-12 flex flex-col gap-6 lg:col-span-3"
            key="settings">
            {/* Newsletter */}
            <div className="flex flex-col gap-2">
              <h2 className="typo-base-bold text-gray-900">
                {t('newsletter.title', 'Newsletter')}
              </h2>
              <Newsletter
                emailTemplateId={settings.newsletterEmailTemplate?.documentId}
              />
            </div>

            {/* Language & Currency in grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Language */}
              <div className="flex flex-col gap-2">
                <h4 className="typo-base-bold text-gray-900">
                  {t('global_settings.label_language')}
                </h4>
                <LanguageSwitcher
                  defaultLanguage={settings.defaultLanguage}
                  languages={settings.languages}
                />
              </div>

              {/* Currency */}
              {/* <div className="flex flex-col gap-2">
                <h4 className="typo-base-bold text-gray-900">
                  {t('global_settings.label_currency')}
                </h4>
                <CurrencySwitcher lang={lang} settings={settings} />
              </div> */}
            </div>
          </div>

          {sortByOrder(navigation.items).map((navItem, index) => (
            <NavigationColumn key={index} navItem={navItem} lang={lang} />
          ))}

          <div
            className="col-span-12 flex flex-col gap-3 lg:col-span-3"
            key="contact-info">
            <h4 className="typo-base-bold text-gray-900">
              {t('common.contact_us')}
            </h4>
            <ul className="flex flex-col gap-2">
              <li
                className="typo-sm-regular flex items-center gap-2 text-gray-900 hover:underline"
                key="contact-info-address">
                <MapPin size={24} className="h-5 w-5 lg:h-8 lg:w-8" />
                <Link
                  target="blank"
                  href={settings.contactInfo.googleMapLink}
                  title={settings.contactInfo.address}>
                  <span>{settings.contactInfo.address}</span>
                </Link>
              </li>
              <li
                className="typo-sm-regular flex items-center gap-2 text-gray-900 hover:underline"
                key="contact-info-phone">
                <Phone size={16} />
                <ContactLink
                  type="phone"
                  href={`tel:${settings.contactInfo.phone}`}
                  label={settings.contactInfo.phone}
                />
              </li>
              <li
                className="typo-sm-regular flex items-center gap-2 text-gray-900 hover:underline"
                key="contact-info-email">
                <Mail size={16} />
                <ContactLink
                  type="email"
                  href={`mailto:${settings.contactInfo.email}`}
                  label={settings.contactInfo.email}
                />
              </li>
            </ul>
            {settings.socialLinks.length ? (
              <ul className="mt-3 flex gap-4">
                {settings.socialLinks.map(item => (
                  <SocialPlatform
                    key={item.platform}
                    url={item.url}
                    platform={item.platform}
                    icon={item.icon}
                  />
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div
          className="mt-18 flex flex-col items-center gap-3"
          key="footer-copyright">
          <Link href={`/${lang}`}>
            <ImageWithFallback
              src={'/images/odasie-logo-black.svg'}
              alt={settings.siteTitle}
              width={0}
              height={0}
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          <p className="typo-sm-regular text-gray-600">{settings.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
