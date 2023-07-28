import NavBar from '../navBar/NavBar';
import Social from 'components/social/Social';
import Lang from 'components/lang/Lang';

// import { navItems } from 'helpers/navigation';

import styles from './Header.module.scss';
import Link from 'next/link';
const Header = () => {
  return (
    <header className={styles.container}>
      <Social />
      <NavBar />
      <Lang />
    </header>
  );
};
export default Header;
