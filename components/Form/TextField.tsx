'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';
import FieldError from './FieldError';

export function TextField({
  className,
  label,
  name,
  placeholder,
  value,
  onChange,
  errors = [],
  shouldShowError = true,
  required = false,
}: {
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  shouldShowError?: boolean;
  required?: boolean;
}) {
  return (
    <div className={cn('grid w-full items-center gap-1.5', className)}>
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        required
        className={cn(
          'w-full',
          errors.length > 0 && 'border-[1px] border-red-500',
        )}
        name={name}
        onChange={event => {
          if (onChange) onChange(event);
        }}
        value={value}
        placeholder={placeholder}
      />
      {shouldShowError && <FieldError errors={errors} />}
    </div>
  );
}
