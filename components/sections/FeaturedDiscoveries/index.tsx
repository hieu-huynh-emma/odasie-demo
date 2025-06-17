import Link from 'next/link';

import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { Button } from '@/components/ui/button';
import { QueryMapper } from '@/lib/query-mapper';
import ArticleCard from '@/components/cards/ArticleCard';
import { ExperienceConfig, FestivalConfig } from '@/configs';
import { getExperiences, getFestivals } from '@/services';
import { DiscoverySection, DiscoveryType, Festival } from '@/types';
import { TFunction } from 'i18next';

type FeaturedDiscoveriesProps = {
  lang: string;
  section: DiscoverySection;
  t: TFunction<string[], string>;
};

async function fetchDataForSection(type: DiscoveryType, lang: string) {
  const config = type === 'experience' ? ExperienceConfig : FestivalConfig;
  const service = type === 'experience' ? getExperiences : getFestivals;

  const queryMapper = new QueryMapper(config);
  const criteria = queryMapper.fromUrl(new URLSearchParams(`?pageSize=2`));
  return service({ locale: lang, ...criteria });
}

async function FeaturedDiscoveries({
  lang,
  section,
  t,
}: FeaturedDiscoveriesProps) {
  const res = await fetchDataForSection(section.type, lang);

  if (!res || !res.data) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        segments={section.heading?.segments}
        description={section.description}
        position={section.heading?.position}
        textVariant={section.heading?.textVariant}
        useContainer
      />
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {res.data.map(item => (
            <ArticleCard
              key={item.id}
              variant="vertical"
              title={item.name}
              subtitle={
                section.type === 'experience'
                  ? undefined
                  : (item as Festival).occurrence
              }
              excerpt={item.excerpt}
              url={
                section.type === 'experience'
                  ? `/discovery/experience/${item.slug}`
                  : `/discovery/festival/${item.slug}`
              }
              image={item.image.url}
              t={t}
            />
          ))}
        </div>
      </Container>
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

export default FeaturedDiscoveries;
