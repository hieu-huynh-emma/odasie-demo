'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import { BlogArticle } from '@/types';
import useResponsiveImage from '@/hooks/useResponsiveImage';

type BlogArticleCardProps = {
  article: BlogArticle;
  priority?: boolean;
  index?: number;
};

const BlogArticleCard = memo(
  ({ article, priority = false, index = 0 }: BlogArticleCardProps) => {
    const imageUrl = useResponsiveImage(article.image, {
      defaultBreakpoint: 'sm',
    });

    const memoizedValues = useMemo(() => {
      const shouldPrioritize = priority || index < 2;
      const imageSizes =
        '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
      const formattedDate = format(
        new Date(article.publishedAt ?? Date.now()),
        'LLLL dd, yyyy',
      );

      return { shouldPrioritize, imageSizes, formattedDate };
    }, [priority, index, article.publishedAt]);

    return (
      <article
        className="group relative"
        style={{
          contain: 'layout style paint',
        }}>
        <Link
          href={`/blog/${article.slug}`}
          className="absolute right-0 top-0 z-[3] h-full w-full"
          aria-label={`Read article: ${article.title}`}
        />

        <div className="absolute bottom-0 z-[1] h-[calc(100%-70px)] w-full bg-gradient-to-t from-black to-transparent" />

        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={article.title}
            fill
            sizes={memoizedValues.imageSizes}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={memoizedValues.shouldPrioritize}
            loading={memoizedValues.shouldPrioritize ? 'eager' : 'lazy'}
            quality={memoizedValues.shouldPrioritize ? 85 : 75}
          />
        </div>

        <div className="absolute bottom-0 left-0 z-[2] w-full p-8">
          <div className="flex flex-col gap-3">
            <time
              dateTime={article.publishedAt}
              className="typo-xs-medium block max-w-fit rounded-sm bg-white px-3 py-[3px] text-gray-900 lg:rounded-md">
              {memoizedValues.formattedDate}
            </time>

            <h3 className="typo-xl-bold line-clamp-2 text-white">
              {article.title}
            </h3>

            <p className="typo-base-regular line-clamp-2 text-white">
              {article.excerpt}
            </p>
          </div>
        </div>
      </article>
    );
  },
);

BlogArticleCard.displayName = 'BlogArticleCard';

export default BlogArticleCard;
