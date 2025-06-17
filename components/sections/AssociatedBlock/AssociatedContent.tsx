'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { AssociatedBlockDetail as AssociatedBlockDetailType } from '@/types';

type AssociatedContentProps = {
  block: AssociatedBlockDetailType;
};

const AssociatedContent = ({
  block: { title, description, callToAction },
}: AssociatedContentProps) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sanitized = DOMPurify.sanitize(description);
      setContent(sanitized);
    }
  }, [description]);

  return (
    <div className="flex w-full flex-col items-start gap-4 text-left">
      <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
        {title}
      </h2>
      <div
        className="prose space-y-2 text-sm leading-relaxed text-gray-800 sm:text-base"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {callToAction.url && (
        <a
          href={callToAction.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-sm bg-yellow-400 px-6 py-2 font-semibold text-black shadow-md transition-colors duration-200 hover:bg-yellow-500 lg:rounded-md">
          {callToAction.label}
        </a>
      )}
    </div>
  );
};

export default AssociatedContent;
