'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GlobalSettings } from '@/types';

interface Props {
  lang: string;
  settings: GlobalSettings;
  showLabel?: boolean;
}

export default function CurrencySwitcher({ settings }: Props) {
  //   const { t } = await initializeI18n(lang, ['common']);

  return (
    <>
      {settings.defaultCurrency && (
        <div className="flex flex-col gap-2">
          <Select name="currency">
            <SelectTrigger className="max-w-[265px] bg-white">
              <SelectValue
                placeholder={`${settings.defaultCurrency.name} (${settings.defaultCurrency.symbol})`}
              />
            </SelectTrigger>
            <SelectContent>
              {settings.currencies.map(currency => (
                <SelectItem
                  key={currency.code}
                  value={
                    currency.code
                  }>{`${currency.name} (${currency.symbol})`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
