'use client';

import Link from 'next/link';
import { navigation } from 'helpers/navigation';
import styles from './navBar.module.scss';

const NavBar = () => {
  return (
    <div className={styles.nav}>
      {navigation.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          {title}
        </Link>
      ))}
    </div>
  );
};
export default NavBar;
