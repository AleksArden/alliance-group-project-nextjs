'use client';

import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import styles from './HeaderMenu.module.scss';
import NavBarHeaderMenu from 'components/navBar/NavBarHeaderMenu';
import { ContactsType } from 'types/dataTypeForFirebase';
import { useIsWideScreen } from 'hooks/useIsWideScreen';
import Social from 'components/social/Social';

interface IProps {
  isVisible: boolean;
  onToggle: () => void;
  locale: string;
  contacts: ContactsType | undefined;
}

const HeaderMenu = ({ isVisible, onToggle, locale, contacts }: IProps) => {
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();

  return (
    <div className={isVisible ? styles.visibleContainer : styles.container}>
      <div>
        {isMobileScreen && <Social contacts={contacts} />}
        <LocaleSwitcher style="header" locale={locale} onToggle={onToggle} />
      </div>
      <NavBarHeaderMenu locale={locale} onToggle={onToggle} />
      <div className={styles.contactsWrapper}>
        {contacts?.email && (
          <li className={styles.item}>
            <a
              className={styles.link}
              href={`mailto:${contacts.email}`}
              onClick={onToggle}
            >
              {contacts.email}
              <div className={styles.circle}>
                <div className={styles.email}></div>
              </div>
            </a>
          </li>
        )}
        {contacts?.tel1 && (
          <li className={styles.item}>
            <a
              className={styles.link}
              href={`tel:${contacts.tel1}`}
              onClick={onToggle}
            >
              {contacts.tel1}
              <div className={styles.circle}>
                <div className={styles.phone}></div>
              </div>
            </a>
          </li>
        )}
        {contacts?.tel2 && (
          <li className={styles.item}>
            <a
              className={styles.link}
              href={`tel:${contacts.tel2}`}
              onClick={onToggle}
            >
              {contacts.tel2}
              <div className={styles.circle}>
                <div className={styles.phone}></div>
              </div>
            </a>
          </li>
        )}{' '}
      </div>
    </div>
  );
};
export default HeaderMenu;
