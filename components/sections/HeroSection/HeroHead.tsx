import Head from 'next/head';

type HeroHeadProps = {
  imageUrl: string;
};

export default function HeroHead({ imageUrl }: HeroHeadProps) {
  const getImageDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.origin;
    } catch {
      return null;
    }
  };

  const imageDomain = getImageDomain(imageUrl);

  return (
    <Head>
      <link rel="preload" as="image" href={imageUrl} />
      {imageDomain && (
        <>
          <link rel="dns-prefetch" href={imageDomain} />
          <link rel="preconnect" href={imageDomain} crossOrigin="anonymous" />
        </>
      )}
      {/* Also preconnect to CDN if using environment patterns */}
      {process.env.REMOTE_IMAGE_PATTERNS && (
        <>
          {process.env.REMOTE_IMAGE_PATTERNS.split(',').map(pattern => {
            const domain = pattern.replace(/^https?:\/\//, '').split('/')[0];
            return (
              <link
                key={domain}
                rel="preconnect"
                href={`https://${domain}`}
                crossOrigin="anonymous"
              />
            );
          })}
        </>
      )}
    </Head>
  );
}
