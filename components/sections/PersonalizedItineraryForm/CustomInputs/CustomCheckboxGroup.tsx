import { Icon, Image } from '@/types';
import {
  Checkbox,
  CheckboxGroup as UICheckboxGroup,
} from '@/components/ui/checkbox';
import { Label } from '@/components/ui/field';
import FieldError from '@/components/Form/FieldError';
import DynamicIcon from '@/components/DynamicIcon';
import { cn } from '@/lib/utils';

type CheckboxProps = {
  name: string;
  options: {
    label: string;
    value: string;
    icon: Icon | null;
    image: Image | null;
  }[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error: string[];
  max?: number;
};

export default function CustomCheckboxGroup({
  name,
  options,
  value = [],
  onChange,
  label,
  error = [],
  max,
}: CheckboxProps) {
  const isMaxSelected = max !== undefined && value.length === max;

  return (
    <UICheckboxGroup name={name} value={value} onChange={onChange}>
      <Label>{label}</Label>
      <div className="grid grid-cols-12 gap-2">
        {options.map(option => {
          if (option.icon) {
            return (
              <div className="col-span-12 md:col-span-6" key={option.value}>
                <IconCheckbox
                  key={option.value}
                  icon={option.icon}
                  label={option.label}
                  value={option.value}
                  groupValue={value}
                  isMaxSelected={isMaxSelected}
                  onChange={onChange}
                />
              </div>
            );
          }
          if (option.image) {
            return (
              <div className="col-span-12 md:col-span-6" key={option.value}>
                <ImageCheckbox
                  key={option.value}
                  image={option.image}
                  label={option.label}
                  value={option.value}
                  groupValue={value}
                  isMaxSelected={isMaxSelected}
                  onChange={onChange}
                />
              </div>
            );
          }

          return (
            <div className="col-span-12 md:col-span-6" key={option.value}>
              <Checkbox
                key={option.value}
                value={option.value}
                className="mb-5"
                isDisabled={isMaxSelected && !value.includes(option.value)} // Disable unselected checkboxes if max is reached
              >
                {option.label}
              </Checkbox>
            </div>
          );
        })}
      </div>
      <FieldError errors={error} className="mt-2" />
    </UICheckboxGroup>
  );
}

function IconCheckbox({
  icon,
  label,
  value,
  groupValue,
  isMaxSelected,
  onChange,
}: {
  icon: Icon;
  label: string;
  value: string;
  groupValue: string[];
  isMaxSelected: boolean;
  onChange: (value: string[]) => void;
}) {
  const isDisabled = isMaxSelected && !groupValue.includes(value);
  const isSelected = groupValue.includes(value);

  function onClick() {
    if (isDisabled) return;

    if (isSelected) {
      onChange(groupValue.filter(v => v !== value));
    } else {
      onChange([...groupValue, value]);
    }
  }
  return (
    <div
      key={value}
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center gap-x-2 rounded-xs border border-gray-300 bg-white px-6 py-[11px]',
        isSelected && 'bg-primary-500',
        isDisabled && 'cursor-not-allowed opacity-60',
      )}>
      <DynamicIcon
        name={icon.name}
        color={icon.color || '#00425E'}
        size={icon.size || 16}
      />
      <p className="typo-base-medium">{label}</p>
    </div>
  );
}

function ImageCheckbox({
  image,
  label,
  value,
  groupValue,
  isMaxSelected,
  onChange,
}: {
  image: Image;
  label: string;
  value: string;
  groupValue: string[];
  isMaxSelected: boolean;
  onChange: (value: string[]) => void;
}) {
  const isDisabled = isMaxSelected && !groupValue.includes(value);
  const isSelected = groupValue.includes(value);

  function onClick() {
    if (isDisabled) return;

    if (isSelected) {
      onChange(groupValue.filter(v => v !== value));
    } else {
      onChange([...groupValue, value]);
    }
  }

  return (
    <div
      onClick={onClick}
      className="relative flex h-[143px] w-full cursor-pointer items-end overflow-hidden rounded-[10px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${image.url})`,
      }}>
      <div className="via-white-300 absolute bottom-0 z-1 h-[40px] w-full bg-gradient-to-t from-black to-transparent" />
      <div className="z-[2] flex w-full items-center justify-between p-2">
        <p className="typo-base-medium text-white">{label}</p>
        <Checkbox
          className="rounded-[6px] bg-white"
          key={value}
          value={value}
          isDisabled={isDisabled}></Checkbox>
      </div>
    </div>
  );
}
