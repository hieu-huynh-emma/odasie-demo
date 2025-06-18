'use client';
import React, {
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args,
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  const stableThreshold = Array.isArray(threshold)
    ? threshold.join(';')
    : threshold;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const inputThreshold =
      typeof stableThreshold === 'string'
        ? stableThreshold.split(';').map(Number)
        : stableThreshold;

    const observerParams = { threshold: inputThreshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, stableThreshold, root, rootMargin, frozen]);

  return entry;
}

function useLCPObserver(): PerformanceEntry | undefined {
  const [entry, setEntry] = useState<PerformanceEntry>();

  useEffect(() => {
    const observer = new PerformanceObserver(list => {
      setEntry(list.getEntries().pop());
    });

    observer.observe({
      entryTypes: [
        // 'navigation',
        'largest-contentful-paint',
        // 'resource',
        // 'mark',
        // 'measure',
        // 'frame',
        // 'longtask'
      ],
    });
    return () => observer.disconnect();
  }, []);

  return entry;
}

export const RenderWithWindowIntersection = ({
  children,
}: {
  children: ({ loaded }: { loaded: boolean }) => ReactElement;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const loaded = Boolean(entry?.isIntersecting);

  return (
    <div ref={ref}>
      <>{children({ loaded })}</>
    </div>
  );
};
export const RenderAfterLCP = ({ children }) => {
  const entry = useLCPObserver();
  const loaded = Boolean(entry?.entryType === 'largest-contentful-paint');

  return <>{loaded ? children : null}</>;
};

// <RenderWithWindowIntersection>

// </RenderWithWindowIntersection>
