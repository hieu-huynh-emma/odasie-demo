'use client';
import DOMPurify from 'dompurify';
import Container from '@/components/Container';
import './ck-editor.css';

const Ckeditor = ({ content }: { content: string }) => {
  return (
    <Container>
      <article
        className="ck-content prose mx-auto mb-20 max-w-1200"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </Container>
  );
};

export default Ckeditor;
