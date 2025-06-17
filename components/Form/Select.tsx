import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from '@/components/ui/select';
import FieldError from '@/components/Form/FieldError';

type Props = {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errors?: string[];
  label?: string;
  name: string;
};

export default function Select({
  value,
  placeholder,
  options,
  onChange,
  name,
  errors = [],
}: Props) {
  return (
    <UISelect onValueChange={onChange} name={name} value={value ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
      <FieldError errors={errors} />
    </UISelect>
  );
}
