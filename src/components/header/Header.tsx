import NavBar from '../navBar/NavBar';
import Social from 'components/social/Social';

import styles from './Header.module.scss';
import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import MenuButton from 'components/menuButton/MenuButton';
import HeaderMenu from 'components/headerMenu/HeaderMenu';

const Header = ({ locale }: { locale: string }) => {
  return (
    <header className={styles.container}>
      <Social />
      <NavBar locale={locale} />
      <LocaleSwitcher style="header" locale={locale} />
      <MenuButton locale={locale} />
      {/* <HeaderMenu /> */}
    </header>
  );
};
export default Header;
