import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { i18n } from '../i18n-config';
import type { I18nConfig } from '../i18n-config';

function getLocale(request: NextRequest, i18nConfig: I18nConfig): string {
  const { locales, defaultLocale } = i18nConfig;
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  // console.log('getLocale', languages, locales, defaultLocale);

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  let response;
  let nextLocale;
  console.log('middleware');
  const { locales, defaultLocale } = i18n;

  const pathname = request.nextUrl.pathname;
  // console.log('pathName', pathname);
  // console.log(
  //   'pathName-admin',
  //   pathname === '/admin' || pathname.startsWith('/admin/')
  // );

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.next();
  }

  const pathLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathLocale) {
    // console.log('pathLocale', pathLocale);
    const isDefaultLocale = pathLocale === defaultLocale;
    if (isDefaultLocale) {
      // console.log('isDefaultLocale', isDefaultLocale);
      let pathWithoutLocale = pathname.slice(`/${pathLocale}`.length) || '/';
      if (request.nextUrl.search) pathWithoutLocale += request.nextUrl.search;

      response = NextResponse.redirect(new URL(pathWithoutLocale, request.url));
    }

    nextLocale = pathLocale;
    // console.log('nextLocale-1', nextLocale);
  } else {
    const isFirstVisit = !request.cookies.has('NEXT_LOCALE');
    // console.log('isFirstVisit', isFirstVisit);

    const locale = isFirstVisit ? getLocale(request, i18n) : defaultLocale;
    // console.log('locale', locale);

    let newPath = `${locale}${pathname}`;

    if (request.nextUrl.search) newPath += request.nextUrl.search;

    response =
      locale === defaultLocale
        ? NextResponse.rewrite(new URL(newPath, request.url))
        : NextResponse.redirect(new URL(newPath, request.url));
    nextLocale = locale;
    // console.log('nextLocale-2');
  }

  if (!response) response = NextResponse.next();

  if (nextLocale) response.cookies.set('NEXT_LOCALE', nextLocale);
  // console.log('response', response);
  return response;
}

export const config = {
  matcher: '/((?!_next).*)',
  // matcher: '/((?!api|_next/static|_next/image|img/|favicon.ico).*)',
};
