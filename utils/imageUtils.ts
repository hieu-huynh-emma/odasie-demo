/**
 * Common responsive image sizes for different contexts
 * These can be used directly with the sizes attribute of next/image
 */
export const IMAGE_SIZES = {
  // Full-width images (banners, heroes)
  FULL_WIDTH: '100vw',

  // Card images in grids - adjusts based on screen size
  CARD: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',

  // Medium-sized in-content images
  CONTENT: '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw',

  // Sidebar or complementary images
  SIDEBAR: '(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 25vw',

  // Avatar or profile images
  AVATAR: '(max-width: 640px) 80px, 48px',

  // Gallery or grid images
  GALLERY: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
};

/**
 * Default settings to ensure optimal image loading
 */
export const DEFAULT_IMAGE_QUALITY = 85; // Good balance between quality and file size

export const getSizesByContainerWidth = (
  containerWidth: 'full' | 'half' | 'third' | 'quarter' | 'custom',
  mobileFullWidth: boolean = true,
  customSizes?: string,
): string => {
  if (containerWidth === 'custom' && customSizes) {
    return customSizes;
  }

  const mobileSize = mobileFullWidth ? '100vw' : '50vw';

  switch (containerWidth) {
    case 'full':
      return mobileFullWidth
        ? '100vw'
        : `(max-width: 768px) ${mobileSize}, 100vw`;
    case 'half':
      return `(max-width: 768px) ${mobileSize}, 50vw`;
    case 'third':
      return `(max-width: 768px) ${mobileSize}, (max-width: 1024px) 50vw, 33.33vw`;
    case 'quarter':
      return `(max-width: 640px) ${mobileSize}, (max-width: 1024px) 33.33vw, 25vw`;
    default:
      return IMAGE_SIZES.CONTENT;
  }
};
