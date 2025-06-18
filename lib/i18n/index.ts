"use server";
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import { appConfig } from '@/configs';

export type I18nOptions = {
  keyPrefix?: string;
  fallbackLng?: string | string[];
  debug?: boolean;
  preload?: boolean;
  resources?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export async function initializeI18n(
  lang: string,
  namespaces: string | string[],
  options: I18nOptions = {},
) {
  const ns = Array.isArray(namespaces) ? namespaces : [namespaces];
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/messages/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng: lang,
      ns,
      defaultNS: ns[0],
      fallbackNS: ns[0],
      fallbackLng: options.fallbackLng || appConfig.defaultLanguage,
      supportedLngs: appConfig.supportedLanguages,
      preload: options.preload ? appConfig.supportedLanguages : undefined,
      debug: options.debug,
      resources: options.resources,
      interpolation: {
        escapeValue: false,
      },
    });

  return {
    t: i18nInstance.getFixedT(lang, ns, options.keyPrefix),
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
  };
}
