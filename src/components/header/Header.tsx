import NavBar from '../navBar/NavBar';
import Social from 'components/social/Social';
import Lang from 'components/lang/Lang';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.container}>
      <Social />
      <NavBar />
      <Lang style="header" />
    </header>
  );
};
export default Header;
