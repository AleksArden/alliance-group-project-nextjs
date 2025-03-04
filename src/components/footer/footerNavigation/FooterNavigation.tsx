'use client';

import { usePathname } from 'next/navigation';
import {
  navItemsFooterFirstEN,
  navItemsFooterFirstTR,
  navItemsFooterFirstUK,
  navItemsFooterSecondEN,
  navItemsFooterSecondTR,
  navItemsFooterSecondUK,
} from 'helpers/navigation';
import Link from 'next/link';

import styles from './FooterNavigation.module.scss';

import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import { useEffect, useState } from 'react';
import { Lang, NavItemType } from 'types/otherType';
import { useIsWideScreen } from 'hooks/useIsWideScreen';
import { ContactsType } from 'types/dataTypeForFirebase';

interface IProps {
  locale: string;
  contacts: ContactsType | undefined;
}

const FooterNavigation = ({ locale, contacts }: IProps) => {
  const pathname = usePathname();
  const [navItemsFirst, setNavItemsFirst] = useState<NavItemType[]>();
  const [navItemsSecond, setNavItemsFirstSecond] = useState<NavItemType[]>();
  const [isDesktopScreen, isTabletScreen, isMobileScreen] = useIsWideScreen();
  useEffect(() => {
    switch (locale) {
      case Lang.UK:
        setNavItemsFirst(navItemsFooterFirstUK);
        setNavItemsFirstSecond(navItemsFooterSecondUK);
        break;
      case Lang.EN:
        setNavItemsFirst(navItemsFooterFirstEN);
        setNavItemsFirstSecond(navItemsFooterSecondEN);
        break;
      default:
        setNavItemsFirst(navItemsFooterFirstTR);
        setNavItemsFirstSecond(navItemsFooterSecondTR);
        break;
    }
  }, [locale]);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        {isDesktopScreen && (
          <ul className={styles.footerContainer}>
            <li className={styles.footerBlock}>
              <ul className={styles.list}>
                {contacts?.email && (
                  <li className={styles.item}>
                    <a
                      className={styles.link}
                      href={`mailto:${contacts.email}`}
                    >
                      <div className={styles.circle}>
                        <div className={styles.email}></div>
                      </div>
                      {contacts?.email}
                    </a>
                  </li>
                )}
                {contacts?.tel1 && (
                  <li className={styles.item}>
                    <a className={styles.link} href={`tel:${contacts.tel1}`}>
                      <div className={styles.circle}>
                        <div className={styles.phone}></div>
                      </div>
                      {contacts.tel1}
                    </a>
                  </li>
                )}
                {contacts?.tel2 && (
                  <li className={styles.item}>
                    <a className={styles.link} href={`tel:${contacts.tel2}`}>
                      <div className={styles.circle}>
                        <div className={styles.phone}></div>
                      </div>
                      {contacts.tel2}
                    </a>
                  </li>
                )}
                <div className={styles.privacyPolicy}>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
              </ul>
            </li>
            <li className={styles.footerBlock}>
              <ul className={styles.list}>
                {contacts?.telegram && (
                  <li className={styles.item}>
                    <a
                      className={styles.link}
                      href={`https://t.me/${contacts?.telegram.slice(1)}`}
                      target="_blank"
                    >
                      <div className={styles.circle}>
                        <div className={styles.telegram}></div>
                      </div>
                      {contacts.telegram}
                    </a>
                  </li>
                )}
                {contacts?.facebook && (
                  <li className={styles.item}>
                    <a
                      className={styles.link}
                      href={`https://www.facebook.com/${contacts?.facebook}`}
                      target="_blank"
                    >
                      <div className={styles.circle}>
                        <div className={styles.facebook}></div>
                      </div>
                      {contacts.facebook}
                    </a>
                  </li>
                )}
                {contacts?.instagram && (
                  <li className={styles.item}>
                    <a
                      className={styles.link}
                      href={`https://instagram.com/${contacts?.instagram}`}
                      target="_blank"
                    >
                      <div className={styles.circle}>
                        <div className={styles.instagram}></div>
                      </div>
                      {contacts.instagram}
                    </a>
                  </li>
                )}
              </ul>
            </li>
            <li className={styles.footerBlock}>
              <Link href={`/${locale}`} className={styles.logo}></Link>
            </li>
            <li className={styles.footerBlock}>
              <nav>
                <ul className={styles.list}>
                  {navItemsFirst?.map(({ id, href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <li className={styles.navItem} key={id}>
                        <Link
                          href={href}
                          className={isActive ? styles.active : styles.navLink}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </li>
            <li className={styles.footerBlock}>
              <nav>
                <ul className={styles.list}>
                  {navItemsSecond?.map(({ id, href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <li className={styles.navItem} key={id}>
                        <Link
                          href={href}
                          className={isActive ? styles.active : styles.navLink}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}

                  <li>
                    <LocaleSwitcher style="footer" locale={locale} />
                  </li>
                </ul>
              </nav>
            </li>
          </ul>
        )}
        {(isTabletScreen || isMobileScreen) && (
          <div className={styles.footerContainer}>
            <ul className={styles.firstFooterList}>
              <li className={styles.footerBlockFirst}>
                <div className={styles.logoWrapper}>
                  <Link href={`/${locale}`} className={styles.logo}></Link>
                </div>
              </li>
              <li className={styles.footerBlockFirst}>
                <ul className={styles.list}>
                  {contacts?.email && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`mailto:${contacts.email}`}
                      >
                        <div className={styles.circle}>
                          <div className={styles.email}></div>
                        </div>
                        {contacts.email}
                      </a>
                    </li>
                  )}
                  {contacts?.tel1 && (
                    <li className={styles.item}>
                      <a className={styles.link} href={`tel:${contacts.tel1}`}>
                        <div className={styles.circle}>
                          <div className={styles.phone}></div>
                        </div>
                        {contacts.tel1}
                      </a>
                    </li>
                  )}
                  {contacts?.tel2 && (
                    <li className={styles.item}>
                      <a className={styles.link} href={`tel:${contacts.tel2}`}>
                        <div className={styles.circle}>
                          <div className={styles.phone}></div>
                        </div>
                        {contacts.tel2}
                      </a>
                    </li>
                  )}
                </ul>
              </li>
              <li className={styles.footerBlockFirst}>
                <ul className={styles.list}>
                  {contacts?.telegram && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://t.me/${contacts?.telegram.slice(1)}`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.telegram}></div>
                        </div>
                        {contacts.telegram}
                      </a>
                    </li>
                  )}
                  {contacts?.facebook && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://www.facebook.com/${contacts?.facebook}`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.facebook}></div>
                        </div>
                        {contacts.facebook}
                      </a>
                    </li>
                  )}
                  {contacts?.instagram && (
                    <li className={styles.item}>
                      <a
                        className={styles.link}
                        href={`https://instagram.com/${contacts?.instagram}`}
                        target="_blank"
                      >
                        <div className={styles.circle}>
                          <div className={styles.instagram}></div>
                        </div>
                        {contacts.instagram}
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>

            <ul className={styles.secondFooterList}>
              <li className={styles.footerBlock}>
                <nav>
                  <ul className={styles.list}>
                    {navItemsFirst?.map(({ id, href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <li className={styles.navItem} key={id}>
                          <Link
                            href={href}
                            className={
                              isActive ? styles.active : styles.navLink
                            }
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </li>

              <li className={styles.footerBlock}>
                <nav>
                  <ul className={styles.list}>
                    {navItemsSecond?.map(({ id, href, label }) => {
                      const isActive = pathname === href;
                      return (
                        <li className={styles.navItem} key={id}>
                          <Link
                            href={href}
                            className={
                              isActive ? styles.active : styles.navLink
                            }
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <LocaleSwitcher style="footer" locale={locale} />
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
            <div className={styles.privacyPolicy}>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FooterNavigation;
