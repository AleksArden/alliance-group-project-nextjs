'use client';

import Link from 'next/link';
import styles from './LocaleSwitcher.module.scss';
import { i18n } from '../../../i18n-config';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
interface IProps {
  style: string;
  locale: string;
}

const LocaleSwitcher = ({ style, locale }: IProps) => {
  const [pageName, setPageName] = useState('');
  const { locales, defaultLocale } = i18n;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(`/${locale}`)) {
      setPageName(pathname.slice(4));
    } else {
      setPageName(pathname.slice(1));
    }
  }, [locale, pathname]);

  return (
    <ul
      className={
        style === 'header' ? styles.langContainer : styles.footerLangContainer
      }
    >
      <Link
        href={`/${pageName}`}
        className={
          locale === defaultLocale
            ? style === 'header'
              ? styles.activeHeader
              : styles.activeFooter
            : style === 'header'
            ? styles.circle
            : styles.footerCircle
        }
      >
        {defaultLocale}
      </Link>

      {[...locales].map(locale => {
        if (locale !== defaultLocale) {
          const isActive =
            pathname === `/${locale}/${pageName}` || pathname === `/${locale}`;

          return (
            <Link
              key={locale}
              href={`/${locale}/${pageName}`}
              className={
                isActive
                  ? style === 'header'
                    ? styles.activeHeader
                    : styles.activeFooter
                  : style === 'header'
                  ? styles.circle
                  : styles.footerCircle
              }
            >
              {locale}
            </Link>
          );
        }
      })}
    </ul>
  );
};
export default LocaleSwitcher;
