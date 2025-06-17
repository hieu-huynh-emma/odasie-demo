import { notFound } from 'next/navigation';
import { BlogArticleConfig } from '@/configs';
import ArticleCard from '@/components/cards/ArticleCard';
import Container from '@/components/Container';
import Paginator from '@/components/Paginator';
import HeroSection from '@/components/sections/HeroSection';
import { QueryMapper } from '@/lib/query-mapper';
import { getBlogArticles, getCmsPage } from '@/services';
import BlogArticleFilters from './BlogArticleFilters';
import { HeroSection as HeroSectionType } from '@/types';
import Section from '@/components/sections/Section';
import { initializeI18n } from '@/lib/i18n';
import { LocalizedSetter } from '@/components/LocalizedSetter';
import { ResolvingMetadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { Metadata } from 'next';
import { getCMSPageMetadata } from '@/hooks/useSEO';

type BlogListPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ lang: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { lang } = await params;
  const cmsPageResponse = await getCmsPage('/blog', lang);
  if (!cmsPageResponse || !cmsPageResponse.data) {
    return parent as Metadata;
  }
  return getCMSPageMetadata(cmsPageResponse.data.seo, 'Blog', lang);
}

export default async function BlogListPage({
  params,
  searchParams,
}: BlogListPageProps) {
  const [{ lang }, urlSearchParams] = await Promise.all([params, searchParams]);
  const { t } = await initializeI18n(lang, ['common']);
  const queryMapper = new QueryMapper(BlogArticleConfig);
  const criteria = queryMapper.fromUrl(new URLSearchParams(urlSearchParams));
  const [articlesResult, pageResult] = await Promise.allSettled([
    getBlogArticles({ locale: lang, ...criteria }),
    getCmsPage('/blog', lang),
  ]);
  const articles =
    articlesResult.status === 'fulfilled' ? articlesResult.value : null;
  const page = pageResult.status === 'fulfilled' ? pageResult.value : null;
  const heroSection = page?.data?.blocks.find(
    block => block.__component === 'section.hero-section',
  );

  if (!articles) {
    notFound();
  }

  return (
    <>
      {heroSection && (
        <HeroSection lang={lang} section={heroSection as HeroSectionType} />
      )}
      <main className="mx-auto flex max-w-1200 flex-col">
        <Section className="pb-8 lg:pb-16">
          <Container>
            <div className="mb-12">
              <BlogArticleFilters t={t} />
            </div>
            <div className="space-y-8">
              {articles.data?.length !== 0 ? (
                <>
                  {articles.data?.map(item => (
                    <ArticleCard
                      key={item.id}
                      variant="horizontal"
                      title={item.title}
                      excerpt={item.excerpt}
                      url={`/${lang}/blog/${item.slug}`}
                      image={
                        item.image?.formats?.medium?.url || item.image?.url
                      }
                      metadata={{
                        publishedAt: item.publishedAt,
                        numberOfComments: 0,
                        author: {
                          name: item?.author?.name,
                          avatar: item?.author?.avatar?.url,
                        },
                      }}
                      t={t}
                    />
                  ))}
                  <Paginator
                    currentPage={articles.meta?.pagination.page || 1}
                    totalPages={articles.meta?.pagination.pageCount || 1}
                  />
                </>
              ) : (
                <p className="text-gray-900">{t('blog.empty_blog')}</p>
              )}
            </div>
          </Container>
        </Section>
        {page?.data?.localizedSlugs && (
          <LocalizedSetter localizedSlugs={page.data.localizedSlugs} />
        )}
      </main>
    </>
  );
}
