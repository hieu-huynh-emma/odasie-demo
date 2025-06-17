'use client';
import { ItineraryFormInputs } from '@/types/itinerary-form';
import { NumberField } from './NumberField';
import InputComponent from '../sections/PersonalizedItineraryForm/InputComponent';
import { getDynamicNumberInputsIdentifier } from '@/helpers/personalized-form';

export default function DynamicNumberInput({
  id,
  name,
  value,
  values,
  setFieldValue,
  onChange,
  label,
  minValue,
  maxValue,
  description,
  defaultValue,
  errors = [],
  dynamicInput,
}: {
  id: number;
  name: string;
  value?: number;
  values: Record<string, any>;
  description?: string;
  setFieldValue: (field: string, value: any) => void;
  onChange?: (value: number) => void;
  label?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  errors?: string[];
  dynamicInput?: ItineraryFormInputs;
}) {
  return (
    <div>
      <NumberField
        minValue={minValue}
        maxValue={maxValue}
        description={description}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        errors={errors}
        defaultValue={defaultValue}
      />
      {dynamicInput && (value || 0) > 0 && (
        <div className="my-3 grid grid-cols-12 gap-4">
          {Array.from({ length: value ?? 0 }, (_, index) => {
            const dynamicInputId = getDynamicNumberInputsIdentifier(
              id,
              dynamicInput.id,
              index,
            );
            return (
              <div key={dynamicInputId} className="col-span-6">
                <InputComponent
                  key={dynamicInput.name}
                  input={dynamicInput}
                  values={values}
                  setFieldValue={setFieldValue}
                  value={values?.[dynamicInputId]}
                  error={[]}
                  onChange={(value: any) => {
                    setFieldValue(dynamicInputId, value);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
