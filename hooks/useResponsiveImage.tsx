import { useMemo } from 'react';
import { Image } from '@/types/shared';
import useBreakpoint from './useBreakPoint';

type BreakpointFormat =
  | 'thumbnail'
  | 'small'
  | 'medium'
  | 'large'
  | 'mlarge'
  | 'xlarge'
  | 'original';

type BreakpointMapping = {
  xs?: BreakpointFormat;
  sm?: BreakpointFormat;
  md?: BreakpointFormat;
  lg?: BreakpointFormat;
  ml?: BreakpointFormat;
  xl?: BreakpointFormat;
};

type ResponsiveImageOptions = {
  /**
   * Custom mapping of breakpoints to image formats
   * Default:
   * - xs, sm: small
   * - md: medium
   * - lg, xl: large
   */
  breakpointMapping?: BreakpointMapping;
  defaultFormat?: BreakpointFormat;
  /**
   * When true, the hook will prefer WebP/AVIF formats if available
   */
  preferModernFormats?: boolean;
  defaultBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'ml' | 'xl';
};

const defaultMapping: BreakpointMapping = {
  xs: 'small',
  sm: 'small',
  md: 'medium',
  lg: 'large',
  ml: 'mlarge',
  xl: 'xlarge',
};

/**
 * A hook that returns the appropriate image URL based on the current breakpoint
 * - Mobile (xs, sm): uses small format by default
 * - Medium screens (md): uses medium format by default
 * - Large screens (lg, xl): uses large format by default
 *
 * If preferModernFormats is true (default), will try to use WebP or AVIF format if available
 * Falls back to original URL if the format is not available
 */
const useResponsiveImage = (
  image?: Image | null,
  options?: ResponsiveImageOptions,
) => {
  const { breakpoint, isMobile } = useBreakpoint();

  const imageUrl = useMemo(() => {
    if (!image) return '';

    const originalUrl = image.url;

    if (!image.formats) return originalUrl;

    // Use custom mapping or default mapping
    const mapping = options?.breakpointMapping || defaultMapping;
    const defaultFormat = options?.defaultFormat || 'original';

    const imageBreakpoint =
      !isMobile && options?.defaultBreakpoint
        ? options.defaultBreakpoint
        : breakpoint;

    // Get the format for the current breakpoint or use default
    const format =
      mapping[imageBreakpoint as keyof BreakpointMapping] || defaultFormat;

    // If format is 'original', return the original URL
    if (format === 'original') return originalUrl;

    // Get the URL for the selected format if available
    const formatData = image.formats[format];

    // If no format data is available, return the original URL
    if (!formatData) return originalUrl;

    // Return the format URL if available, otherwise return the original URL
    return formatData.url || originalUrl;
  }, [image, breakpoint, options, isMobile]);

  return imageUrl;
};

export default useResponsiveImage;
