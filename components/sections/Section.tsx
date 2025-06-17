import { cn } from '@/lib/utils';
import React from 'react';

type SectionProps = React.PropsWithChildren<{
  bg?: 'primary' | 'secondary';
  className?: string;
  style?: React.CSSProperties;
}>;

function getBackgroundColor(bg: string) {
  switch (bg) {
    case 'secondary':
      return 'bg-gray-100';

    case 'primary':
    default:
      return 'bg-white';
  }
}

function Section({ bg = 'primary', className, children, style }: SectionProps) {
  return (
    <section
      className={cn(
        'relative pt-8 lg:pt-16',
        getBackgroundColor(bg),
        className,
      )}
      style={style}>
      {children}
    </section>
  );
}

export default Section;
