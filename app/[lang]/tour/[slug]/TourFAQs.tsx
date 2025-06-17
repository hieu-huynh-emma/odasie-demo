import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DOMPurifyServer } from '@/lib/dompurify';
import { TFunction } from 'i18next';
import { Tour } from '@/types';

type TourFAQsProps = {
  tour: Tour;
  t: TFunction<string[], string>;
};

function TourFAQs({ tour, t }: TourFAQsProps) {
  if (tour.faqs.length === 0) {
    return (
      <h2 className="typo-lg-regular pb-6 text-gray-900">
        {t('common.no_faq')}
      </h2>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full px-24">
      {tour.faqs.map(item => (
        <AccordionItem key={item.id} value={item.id.toString()}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <div className="my-4 h-px w-full bg-black/10" />
          <AccordionContent>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurifyServer.sanitize(item.answer),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default TourFAQs;
