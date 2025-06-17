import { getRatingStats } from '@/services';
import QueryString from 'qs';
import SectionHeading from './SectionHeading';
import { Segment } from '@/types';

type ServerSectionHeadingProps = {
  segments?: Segment[];
  description?: string;
  position?: 'left' | 'center' | 'right';
  as?: 'h1' | 'h2';
  textVariant?: 'primary' | 'secondary';
  useContainer?: boolean;
  ratingCountryId?: number;
  scrollElement?: {
    targetSelector?: string;
    label: string;
    href?: string;
  };
  shouldHideSegmentSpacing?: boolean;
  lang?: string;
  isMobile?: boolean;
};

export default async function ServerSectionHeading(
  props: ServerSectionHeadingProps,
) {
  const rating =
    props.ratingCountryId && props.lang
      ? await getRatingStats(
          QueryString.stringify({
            filters: {
              country: {
                id: props.ratingCountryId,
              },
            },
            locale: props.lang,
          }),
        )
      : null;

  return <SectionHeading {...props} rating={rating} />;
}
