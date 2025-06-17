import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap border border-solid rounded-[40px] shadow-xs transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-4 outline-offset-2',
  {
    variants: {
      variant: {
        primary:
          'text-gray-900 bg-primary-500 border-primary-500 hover:bg-primary-600 hover:border-primary-600 disabled:bg-primary-50 disabled:border-primary-50 outline-primary-100',
        secondary:
          'text-gray-900 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-300 disabled:text-gray-300 outline-gray-100',
        outline:
          'text-gray-900 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-gray-900 hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        'sm': 'h-9 px-[14px] typo-sm-semibold',
        'md': 'h-10 px-4 typo-sm-semibold',
        'lg': 'h-11 px-[18px] typo-base-semibold',
        'xl': 'h-12 px-5 typo-base-semibold',
        '2xl': 'h-14 px-[28px] typo-lg-semibold',
      },
      iconOnly: {
        true: '',
      },
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: 'sm',
        className: 'h-9 w-9 px-0',
      },
      {
        iconOnly: true,
        size: 'md',
        className: 'h-10 w-10 px-0',
      },
      {
        iconOnly: true,
        size: 'lg',
        className: 'h-11 w-11 px-0',
      },
      {
        iconOnly: true,
        size: 'xl',
        className: 'h-12 w-12 px-0',
      },
      {
        iconOnly: true,
        size: '2xl',
        className: 'h-14 w-14 px-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconOnly, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
