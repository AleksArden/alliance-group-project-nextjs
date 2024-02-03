'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from 'components/navBar/navBar.module.scss';
import { useEffect, useState } from 'react';
import { Lang, NavItemType } from 'types/otherType';
import { navItemsEN, navItemsTR, navItemsUK } from 'helpers/navigation';

interface IProps {
  locale: string;
  onToggle: () => void;
}

const NavBarHeaderMenu = ({ locale, onToggle }: IProps) => {
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
          return;
        }
        return (
          <Link
            key={id}
            className={isActive ? styles.active : styles.link}
            href={href}
            onClick={onToggle}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
export default NavBarHeaderMenu;
