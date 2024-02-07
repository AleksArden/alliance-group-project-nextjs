'use client';

import Social from 'components/social/Social';

import styles from './HeaderMain.module.scss';
import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import MenuButton from 'components/menuButton/MenuButton';
import HeaderMenu from 'components/headerMenu/HeaderMenu';
import { useState } from 'react';
import { useIsWideScreen } from 'hooks/useIsWideScreen';
import NavBarLogo from 'components/navBar/NavBarLogo';
import NavBar from 'components/navBar/NavBar';
import { ContactsType } from 'types/dataTypeForFirebase';

interface IProps {
  locale: string;
  contacts: ContactsType | undefined;
}

const HeaderMain = ({ locale, contacts }: IProps) => {
  const [isVisibleHeaderMenu, setIsVisibleHeaderMenu] = useState(false);
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();

  const onToggle = () => {
    setIsVisibleHeaderMenu(!isVisibleHeaderMenu);
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {(isDesktopScreen || isTabletScreen) && (
              <Social contacts={contacts} />
            )}
            {isDesktopScreen && <NavBar locale={locale} />}
            {isDesktopScreen && (
              <LocaleSwitcher style="header" locale={locale} />
            )}
            {(isTabletScreen || isMobileScreen) && (
              <NavBarLogo
                onToggle={onToggle}
                isVisibleHeaderMenu={isVisibleHeaderMenu}
              />
            )}
            {(isTabletScreen || isMobileScreen) && (
              <MenuButton
                locale={locale}
                onToggle={onToggle}
                isVisibleHeaderMenu={isVisibleHeaderMenu}
              />
            )}
          </div>
        </div>
      </header>
      <HeaderMenu
        isVisible={isVisibleHeaderMenu}
        onToggle={onToggle}
        locale={locale}
        contacts={contacts}
      />
    </>
  );
};
export default HeaderMain;
