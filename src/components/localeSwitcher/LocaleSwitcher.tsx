'use client';

import Link from 'next/link';
import styles from './LocaleSwitcher.module.scss';
import { i18n } from '../../../i18n-config';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
interface IProps {
  style: string;
}

const LocaleSwitcher = ({ style }: IProps) => {
  const [pageName, setPageName] = useState('');
  const { locales, defaultLocale } = i18n;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/en') || pathname.startsWith('/tr')) {
      console.log('en or tr');
      setPageName(pathname.slice(4));
    } else {
      console.log('uk');
      setPageName(pathname.slice(1));
    }
  }, [pathname]);

  return (
    <ul
      className={
        style === 'header' ? styles.langContainer : styles.footerLangContainer
      }
    >
      {[...locales].map(locale => {
        const isActive =
          locale === defaultLocale
            ? pathname === '/' ||
              pathname === `/${pageName}` ||
              pathname === 'uk' ||
              pathname === ''
            : pathname === `/${locale}` ||
              pathname === `/${locale}/${pageName}`;

        return (
          <Link
            key={locale}
            href={
              locale === defaultLocale
                ? `/${pageName}`
                : `/${locale}/${pageName}`
            }
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
      })}
    </ul>
  );
};
export default LocaleSwitcher;
