import { Label } from '@/components/ui/field';
import {
  NumberField as UINumberField,
  NumberFieldInput,
  NumberFieldStepper,
} from '@/components/ui/numberfield';
import { Minus, Plus } from 'lucide-react';
import FieldError from './FieldError';

export function NumberField({
  name,
  value,
  onChange,
  label,
  minValue,
  maxValue,
  description,
  defaultValue,
  errors = [],
}: {
  name: string;
  value?: number;
  description?: string;
  onChange?: (value: number) => void;
  label?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  errors?: string[];
}) {
  return (
    <UINumberField
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      minValue={minValue ?? undefined}
      maxValue={maxValue ?? undefined}>
      <div className="grid grid-cols-12 items-center gap-2">
        <div className="col-span-8">
          <Label>{label}</Label>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
        <div className="col-span-4 flex justify-around">
          <NumberFieldStepper slot="decrement">
            <Minus aria-hidden className="size-4" />
          </NumberFieldStepper>
          <NumberFieldInput />
          <NumberFieldStepper slot="increment">
            <Plus aria-hidden className="size-4" />
          </NumberFieldStepper>
        </div>
      </div>
      <FieldError errors={errors} />
    </UINumberField>
  );
}
