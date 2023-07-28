'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLink } from 'types/navBarType';

import Image from 'next/image';
import styles from './NavBar.module.scss';
import logo from 'public/logo/Alliance Group logo_png.png';
import { navItems } from 'helpers/navigation';

const NavBar = () => {
  const pathname = usePathname();
  // const isActive = pathname === '/contacts';

  return (
    <nav className={styles.nav}>
      {navItems.map(({ id, href, label }) => {
        const isActive = pathname === href;
        if (label === '') {
          return (
            <Link key={id} href={href}>
              <Image
                src={logo}
                width="98"
                height="80"
                alt="logo company"
                priority={true}
              />
            </Link>
          );
        }
        return (
          <Link
            key={id}
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
