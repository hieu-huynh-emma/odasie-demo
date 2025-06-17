'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const VideoMedia = dynamic(() => import('./VideoMedia'), {
  ssr: false,
  loading: () => null,
});

type HeroContentClientProps = {
  shouldShowVideo: boolean;
  shouldShowSearchBar: boolean;
  videoSrc?: string;
  videoPoster?: string;
  isMobile: boolean;
};

export default function HeroContentClient({
  shouldShowVideo,
  videoSrc,
  videoPoster,
  isMobile,
}: HeroContentClientProps) {
  return (
    <>
      {/* Progressive video */}
      {shouldShowVideo && videoSrc && videoPoster && (
        <Suspense fallback={null}>
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <VideoMedia
              src={videoSrc}
              poster={videoPoster}
              isMobile={isMobile}
            />
          </div>
        </Suspense>
      )}
    </>
  );
}
