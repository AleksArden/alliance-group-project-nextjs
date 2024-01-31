'use client';

import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import styles from './HeaderMenu.module.scss';
import NavBarHeaderMenu from 'components/navBar/NavBarHeaderMenu';
import { ContactsType } from 'types/dataTypeForFirebase';

interface IProps {
  isVisible: boolean;
  onToggle: () => void;
  locale: string;
  contacts: ContactsType | undefined;
}

const HeaderMenu = ({ isVisible, onToggle, locale, contacts }: IProps) => {
  return (
    <div className={isVisible ? styles.visibleContainer : styles.container}>
      <LocaleSwitcher style="header" locale={locale} />
      <NavBarHeaderMenu locale={locale} />
      <div className={styles.contactsWrapper}>
        {contacts?.email && (
          <li className={styles.item}>
            <a className={styles.link} href={`mailto:${contacts.email}`}>
              {contacts.email}
              <div className={styles.circle}>
                <div className={styles.email}></div>
              </div>
            </a>
          </li>
        )}
        {contacts?.tel1 && (
          <li className={styles.item}>
            <a className={styles.link} href={`tel:${contacts.tel1}`}>
              {contacts.tel1}
              <div className={styles.circle}>
                <div className={styles.phone}></div>
              </div>
            </a>
          </li>
        )}
        {contacts?.tel2 && (
          <li className={styles.item}>
            <a className={styles.link} href={`tel:${contacts.tel2}`}>
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
