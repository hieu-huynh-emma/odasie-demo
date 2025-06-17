import { Label } from '@/components/ui/field';
import { Radio, RadioGroup as UIRadioGroup } from '@/components/ui/radio-group';
import FieldError from './FieldError';

export function RadioGroup({
  name,
  value,
  onChange,
  options = [],
  label,
  orientation = 'vertical',
  errors = [],
}: {
  name: string;
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  orientation?: 'horizontal' | 'vertical';
  errors?: string[];
}) {
  return (
    <UIRadioGroup
      name={name}
      value={value}
      onChange={onChange}
      orientation={orientation}>
      <Label>{label}</Label>
      {options.map(option => (
        <Radio className="mb-2" key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
      <FieldError className="mt-2" errors={errors} />
    </UIRadioGroup>
  );
}
