'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';

interface BackgroundImageWithFallbackProps {
  url: string;
  fallbackColor?: string;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  priority?: boolean;
  fadeInDuration?: number;
}

const BackgroundImageWithFallback = ({
  url,
  fallbackColor = 'rgb(234, 236, 240)',
  className = '',
  children,
  style,
  priority = false,
  fadeInDuration = 300,
}: BackgroundImageWithFallbackProps) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle image load/error events
  useEffect(() => {
    if (!url) {
      setImageState('error');
      return;
    }

    const img = new Image();

    const handleLoad = () => {
      setImageState('loaded');
    };

    const handleError = () => {
      setImageState('error');
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    if (priority) {
      img.loading = 'eager';
    }

    img.src = url;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [url, priority]);

  const backgroundStyle: React.CSSProperties = {
    ...style,
    backgroundColor: fallbackColor,
    backgroundImage: url ? `url("${url}")` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition:
      imageState === 'loaded'
        ? `opacity ${fadeInDuration}ms ease-in-out`
        : 'none',
    opacity: imageState === 'loaded' ? 1 : 0.8,
    willChange: imageState === 'loading' ? 'opacity' : 'auto',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  };

  const combinedClassName = [
    className,
    imageState === 'loading' && 'bg-image-loading',
    imageState === 'loaded' && 'bg-image-loaded',
    imageState === 'error' && 'bg-image-error',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={combinedClassName}
      style={backgroundStyle}>
      {children}
    </div>
  );
};

export default BackgroundImageWithFallback;
