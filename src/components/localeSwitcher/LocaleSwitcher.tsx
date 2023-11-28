import Link from 'next/link';
import styles from './LocaleSwitcher.module.scss';
import { i18n } from '../../../i18n-config';
interface IProps {
  style: string;
}

const LocaleSwitcher = ({ style }: IProps) => {
  const { locales, defaultLocale } = i18n;
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
          href={locale === defaultLocale ? '/' : `/${locale}`}
          className={style === 'header' ? styles.circle : styles.footerCircle}
        >
          {locale}
        </Link>
      ))}
    </ul>
  );
};
export default LocaleSwitcher;
