'use client';

import { Minus, Plus } from 'lucide-react';
import {
  ButtonProps as AriaButtonProps,
  Input as AriaInput,
  InputProps as AriaInputProps,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  ValidationResult as AriaValidationResult,
  composeRenderProps,
  Text,
} from 'react-aria-components';

import { cn } from '@/lib/utils';

import { Button } from './aria-button';
import { FieldError, FieldGroup, Label } from './field';

const NumberField = AriaNumberField;

function NumberFieldInput({ className, ...props }: AriaInputProps) {
  return (
    <AriaInput
      className={composeRenderProps(className, className =>
        cn(
          'bg-background placeholder:text-muted-foreground w-fit min-w-0 flex-1 border-r border-transparent pr-2 text-center outline outline-0 [&::-webkit-search-cancel-button]:hidden',
          className,
        ),
      )}
      {...props}
    />
  );
}

function NumberFieldSteppers({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('absolute right-0 flex h-full border-l', className)}
      {...props}>
      <NumberFieldStepper slot="increment">
        <Plus aria-hidden className="size-4" />
      </NumberFieldStepper>
      <NumberFieldStepper slot="decrement">
        <Minus aria-hidden className="size-4" />
      </NumberFieldStepper>
    </div>
  );
}

function NumberFieldStepper({ className, ...props }: AriaButtonProps) {
  return (
    <Button
      className={composeRenderProps(className, className =>
        cn('text-muted-foreground w-auto grow rounded-full px-0.5', className),
      )}
      variant={'ghost'}
      size={'sm'}
      {...props}
    />
  );
}

interface JollyNumberFieldProps extends AriaNumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function JollyNumberField({
  label,
  description,
  errorMessage,
  className,
  ...props
}: JollyNumberFieldProps) {
  return (
    <NumberField
      className={composeRenderProps(className, className =>
        cn('group flex flex-col gap-2', className),
      )}
      {...props}>
      <Label>{label}</Label>
      <FieldGroup>
        <NumberFieldInput />
        <NumberFieldSteppers />
      </FieldGroup>
      {description && (
        <Text className="text-muted-foreground text-sm" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
    </NumberField>
  );
}

export {
  NumberField,
  NumberFieldInput,
  NumberFieldSteppers,
  NumberFieldStepper,
  JollyNumberField,
};
export type { JollyNumberFieldProps };
