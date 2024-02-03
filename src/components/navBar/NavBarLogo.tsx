'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from 'components/navBar/navBar.module.scss';

interface IPops {
  isVisibleHeaderMenu: boolean;
  onToggle: () => void;
}

const NavBarLogo = ({ isVisibleHeaderMenu, onToggle }: IPops) => {
  const pathname = usePathname();

  return (
    <nav className={styles.navTablet}>
      {isVisibleHeaderMenu ? (
        <Link href={'/'} className={styles.logo} onClick={onToggle}></Link>
      ) : (
        <Link href={'/'} className={styles.logo}></Link>
      )}
    </nav>
  );
};
export default NavBarLogo;
