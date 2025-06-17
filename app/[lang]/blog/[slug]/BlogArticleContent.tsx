import { format } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { DOMPurifyServer } from '@/lib/dompurify';
import { BlogArticle } from '@/types';
import { TFunction } from 'i18next';

type BlogArticleContentProps = {
  t: TFunction<string[], string>;
  article: BlogArticle;
};

function BlogArticleContent({ article, t }: BlogArticleContentProps) {
  return (
    <article className="pt-10">
      <div className="typo-base-semibold mb-3 text-center uppercase text-secondary-500">
        <span className="mr-1">{t('blog.published')}</span>
        {format(new Date(article.publishedAt ?? Date.now()), 'LLLL dd, yyyy')}
      </div>

      <h1 className="typo-5xl-bold mb-6 text-center uppercase text-gray-900">
        {article.title}
      </h1>

      <div className="mb-16 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle size={24} className="text-gray-600" />
          <span className="typo-base-regular text-gray-600">
            {t(
              `blog.comments${(article.comments || [])?.length > 1 ? '_plural' : ''}`,
              {
                count: article?.comments?.length ?? 0,
              },
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 overflow-hidden rounded-full">
            {article.author?.avatar && (
              <ImageWithFallback
                src={article.author.avatar.url}
                alt={`${article.author.name}'s profile`}
                className="h-full w-full rounded-full border border-gray-900/20 object-cover"
                width={24}
                height={24}
              />
            )}
          </div>
          {article.author?.name && (
            <span className="typo-base-regular text-gray-600">
              {t('blog.by', { name: article.author.name })}
            </span>
          )}
        </div>
      </div>

      <div className="mb-20 overflow-hidden rounded-lg">
        {article?.image?.url && (
          <ImageWithFallback
            src={article.image.url}
            alt={article.title}
            className="object-cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '640px' }}
          />
        )}
      </div>

      <div
        className="prose mx-auto max-w-1200"
        dangerouslySetInnerHTML={{
          __html: DOMPurifyServer.sanitize(article.content),
        }}
      />
    </article>
  );
}

export default BlogArticleContent;
