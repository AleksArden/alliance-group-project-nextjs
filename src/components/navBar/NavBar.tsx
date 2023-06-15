'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from 'types/types';

import styles from './NavBar.module.scss';

type Props = {
  navLinks: NavLink[];
};

const NavBar = ({ navLinks }: Props) => {
  const pathname = usePathname();
  return (
    <div className={styles.nav}>
      {navLinks.map(({ id, label, href }) => {
        const isActive = pathname === href;
        return (
          <Link key={id} href={href} className={isActive ? styles.active : ''}>
            {label}
          </Link>
        );
      })}
    </div>
  );
};
export default NavBar;
