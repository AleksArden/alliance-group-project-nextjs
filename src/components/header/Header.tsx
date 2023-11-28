import NavBar from '../navBar/NavBar';
import Social from 'components/social/Social';

import styles from './Header.module.scss';
import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';

const Header = ({ locale }: { locale: string }) => {
  return (
    <header className={styles.container}>
      <Social />
      <NavBar locale={locale} />
      <LocaleSwitcher style="header" />
    </header>
  );
};
export default Header;
