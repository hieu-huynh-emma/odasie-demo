import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { variant?: 'default' | 'simple' }
>(({ className, type, variant = 'default', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        variant === 'default' &&
          'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-sm border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm lg:rounded-md',
        variant === 'simple' &&
          'file:text-foreground placeholder:text-muted-foreground border-muted-foreground focus:border-ring flex h-9 w-full rounded-none bg-transparent py-1 text-base transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-b-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
