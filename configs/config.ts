type Config = {
  supportedLanguages: string[];
  defaultLanguage: string;
  gaId: string;
  gtmId: string;
  gmId: string;
  apiUrl: string;
  apiToken: string;
  gtmAuth: string;
  gtmPreview: string;
  gtmCookiesWindow: string;
  gtmScriptUrl: string;
  isProd: boolean;
  recaptchaSiteKey: string;
};

function getSupportedLanguages() {
  if (process.env.APP_SUPPORTED_LANGUAGES) {
    return process.env.APP_SUPPORTED_LANGUAGES.split(',');
  }

  if (process.env.NEXT_PUBLIC_APP_SUPPORTED_LANGUAGES) {
    return process.env.NEXT_PUBLIC_APP_SUPPORTED_LANGUAGES.split(',');
  }

  return [];
}

function getDefaultLanguage() {
  if (process.env.APP_DEFAULT_LANGUAGE) {
    return process.env.APP_DEFAULT_LANGUAGE;
  }

  if (process.env.NEXT_PUBLIC_APP_DEFAULT_LANGUAGE) {
    return process.env.NEXT_PUBLIC_APP_DEFAULT_LANGUAGE;
  }

  return '';
}

export const appConfig: Config = {
  supportedLanguages: getSupportedLanguages(),
  defaultLanguage: getDefaultLanguage(),
  gaId: process.env.NEXT_PUBLIC_GA_ID!,
  gmId: process.env.NEXT_PUBLIC_GM_ID!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  apiToken: process.env.NEXT_PUBLIC_APP_API_TOKEN!,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID!,
  gtmAuth: process.env.NEXT_PUBLIC_GTM_AUTH!,
  gtmPreview: process.env.NEXT_PUBLIC_GTM_PREVIEW!,
  gtmCookiesWindow: process.env.NEXT_PUBLIC_GTM_COOKIES_WINDOW!,
  gtmScriptUrl: process.env.NEXT_PUBLIC_GTM_SCRIPT_URL!,
  isProd: process.env.NODE_ENV === 'production',
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY || '',
};
