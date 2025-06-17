import { Textarea as UITextArea } from '@/components/ui/textarea';
import { Label } from '../ui/label';
import FieldError from './FieldError';
import { cn } from '@/lib/utils';

export default function TextArea({
  name,
  value,
  onChange,
  label,
  placeholder,
  className,
  errors = [],
  required = false,
  shouldShowError = true,
}: {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  errors?: string[];
  required?: boolean;
  shouldShowError?: boolean;
}) {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <UITextArea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={event => {
          if (onChange) onChange(event.target.value);
        }}
        className={cn(
          className,
          errors.length > 0 && 'border-[1px] border-red-500',
        )}
      />
      {shouldShowError && <FieldError errors={errors} />}
    </div>
  );
}
