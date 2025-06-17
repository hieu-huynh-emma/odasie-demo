import Link from 'next/link';

import { BlogArticleConfig } from '@/configs';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { Button } from '@/components/ui/button';
import { QueryMapper } from '@/lib/query-mapper';
import { getBlogArticles } from '@/services/blog-article';
import { BlogSection } from '@/types';

import CarouselBlogArticle from './CarouselBlogArticle';

type LatestBlogPostsProps = {
  lang: string;
  section: BlogSection;
};

async function LatestBlogPosts({ lang, section }: LatestBlogPostsProps) {
  const queryMapper = new QueryMapper(BlogArticleConfig);
  const criteria = queryMapper.fromUrl(
    new URLSearchParams(
      `?${section.country?.slug ? `countries.slug=${section.country.slug}` : ''}`,
    ),
  );
  const res = await getBlogArticles({ locale: lang, ...criteria });

  if (!res.data || !res.data.length) {
    return null;
  }

  return (
    <Section className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw]">
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        useContainer
      />
      <div className="slider-full overflow-hidden">
        <CarouselBlogArticle articles={res.data} />
      </div>
      {section.callToAction && (
        <div className="mt-12 flex justify-center">
          <Link
            href={section.callToAction.url}
            title={section.callToAction.label}>
            <Button variant="secondary" size="lg">
              {section.callToAction.label}
            </Button>
          </Link>
        </div>
      )}
    </Section>
  );
}

export default LatestBlogPosts;
