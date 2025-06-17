import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DOMPurifyServer } from '@/lib/dompurify';
import { TFunction } from 'i18next';
import { FAQ } from '@/types';

type FAQsProps = {
  faqs: FAQ[];
  t: TFunction<string[], string>;
};

function FAQs({ faqs, t }: FAQsProps) {
  if (faqs.length === 0) {
    return (
      <h2 className="typo-lg-regular text-gray-900">{t('common.no_faq')}</h2>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full sm:px-0 md:px-24">
      {faqs.map(item => (
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

export default FAQs;
