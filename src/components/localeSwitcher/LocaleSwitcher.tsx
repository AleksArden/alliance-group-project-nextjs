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
    if (pathname.startsWith('/uk') || pathname.startsWith('/tr')) {
      setPageName(pathname.slice(4));
    } else {
      setPageName(pathname.slice(1));
    }
  }, [pathname]);

  console.log('pathname', pageName);
  // console.log('Switcher', locales);
  return (
    <ul
      className={
        style === 'header' ? styles.langContainer : styles.footerLangContainer
      }
    >
      {[...locales].map(locale => (
        <Link
          key={locale}
          href={
            locale === defaultLocale ? `/${pageName}` : `/${locale}/${pageName}`
          }
          className={style === 'header' ? styles.circle : styles.footerCircle}
        >
          {locale}
        </Link>
      ))}
    </ul>
  );
};
export default LocaleSwitcher;
