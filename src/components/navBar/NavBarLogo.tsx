'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from '../../components/navBar/NavBar.module.scss';

const NavBarLogo = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navTablet}>
      <Link href={'/'} className={styles.logo}></Link>
    </nav>
  );
};
export default NavBarLogo;
