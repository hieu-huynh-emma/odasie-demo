import { Icon, Image } from './shared';

export type NavigationItem = {
  id: string;
  label: string;
  icon?: Icon;
  url: string;
  order: number;
  image: Image;
  navigationCard?: NavigationCard | null;
  children: NavigationItem[];
  showOnDesktop: boolean;
  showOnMobile: boolean;
};

export type NavigationCard = {
  id: number;
  title: string;
  description: string;
  url: string;
  buttonLabel: string;
  image: Image;
  extraIcon?: Icon | null;
  extraInfo?: string | null;
};

export type Navigation = {
  name: string;
  slug: string;
  description: string;
  active: boolean;
  items: NavigationItem[];
};
