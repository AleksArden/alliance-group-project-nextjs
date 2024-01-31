'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from 'components/navBar/NavBar.module.scss';
import { useEffect, useState } from 'react';
import { Lang, NavItemType } from 'types/otherType';
import { navItemsEN, navItemsTR, navItemsUK } from 'helpers/navigation';

const NavBar = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<NavItemType[]>();

  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNavItems(navItemsUK);
        break;
      case Lang.EN:
        setNavItems(navItemsEN);
        break;
      default:
        setNavItems(navItemsTR);
        break;
    }
  }, [locale]);

  return (
    <nav className={styles.nav}>
      {navItems?.map(({ id, href, label }) => {
        const isActive = pathname === href;
        if (label === '') {
          return <Link key={id} href={href} className={styles.logo}></Link>;
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
