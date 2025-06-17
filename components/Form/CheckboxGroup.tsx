import {
  Checkbox,
  CheckboxGroup as UICheckboxGroup,
} from '@/components/ui/checkbox';
import { Label } from '@/components/ui/field';
import FieldError from './FieldError';

export function CheckboxGroup({
  name,
  label,
  value = [],
  onChange,
  options,
  max,
  errors = [],
}: {
  name: string;
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  options: { value: string; label: string }[];
  max?: number;
  errors?: string[];
}) {
  const isMaxSelected = max !== undefined && value.length >= max;

  return (
    <UICheckboxGroup name={name} value={value} onChange={onChange}>
      <Label>{label}</Label>
      {options.map(option => (
        <Checkbox
          key={option.value}
          value={option.value}
          className="mb-5"
          isDisabled={isMaxSelected && !value.includes(option.value)} // Disable unselected checkboxes if max is reached
        >
          {option.label}
        </Checkbox>
      ))}
      <FieldError errors={errors} className="mt-2" />
    </UICheckboxGroup>
  );
}
