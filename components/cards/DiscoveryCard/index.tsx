'use client';

import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import BackgroundImageWithFallback from '@/components/ui/BackgroundImageWithFallback';
import { useTranslation } from 'react-i18next';
import useResponsiveImage from '@/hooks/useResponsiveImage';
import { Image } from '@/types';
import DOMPurify from 'dompurify';

type DiscoveryCardProps = {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image: Image | null;
  bgImage: Image | null;
  url: string;
  reversed?: boolean;
};

function DiscoveryCard({
  title,
  subtitle,
  excerpt,
  image,
  bgImage,
  url,
  reversed,
}: DiscoveryCardProps) {
  const { t } = useTranslation(['common']);
  const imageUrl = useResponsiveImage(image, {
    defaultBreakpoint: 'md',
  });
  const bgImageUrl = useResponsiveImage(bgImage, {
    defaultBreakpoint: 'lg',
  });

  return (
    <div className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] max-w-[100vw] overflow-hidden py-10 lg:py-20">
      <BackgroundImageWithFallback
        className="absolute inset-0 bg-cover bg-center"
        url={bgImageUrl}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      <Container className="relative z-2 max-w-1200">
        <div
          className={`flex h-full flex-col items-center lg:flex-row ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          <div className="h-full w-full lg:w-1/2">
            <div className="relative mx-auto h-60 w-60 overflow-hidden rounded-full lg:h-70 lg:w-70">
              <ImageWithFallback
                src={imageUrl}
                alt={title}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div className="w-full py-2 text-center text-white lg:w-1/2 lg:py-8 lg:text-left">
            {subtitle && <p className="typo-lg-semibold">{subtitle}</p>}
            <h2 className="typo-5xl-bold mt-3">{title}</h2>
            {excerpt && (
              <p
                className="typo-lg-regular mt-8"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(excerpt),
                }}
              />
            )}
            <div className="mt-8">
              <Button variant="primary" size="xl">
                <Link href={url} title={title}>
                  {t('common.see_more')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DiscoveryCard;
