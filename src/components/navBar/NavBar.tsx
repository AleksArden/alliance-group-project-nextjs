'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from 'helpers/navigation';
import styles from 'components/navBar/navBar.module.scss';

const NavBar = ({ color }: { color?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {navItems.map(({ id, href, label }) => {
        const isActive = pathname === href;
        if (label === '') {
          return <Link key={id} href={href} className={styles.logo}></Link>;
        }
        return (
          <Link
            key={id}
            style={{ color: color }}
            className={isActive ? styles.active : styles.link}
            href={href}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
export default NavBar;
