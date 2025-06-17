import { CallToAction } from './section';
import { Icon, Image } from './shared';

export type UniverseDestinationCard = {
  bgImage: Image;
  icon?: Icon | null;
  title: string;
  region: {
    name: string;
    slug: string;
    image: Image | null;
    overview: string | null;
  };
  buttonLabel?: string;
  callToAction?: CallToAction;
};
