import { notFound } from 'next/navigation';

import PageRenderer from '@/components/PageRenderer';
import { getCmsPage } from '@/services';
import { initializeI18n } from '@/lib/i18n';

export default async function HomePage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;

  console.log(lang)


  const [{ t }, cmsPage] = await Promise.all([
    initializeI18n(lang, ['common']),
    Promise.resolve({
    "data": {
      "id": 929,
      "documentId": "bebn7rn3qb2b7jvwdzuglfnz",
      "url": "/",
      "title": "Homepage",
      "blocks": [
        {
          "__component": "section.hero-section",
          "id": 607,
          "description": null,
          "bgColor": null,
          "image": {
            "id": 7975,
            "documentId": "nvtykec2o48b4auzlsj9fzun",
            "url": "https://media-staging.odasie.com/homebackground_069b63aba7.webp",
            "formats": {
              "large": {
                "ext": ".webp",
                "url": "https://media-staging.odasie.com/large_homebackground_069b63aba7.webp",
                "hash": "large_homebackground_069b63aba7",
                "mime": "image/webp",
                "name": "large_HomeBackground.webp",
                "path": null,
                "size": 71.8,
                "width": 1000,
                "height": 711,
                "sizeInBytes": 71798
              },
              "small": {
                "ext": ".webp",
                "url": "https://media-staging.odasie.com/small_homebackground_069b63aba7.webp",
                "hash": "small_homebackground_069b63aba7",
                "mime": "image/webp",
                "name": "small_HomeBackground.webp",
                "path": null,
                "size": 22.62,
                "width": 500,
                "height": 356,
                "sizeInBytes": 22624
              },
              "medium": {
                "ext": ".webp",
                "url": "https://media-staging.odasie.com/medium_homebackground_069b63aba7.webp",
                "hash": "medium_homebackground_069b63aba7",
                "mime": "image/webp",
                "name": "medium_HomeBackground.webp",
                "path": null,
                "size": 44.73,
                "width": 750,
                "height": 533,
                "sizeInBytes": 44728
              },
              "thumbnail": {
                "ext": ".webp",
                "url": "https://media-staging.odasie.com/thumbnail_homebackground_069b63aba7.webp",
                "hash": "thumbnail_homebackground_069b63aba7",
                "mime": "image/webp",
                "name": "thumbnail_HomeBackground.webp",
                "path": null,
                "size": 5.62,
                "width": 219,
                "height": 156,
                "sizeInBytes": 5620
              }
            }
          },
          "video": {
            "id": 8462,
            "documentId": "a8ghta8l22ly4xss2ffpcbvt",
            "url": "https://media-staging.odasie.com/odasie-homepage-video-bbb/index.m3u8"
          },
          "heading": {
            "id": 3928,
            "position": "center",
            "textVariant": null,
            "segments": [
              {
                "id": 7538,
                "text": "DIVE ",
                "newline": false,
                "highlight": "primary",
                "isSubHeading": null,
                "noSpacing": null
              },
              {
                "id": 7539,
                "text": "INTO YOUR DREAMS ",
                "newline": false,
                "highlight": null,
                "isSubHeading": null,
                "noSpacing": null
              },
              {
                "id": 7540,
                "text": "TRAVEL TO ",
                "newline": true,
                "highlight": null,
                "isSubHeading": null,
                "noSpacing": null
              },
              {
                "id": 7541,
                "text": "THAILAND ",
                "newline": false,
                "highlight": "primary",
                "isSubHeading": null,
                "noSpacing": null
              },
              {
                "id": 7542,
                "text": "AND ",
                "newline": false,
                "highlight": null,
                "isSubHeading": null,
                "noSpacing": null
              },
              {
                "id": 7543,
                "text": "SOUTHEAST ASIA",
                "newline": true,
                "highlight": null,
                "isSubHeading": true,
                "noSpacing": null
              }
            ]
          }
        }
      ],
      "seo": {
        "id": 2894,
        "metaTitle": "Homepage | Odasie",
        "metaDescription": "Homepage: travel tips, practical info and tailor‑made inspiration from Odasie.",
        "keywords": "homepage, Asia travel, Odasie",
        "metaRobots": null,
        "metaViewport": null,
        "canonicalURL": null,
        "structuredData": null,
        "metaImage": null,
        "openGraph": null
      },
      "localizedSlugs": {
        "en": "/",
        "fr": "/"
      }
    },
    "meta": {}
  })
    // getCmsPage('/', lang),
  ]);

  console.log("cmsPage", cmsPage, t)

  if (!cmsPage || !cmsPage.data) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-1200 flex-col pb-8 lg:pb-16">
      <PageRenderer url="/" lang={lang} blocks={cmsPage?.data?.blocks} t={t} />
    </main>
  );
}
