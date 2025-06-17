'use client';
import Container from '@/components/Container';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import Ckeditor from '../Ckeditor';

export default function Article({ content }: { content: string }) {
  const { t } = useTranslation(['common']);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container className="mt-5 pb-8 lg:mt-10 lg:pb-16">
      <div
        className={`prose max-w-full transition-all duration-300 ${
          isExpanded ? 'max-h-none' : 'max-h-[1200px] overflow-hidden'
        } relative`}>
        <Ckeditor content={content} />
        {!isExpanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="border bg-white">
          {t(!isExpanded ? 'common.show_all' : 'common.show_less')}
        </Button>
      </div>
    </Container>
  );
}
