'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
  priority?: boolean;
  eager?: boolean;
}

const ImageWithFallback = ({
  src,
  fallbackSrc = '/images/image-fallback.svg',
  alt,
  priority = false,
  eager = true,
  ...props
}: ImageWithFallbackProps) => {
  // Create skeleton loading placeholder with "Image is loading" text
  const createSkeletonPlaceholder = () => {
    const svg = `
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
          </linearGradient>
          <style>
            .shimmer-bg { fill: url(#shimmer); }
            .loading-text { 
              fill: #9ca3af; 
              font-family: Arial, sans-serif; 
              font-size: 16px; 
              text-anchor: middle; 
              dominant-baseline: middle; 
            }
            .icon-circle { fill: #d1d5db; }
            .icon-mountains { fill: #9ca3af; }
          </style>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="300" class="shimmer-bg"/>
        
        <!-- Image icon -->
        <g transform="translate(200, 120)">
          <circle cx="0" cy="0" r="30" class="icon-circle"/>
          <!-- Mountain peaks -->
          <path d="M-20 10 L-10 -5 L0 5 L10 -10 L20 0 L20 15 L-20 15 Z" class="icon-mountains"/>
          <!-- Sun -->
          <circle cx="12" cy="-12" r="6" fill="#fbbf24"/>
        </g>
        
        <!-- Loading dots -->
        <g transform="translate(200, 200)">
          <circle cx="-12" cy="0" r="3" fill="#9ca3af">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="0" cy="0" r="3" fill="#9ca3af">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="12" cy="0" r="3" fill="#9ca3af">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.4s" repeatCount="indefinite"/>
          </circle>
        </g>
      </svg>
    `;

    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const defaultPlaceholder = createSkeletonPlaceholder();

  const [imgSrc, setImgSrc] = useState<string>(
    typeof src === 'string' && src ? src : fallbackSrc,
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setHasError(false);
  };

  // Reset error state when src changes
  if (src && typeof src === 'string' && src !== imgSrc && !hasError) {
    setImgSrc(src);
    setHasError(false);
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      priority={priority}
      loading={eager ? 'eager' : props.loading}
      placeholder={props.placeholder || 'blur'}
      blurDataURL={props.blurDataURL || defaultPlaceholder}
    />
  );
};

export default ImageWithFallback;
