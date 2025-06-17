'use client';

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <AriaButton
      className={composeRenderProps(className, className =>
        cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        ),
      )}
      {...props}
    />
  );
};

export { Button };
export type { ButtonProps };
