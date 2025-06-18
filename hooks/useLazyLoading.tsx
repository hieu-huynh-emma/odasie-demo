'use client';
import React, {
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import RenderOnViewportPlaceholder from "@/components/LazyLoad/RenderOnViewportPlaceholder";
import useDebounce from "@/hooks/useDebounce";

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0.2,
        root = null,
        rootMargin = '0%',
        freezeOnceVisible = false,
    }: Args,
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = (entries: IntersectionObserverEntry[]): void => {
        const lastEntry = entries.pop()
        if(!lastEntry?.rootBounds) return

        setTimeout(() => {
            setEntry(lastEntry);
        }, 100)
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

        const observerParams = {threshold: inputThreshold, root, rootMargin};
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef]);

    return entry;
}

function useLCPObserver() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new PerformanceObserver(list => {
            setTimeout(() => {
                const lastEntry =list.getEntries().pop()

                setIsLoaded(Boolean(lastEntry?.entryType === 'largest-contentful-paint'));
            }, 100)
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

    return isLoaded;
}

export function useOnFirstInteraction() {
    const [detected, setDetected] = useState(false);

    useEffect(() => {
        if (detected) return;
        const listener = (): void => {
            setDetected(true);
        };
        window.addEventListener(`mousemove`, listener);
        window.addEventListener(`touchstart`, listener);
        window.addEventListener(`scroll`, listener);
        window.addEventListener(`click`, listener);

        return () => {
            window.removeEventListener(`touchstart`, listener);
            window.removeEventListener(`mousemove`, listener);
            window.removeEventListener(`scroll`, listener);
            window.removeEventListener(`click`, listener);
        };
    }, [detected]);

    return detected;
}

export const RenderOnViewport = ({children, height = 200}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const loaded = Boolean(entry?.isIntersecting);

    return loaded ? <>{children}</> : <RenderOnViewportPlaceholder ref={ref} height={height} />;
};

export const RenderAfterLCP = ({children}) => {
    const loaded = useLCPObserver();

    return <>{loaded ? children : null}</>;
};

export const RenderOnFirstInteraction = ({children}) => {
    const loaded = useOnFirstInteraction();

    return <>{loaded ? children : null}</>;
};

