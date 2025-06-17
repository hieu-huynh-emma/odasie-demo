'use client';

import { Suspense, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { initializeI18n } from '@/lib/i18n';
import { i18n } from 'i18next';

type Props = React.PropsWithChildren<{
  lang: string;
}>;

export default function I18nProvider({ children, lang }: Props) {
  const [i18n, setState] = useState<i18n | null>(null);

  useEffect(() => {
    (async () => {
      const i18nInstance = await initializeI18n(lang, []);
      setState(i18nInstance.i18n);
    })();
  }, [lang]);
  return (
    <Suspense fallback={<div />}>
      {i18n ? <I18nextProvider i18n={i18n}>{children}</I18nextProvider> : <></>}
    </Suspense>
  );
}
