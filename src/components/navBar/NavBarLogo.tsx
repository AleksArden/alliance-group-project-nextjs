'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from 'components/navBar/navBar.module.scss';

interface IPops {
  isVisibleHeaderMenu: boolean;
  onToggle: () => void;
  locale: string;
}

const NavBarLogo = ({ isVisibleHeaderMenu, onToggle, locale }: IPops) => {
  const pathname = usePathname();

  return (
    <nav className={styles.navTablet}>
      {isVisibleHeaderMenu ? (
        <Link
          href={`/${locale}`}
          className={styles.logo}
          onClick={onToggle}
        ></Link>
      ) : (
        <Link href={`/${locale}`} className={styles.logo}></Link>
      )}
    </nav>
  );
};
export default NavBarLogo;
