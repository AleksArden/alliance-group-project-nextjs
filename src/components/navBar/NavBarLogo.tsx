import Link from 'next/link';

import styles from 'components/navBar/navBar.module.scss';

interface IPops {
  isVisibleHeaderMenu: boolean;
  onToggle: () => void;
  locale: string;
}

const NavBarLogo = ({ isVisibleHeaderMenu, onToggle, locale }: IPops) => {
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
