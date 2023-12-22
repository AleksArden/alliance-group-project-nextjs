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
  console.log('locale', locale);
  const [pageName, setPageName] = useState('');
  // const { locales, defaultLocale } = i18n;
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/en') || pathname.startsWith('/tr')) {
      setPageName(pathname.slice(4));
    } else {
      setPageName(pathname.slice(1));
    }
  }, [pathname]);

  // const isActiveUK = pathname === '/' || pathname === `/${pageName}`;
  const isActiveEN = pathname === `/en/${pageName}` || pathname === '/en';
  const isActiveTR = pathname === `/tr/${pageName}` || pathname === '/tr';

  return (
    <ul
      className={
        style === 'header' ? styles.langContainer : styles.footerLangContainer
      }
    >
      <Link
        // key={locale}
        href={`/${pageName}`}
        className={
          locale === 'uk'
            ? style === 'header'
              ? styles.activeHeader
              : styles.activeFooter
            : style === 'header'
            ? styles.circle
            : styles.footerCircle
          //     || isActiveUK
          // ? style === 'header'
          //   ? styles.activeHeader
          //   : styles.activeFooter
          // : style === 'header'
          // ? styles.circle
          // : styles.footerCircle
        }
      >
        uk
      </Link>
      <Link
        // key={locale}
        href={`/en/${pageName}`}
        className={
          isActiveEN
            ? style === 'header'
              ? styles.activeHeader
              : styles.activeFooter
            : style === 'header'
            ? styles.circle
            : styles.footerCircle
        }
      >
        en
      </Link>
      <Link
        // key={locale}
        href={`/tr/${pageName}`}
        className={
          isActiveTR
            ? style === 'header'
              ? styles.activeHeader
              : styles.activeFooter
            : style === 'header'
            ? styles.circle
            : styles.footerCircle
        }
      >
        tr
      </Link>

      {/* {[...locales].map(locale => {
        // console.log('locale', locale);
        // console.log(
        //   'pathname with locale',
        //   pathname === `/${locale}/${pageName}`
        // );
        // console.log('pagename without locale', pathname === `/${pageName}`);

        return (
        
        );
      })} */}
    </ul>
  );
};
export default LocaleSwitcher;
