import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TFunction } from 'i18next';

type ArticleCardProps = {
  title: string;
  subtitle?: null | string;
  excerpt?: null | string;
  url: string;
  image: string;
  metadata?: {
    publishedAt: string;
    numberOfComments: number;
    author: {
      name: string;
      avatar: string;
    };
  };
  variant?: 'horizontal' | 'vertical';
  t: TFunction<string[], string>;
};

function ArticleCard({
  title,
  subtitle,
  excerpt,
  url,
  image,
  metadata,
  variant = 'horizontal',
  t,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col gap-8 overflow-hidden bg-white duration-300',
        variant === 'horizontal' && 'border-b pb-8 lg:flex-row',
      )}>
      <div
        className={cn(
          'relative aspect-[16/9] overflow-hidden rounded-[12px]',
          variant === 'horizontal' && 'lg:w-2/5',
        )}>
        <Link href={url} title={title} className="absolute inset-0 z-1" />
        {image && (
          <ImageWithFallback
            className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            src={image}
            alt={title}
            width={0}
            height={0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={true}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
      <div className={cn(variant === 'horizontal' && 'lg:w-3/5')}>
        {metadata && (
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays size={16} />
            <span className="typo-base-regular uppercase text-gray-900">
              {format(new Date(), 'LLLL dd, yyyy')}
            </span>
          </div>
        )}
        {subtitle && (
          <p className="typo-base-regular mb-2 text-gray-900">{subtitle}</p>
        )}
        <h2
          className={cn(
            'typo-3xl-bold line-clamp-2 text-gray-900',
            variant === 'vertical' && 'mb-4',
            variant === 'horizontal' && 'mb-6',
          )}>
          <Link href={url} title={title}>
            {title}
          </Link>
        </h2>
        <p
          className={cn(
            'typo-lg-regular line-clamp-3 text-gray-900 last:mb-0',
            variant === 'vertical' && 'mb-4',
            variant === 'horizontal' && 'mb-6',
          )}>
          {excerpt}
        </p>
        {metadata && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} className="text-secondary-500" />
              <span className="typo-base-regular text-gray-600">
                {t(
                  `common.comments${metadata.numberOfComments > 1 ? '_plural' : ''}`,
                  {
                    count: metadata.numberOfComments ?? 0,
                  },
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-full">
                {metadata.author.avatar && (
                  <ImageWithFallback
                    src={metadata.author.avatar}
                    alt={`${metadata.author}'s profile`}
                    className="h-full w-full rounded-full border border-gray-900/20 object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 30vw, 20vw"
                    width={24}
                    height={24}
                  />
                )}
              </div>
              {metadata.author.name && (
                <span className="typo-base-regular text-gray-600">
                  {t('common.by', { name: metadata.author.name })}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default ArticleCard;
