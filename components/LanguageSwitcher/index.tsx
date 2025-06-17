'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocalized } from '@/contexts/LocalizedContext';
import { Language } from '@/types';

import { useRouter, usePathname } from 'next/navigation';

type LanguageSwitcherProps = {
  languages: Language[];
  defaultLanguage: Language;
};

function LanguageSwitcher({
  defaultLanguage,
  languages,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { localizedSlugs } = useLocalized();

  const onLanguageChange = (code: string) => {
    // Get all language codes from the languages prop
    const languageCodes = languages.map(lang => lang.code);
    const langPattern = new RegExp(`^/(${languageCodes.join('|')})`);
    const pathWithoutLang = pathname.replace(langPattern, '');
    const newPath = pathWithoutLang === '' ? '/' : pathWithoutLang;

    if (
      localizedSlugs &&
      pathWithoutLang === localizedSlugs[`${defaultLanguage.code}`]
    ) {
      router.push(`/${code}${localizedSlugs[`${code}`]}`);
    } else {
      router.push(`/${code}/${newPath}`);
    }
  };

  return (
    <Select name="language" onValueChange={onLanguageChange}>
      <SelectTrigger className="h-10 max-w-[265px] bg-white font-semibold">
        <SelectValue placeholder={defaultLanguage.name} />
      </SelectTrigger>
      <SelectContent>
        {languages.map(language => (
          <SelectItem key={language.code} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
