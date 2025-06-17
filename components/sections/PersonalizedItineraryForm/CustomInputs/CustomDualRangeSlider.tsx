import { DualRangeSlider as UIDualRangeSlider } from '@/components/ui/dual-range-slider';
import { Label } from '@/components/ui/label';

type Props = {
  name: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  label?: string;
};

export default function CustomDualRangeSlider({
  name,
  min,
  max,
  step,
  value,
  onValueChange,
  label,
}: Props) {
  return (
    <div className="mb-10 mt-2 w-full">
      <Label className="my-2">{label}</Label>
      <UIDualRangeSlider
        name={name}
        className="mt-2"
        label={numberValue => {
          return (
            <div className="rounded-xs bg-white px-3 py-2 shadow-lg">
              {numberValue}
            </div>
          );
        }}
        labelPosition="bottom"
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
