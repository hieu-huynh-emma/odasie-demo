import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';

import { appConfig } from './configs';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url-href', url.href);
  requestHeaders.set('x-url-pathname', url.pathname);

  const modifiedRequest = new NextRequest(request.url, {
    ...request,
    headers: requestHeaders,
  });

  return i18nRouter(modifiedRequest, {
    locales: appConfig.supportedLanguages,
    defaultLocale: appConfig.defaultLanguage,
  });
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
