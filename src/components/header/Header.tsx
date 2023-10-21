import NavBar from '../navBar/NavBar';
import Social from 'components/social/Social';
import Lang from 'components/lang/Lang';

import styles from './Header.module.scss';

const Header = ({ color }: { color?: string }) => {
  return (
    <header className={styles.container}>
      <Social />
      <NavBar color={color} />
      <Lang style="header" color={color} />
    </header>
  );
};
export default Header;
