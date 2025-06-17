import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Section from '@/components/sections/Section';
import { ExperienceConfig } from '@/configs';
import { QueryMapper } from '@/lib/query-mapper';
import { getExperiences } from '@/services';
import { ExperienceSection } from '@/types';

import CarouselFeaturedExperience from './CarouselFeaturedExperience';

type FeaturedExperiencesProps = {
  lang: string;
  section: ExperienceSection;
  params?: { [key: string]: string };
};
async function FeaturedExperiences({
  lang,
  section,
  params,
}: FeaturedExperiencesProps) {
  const queryMapper = new QueryMapper(ExperienceConfig);
  const queryParams = { ...params, pageSize: `${section.numberOfItems}` };
  const criteria = queryMapper.fromUrl(new URLSearchParams(queryParams));
  const res = await getExperiences({ locale: lang, ...criteria });

  if (!res.data || !res.data.length) {
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
        <CarouselFeaturedExperience experiences={res.data} />
      </Container>
    </Section>
  );
}

export default FeaturedExperiences;
