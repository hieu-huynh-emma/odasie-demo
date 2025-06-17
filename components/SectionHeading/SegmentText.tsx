import { cn } from '@/lib/utils';
import { Segment } from '@/types';
import { memo, useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicIcon = dynamic(() => import('@/components/DynamicIcon'), {
  ssr: true,
  loading: () => null,
});

type SegmentTextProps = {
  segment: Segment;
  shouldHideSpacing?: boolean;
  subHeadingSize?: '2xl' | '4xl' | '5xl';
};

function SegmentText({
  segment,
  shouldHideSpacing,
  subHeadingSize = '5xl',
}: SegmentTextProps) {
  const { icon, text, highlight, newline, noSpacing, isSubHeading } = segment;

  const computedValues = useMemo(() => {
    const spacing = noSpacing || shouldHideSpacing ? '' : ' ';
    const textStyle = icon?.color ? { color: icon.color } : undefined;
    const finalText = `${text}${spacing}`;

    return { spacing, textStyle, finalText };
  }, [icon?.color, text, noSpacing, shouldHideSpacing]);

  const IconComponent = useMemo(() => {
    if (!icon?.name) return null;

    return (
      <DynamicIcon
        name={icon.name}
        size="1em"
        color={icon.color || undefined}
        className="mr-1 inline-block align-middle"
      />
    );
  }, [icon?.name, icon?.color]);

  const highlightClasses = useMemo(() => {
    if (!highlight) return '';

    return cn(
      'font-bold',
      highlight === 'primary' && !icon?.color && 'text-primary-500',
      highlight === 'secondary' && !icon?.color && 'text-secondary-500',
      highlight === 'white' && !icon?.color && 'text-white',
    );
  }, [highlight, icon?.color]);

  const spanClasses = useMemo(() => {
    return cn(isSubHeading && `typo-${subHeadingSize}-regular`);
  }, [isSubHeading, subHeadingSize]);

  const ContentComponent = useMemo(() => {
    const textContent = (
      <>
        {IconComponent}
        {computedValues.finalText}
      </>
    );

    if (highlight) {
      return (
        <strong className={highlightClasses} style={computedValues.textStyle}>
          {textContent}
        </strong>
      );
    }

    return (
      <span style={computedValues.textStyle} className={spanClasses}>
        {textContent}
      </span>
    );
  }, [
    IconComponent,
    computedValues.finalText,
    computedValues.textStyle,
    highlight,
    highlightClasses,
    spanClasses,
  ]);

  if (newline) {
    return (
      <>
        <br />
        {ContentComponent}
      </>
    );
  }

  return ContentComponent;
}

export default memo(SegmentText);
