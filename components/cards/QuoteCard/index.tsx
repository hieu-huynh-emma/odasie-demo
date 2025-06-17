import ImageWithFallback from '@/components/ui/ImageWithFallback';
import React from 'react';
import { DOMPurifyServer } from '@/lib/dompurify';

type QuoteCardProps = {
  quote: string;
  author: null | {
    name: string;
    image: string;
    position: string;
  };
};

function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div className="flex flex-col gap-6 border-l-4 border-primary-500 bg-white px-5 py-4 shadow-lg lg:flex-row">
      <div className="flex min-w-[24px] items-start space-x-4 sm:min-w-[48px] md:min-w-[48px]">
        <ImageWithFallback
          src={'/images/quotes.svg'}
          alt="Quote"
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: DOMPurifyServer.sanitize(quote) }}
        />
        {author && (
          <div className="flex flex-row gap-3">
            <ImageWithFallback
              className="h-12 w-12 rounded-full"
              src={author.image}
              alt={author.name}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="flex flex-col">
              <h3 className="typo-lg-semibold text-gray-900">{author.name}</h3>
              <p className="typo-base-regular text-gray-600">
                {author.position}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteCard;
