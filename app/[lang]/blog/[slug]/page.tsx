import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { initializeI18n } from '@/lib/i18n';
import Container from '@/components/Container';
import FeaturedTours from '@/components/sections/FeaturedTours';
import LatestBlogPosts from '@/components/sections/LatestBlogArticles';
import Section from '@/components/sections/Section';
import { QueryCriteria } from '@/lib/query-mapper';
import { getBlogArticle, getBlogArticles } from '@/services';
import { BlogSection } from '@/types';
import { getFilterItems } from '@/utils';

import BlogArticleContent from './BlogArticleContent';
import { LocalizedSetter } from '@/components/LocalizedSetter';

type BlogArticlePageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export const revalidate = 0; // TODO

export async function generateStaticParams() {
  const criteria: QueryCriteria = {
    pagination: {
      page: 1,
      pageSize: 20,
    },
  };
  const res = await getBlogArticles(criteria);

  if (!res.data) {
    return [];
  }

  return res.data.map(item => ({ slug: item.slug }));
}

export async function generateMetadata(
  { params }: BlogArticlePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang, slug } = await params;
  const [{ data: article }, parentMetadata] = await Promise.all([
    getBlogArticle(slug, lang),
    parent,
  ]);

  if (!article) {
    return parentMetadata as Metadata;
  }

  // Use basic metadata for blog articles
  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: 'article',
      // If image is available, include it
      ...(article.image && {
        images: [
          {
            url: article.image.url,
            alt: article.image.alt,
          },
        ],
      }),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { lang, slug } = await params;
  const { t } = await initializeI18n(lang, ['common']);
  const { data: article } = await getBlogArticle(slug, lang);

  if (!article) {
    notFound();
  }

  const featuredToursSection = {
    heading: {
      segments: [
        {
          id: 1,
          text: t('blog.related_tours'),
          highlight: null,
          newline: false,
        },
      ],
    },
    numberOfItems: 6,
    filters: {
      $or: [
        // TODO: wrong filter
        ...getFilterItems(article.countries),
        ...getFilterItems(article.regions),
        ...getFilterItems(article.experiences),
      ],
    },
  };

  const blogSection: BlogSection = {
    heading: {
      segments: [
        {
          id: 1,
          text: t('blog.you_may_also'),
          highlight: null,
          newline: false,
        },
        { id: 2, text: t('blog.like'), highlight: 'secondary', newline: false },
      ],
    },
    numberOfItems: 6,
    callToAction: {
      id: 1,
      label: t('blog.see_all'),
      url: '/blog',
      newTab: false,
      type: 'primary',
    },
    country: null,
  };

  return (
    <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
      <Section>
        <Container>
          <BlogArticleContent article={article} t={t} />
        </Container>
      </Section>
      <FeaturedTours lang={lang} section={featuredToursSection} />
      <LatestBlogPosts lang={lang} section={blogSection} />
      {article?.localizedSlugs && (
        <LocalizedSetter
          localizedSlugs={article.localizedSlugs}
          url={`/blog/__slug__`}
        />
      )}
    </main>
  );
}
