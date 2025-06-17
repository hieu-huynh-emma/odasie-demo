'use client';

import { useEffect, useRef, useState } from 'react';

type VideoMediaProps = {
  src: string;
  poster: string;
  isMobile?: boolean;
};

function VideoMedia({ src, poster, isMobile = false }: VideoMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [_, setIsLoading] = useState(true); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false); // Don't load video immediately
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');

  // For mobile, delay video loading to prioritize LCP
  useEffect(() => {
    if (!shouldLoadVideo) {
      const timer = setTimeout(() => {
        setShouldLoadVideo(true);
      }, 2000); // Delay video loading by 2 seconds on mobile

      return () => clearTimeout(timer);
    }
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!videoRef.current || isYouTube || !shouldLoadVideo) {
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      setIsLoading(false);
    } else {
      // Dynamically import HLS.js only when needed
      const loadHls = async () => {
        try {
          const { default: Hls } = await import('hls.js');

          if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls({
              enableWorker: false,
              lowLatencyMode: false,
              // Mobile optimizations
              maxBufferLength: isMobile ? 15 : 30, // Reduce buffer for mobile
              maxMaxBufferLength: isMobile ? 30 : 60,
              maxBufferSize: isMobile ? 30 * 1000 * 1000 : 60 * 1000 * 1000, // 30MB vs 60MB
            });

            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              setIsLoading(false);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
              console.warn('HLS error:', data);
              setIsLoading(false);
            });

            // Cleanup function
            return () => {
              hls.destroy();
            };
          } else {
            video.src = src;
            setIsLoading(false);
          }
        } catch (error) {
          console.warn('Failed to load HLS.js:', error);
          // Fallback to direct video src
          if (videoRef.current) {
            videoRef.current.src = src;
          }
          setIsLoading(false);
        }
      };

      loadHls();
    }
  }, [src, isYouTube, shouldLoadVideo, isMobile]);

  if (isYouTube) {
    return (
      <div className="px-4 sm:px-0">
        <div
          className="relative mx-auto max-w-6xl overflow-hidden"
          style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={src}
            title="YouTube video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  if (!src) {
    return null;
  }

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 z-10 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${poster})`,
          display: shouldLoadVideo ? 'none' : 'block', // Hide when video loads
        }}
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay={!isMobile} // Disable autoplay on mobile to save bandwidth
          loop
          muted
          playsInline
          poster={poster}
          className="h-full w-full object-cover"
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          preload={isMobile ? 'none' : 'metadata'}
          // Mobile optimization attributes
          {...(isMobile && {
            controls: false,
            disableRemotePlayback: true,
          })}
        />
      )}
    </div>
  );
}

export default VideoMedia;
