'use client';

import DOMPurify from 'dompurify';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ExpandableItem } from '@/types';

type ExpandableItemsProps = {
  items: ExpandableItem[];
};

function ExpandableItems({ items }: ExpandableItemsProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {items.map(item => (
        <AccordionItem
          key={item.id}
          value={item.id.toString()}
          className="small-text-mobile border-b border-gray-300">
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <div
              className="small-text-mobile prose max-w-full"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description),
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default ExpandableItems;
