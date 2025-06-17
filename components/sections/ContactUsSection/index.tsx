import Container from '@/components/Container';
import { TFunction } from 'i18next';
import InformationSection from './InformationSection';
import { ContactUsSection as ContactUsSectionType } from '@/types';
import ContactForm from './ContactForm';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';

export default function ContactUsSection({
  section,
  lang,
  t,
}: {
  section: ContactUsSectionType;
  lang: string;
  backgroundColor?: string | null;
  t: TFunction<string[], string>;
}) {
  return (
    <BackgroundImageWithFallback
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] h-[810px] min-h-fit max-w-[100vw] bg-cover bg-bottom pt-16"
      url={section.bgImage.url}>
      <Container className="mx-auto mt-10 grid h-full max-w-[1200px] grid-cols-12 items-center justify-between gap-5 p-5 pb-10">
        <div className="col-span-12 md:col-span-6 xl:col-span-7">
          <InformationSection lang={lang} section={section} t={t} />
        </div>
        <div className="col-span-12 md:col-span-6 xl:col-span-5">
          <ContactForm section={section} lang={lang} />
        </div>
      </Container>
    </BackgroundImageWithFallback>
  );
}
