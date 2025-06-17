import { DOMPurifyServer } from '@/lib/dompurify';
import { cn } from '@/lib/utils';
import { Guarantee } from '@/types';
import { Star } from 'lucide-react';

type GuaranteeCardProps = {
  guarantee: Guarantee;
};

function GuaranteeCard({ guarantee }: GuaranteeCardProps) {
  return (
    <div
      key={guarantee.id}
      className={cn(
        'col-span-full rounded-sm border border-gray-300 p-6 lg:rounded-md',
        guarantee.highlighted ? 'bg-primary-500' : 'bg-white',
        guarantee.featured ? 'lg:col-span-9' : 'lg:col-span-6',
      )}>
      <div className="flex flex-col gap-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500">
          <Star className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="typo-xl-regular text-gray-900"
            dangerouslySetInnerHTML={{
              __html: DOMPurifyServer.sanitize(guarantee.text),
            }}
          />
          {guarantee.highlightedText && (
            <p className="typo-4xl-semibold text-secondary-500">
              {guarantee.highlightedText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuaranteeCard;
