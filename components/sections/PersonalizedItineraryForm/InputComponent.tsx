import { DatePicker } from '@/components/Form/Datepicker';
import { DateRangePicker } from '@/components/Form/DateRangePicker';
import DynamicNumberInput from '@/components/Form/DynamicNumberInput';
import { NumberField } from '@/components/Form/NumberField';
import { RadioGroup } from '@/components/Form/RadioGroup';
import Select from '@/components/Form/Select';
import { TextField } from '@/components/Form/TextField';
import { ItineraryFormInputs } from '@/types/itinerary-form';
import CustomCheckboxGroup from './CustomInputs/CustomCheckboxGroup';
import CustomDualRangeSlider from './CustomInputs/CustomDualRangeSlider';

export default function InputComponent({
  input,
  value,
  values,
  setFieldValue,
  onChange,
  error = [],
}: {
  input: ItineraryFormInputs;
  value: any;
  values: any;
  onChange: (value: any) => void;
  setFieldValue: (field: string, value: any) => void;
  error?: string[];
}) {
  switch (input.type) {
    case 'select':
      return (
        <div className="col-span-12">
          <Select
            name={input.name}
            value={value}
            onChange={onChange}
            label={input.label}
            placeholder={input.placeholder}
            options={
              input?.answers?.map(answer => ({
                label: answer.label,
                value: answer.value,
              })) || []
            }
            errors={error}
          />
        </div>
      );
    case 'radio':
      return (
        <div className="col-span-12">
          <RadioGroup
            name={input.name}
            options={
              input?.answers?.map(answer => ({
                label: answer.label,
                value: answer.value,
              })) || []
            }
            value={value}
            label={input.label}
            onChange={onChange}
            errors={error}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div className="col-span-12">
          <CustomCheckboxGroup
            name={input.name}
            options={
              input?.answers?.map(answer => ({
                label: answer.label,
                value: answer.value,
                icon: answer.icon,
                image: answer.image,
              })) || []
            }
            value={value}
            max={input.validation?.max || undefined}
            label={input.label}
            onChange={onChange}
            error={error}
          />
        </div>
      );
    case 'date':
      return (
        <div className="col-span-6">
          <DatePicker
            label={input.label}
            name={input.name}
            date={value}
            onSelect={onChange}
            placeholder={input.placeholder}
            errors={error}
          />
        </div>
      );
    case 'dateRange':
      return (
        <div className="col-span-12">
          <DateRangePicker
            name={input.name}
            range={value}
            onSelect={onChange}
            errors={error}
          />
        </div>
      );
    case 'range-slider':
      return (
        <div className="col-span-12 pl-6 pr-6">
          <CustomDualRangeSlider
            name={input.name}
            label={input.label}
            min={input.validation?.min || 0}
            max={input.validation?.max || 0}
            value={value}
            onValueChange={onChange}
            step={input?.step || 1}
          />
        </div>
      );
    case 'text':
      return (
        <div className="col-span-12">
          <TextField
            name={input.name}
            value={value}
            onChange={onChange}
            errors={error}
          />
        </div>
      );
    case 'dynamic':
      return (
        <div className="col-span-12">
          <DynamicNumberInput
            id={input.id}
            name={input.name}
            value={value}
            values={values}
            onChange={onChange}
            label={input.label}
            minValue={input.validation?.min}
            maxValue={input.validation?.max}
            description={input.placeholder}
            errors={error}
            dynamicInput={input.dynamicInput}
            setFieldValue={setFieldValue}
          />
        </div>
      );
    case 'number':
      return (
        <div className="col-span-12">
          <NumberField
            minValue={input.validation?.min}
            maxValue={input.validation?.max}
            description={input.placeholder}
            label={input.label}
            name={input.name}
            value={value}
            onChange={onChange}
            errors={error}
          />
        </div>
      );
    default:
      return <></>;
  }
}
