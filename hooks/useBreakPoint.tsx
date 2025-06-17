import { useEffect, useMemo, useState } from 'react';

const breakpoints = {
  0: 'xs',
  600: 'sm',
  960: 'md',
  1280: 'lg',
  1440: 'ml',
  1920: 'xl',
};

const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState('');
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  const isMobile = useMemo(
    () => ['md', 'sm', 'xs'].includes(breakpoint),
    [breakpoint],
  );

  // Set the breakpoint based on window width
  const updateBreakpoint = (width: number | undefined) => {
    if (!width) return;

    if (width >= 1920) {
      setBreakPoint(breakpoints[1920]);
    } else if (width >= 1440) {
      setBreakPoint(breakpoints[1440]);
    } else if (width >= 1280) {
      setBreakPoint(breakpoints[1280]);
    } else if (width >= 960) {
      setBreakPoint(breakpoints[960]);
    } else if (width >= 600) {
      setBreakPoint(breakpoints[600]);
    } else {
      setBreakPoint(breakpoints[0]);
    }
  };

  // Setup initial window size and add event listener
  useEffect(() => {
    // Handle resize event
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWindowSize({ width, height });
      updateBreakpoint(width);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Set initial size
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this only runs once on mount

  return {
    breakpoint,
    isMobile,
    windowSize,
  };
};

export default useBreakpoint;
