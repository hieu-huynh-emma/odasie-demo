import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getExperience } from '@/services';
import { initializeI18n } from '@/lib/i18n';
import Link from 'next/link';
import { headers } from 'next/headers';
import FeaturedExperiences from '@/components/sections/FeaturedExperiences';
import { ExperienceSection } from '@/types';
import HeroSection from '@/components/sections/HeroSection';
import { notFound } from 'next/navigation';

type LayoutProps = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
  children: React.ReactNode;
}>;

export default async function Layout(props: LayoutProps) {
  const { lang, slug } = await props.params;
  const { t } = await initializeI18n(lang, ['common']);
  const [headersList, resExp] = await Promise.all([
    headers(),
    getExperience(slug, lang),
  ]);

  if (!resExp || !resExp.data) {
    notFound();
  }

  return (
    <main className="mx-auto mb-8 flex max-w-1200 flex-col lg:mb-16">
      <HeroSection
        lang={lang}
        section={{
          image: resExp.data.image,
          heading: {
            segments: [
              {
                id: 1,
                text: resExp.data.name,
                highlight: 'primary',
                newline: false,
              },
            ],
            textVariant: 'secondary',
            position: 'center',
          },
          description: resExp.data.excerpt,
        }}
      />
      <Tabs
        defaultValue={
          headersList.get('x-url-pathname') || `/experience/${slug}`
        }>
        <TabsList className="flex flex-row justify-center gap-2 pt-3">
          <TabsTrigger value={`/experience/${slug}`}>
            <Link href={`/experience/${slug}`}>{t('common.overview')}</Link>
          </TabsTrigger>
          <TabsTrigger value={`/experience/${slug}/tours`}>
            <Link href={`/experience/${slug}/tours`}>{t('common.tours')}</Link>
          </TabsTrigger>
          <TabsTrigger value={`/experience/${slug}/reviews`}>
            <Link href={`/experience/${slug}/reviews`}>
              {t('common.reviews')}
            </Link>
          </TabsTrigger>
        </TabsList>
        {props.children}
      </Tabs>
      <FeaturedExperiences
        lang={lang}
        section={
          {
            heading: {
              segments: [
                {
                  id: 1,
                  text: t('common.you_may_also'),
                  highlight: null,
                  newline: false,
                },
                {
                  id: 2,
                  text: t('common.like'),
                  highlight: 'secondary',
                  newline: false,
                },
              ],
            },
          } as ExperienceSection
        }
        params={{
          'experiences.slug': slug,
        }}
      />
    </main>
  );
}
