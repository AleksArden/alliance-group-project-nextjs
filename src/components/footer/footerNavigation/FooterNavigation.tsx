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

const FooterNavigation = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const [navItemsFirst, setNavItemsFirst] = useState<NavItemType[]>();
  const [navItemsSecond, setNavItemsFirstSecond] = useState<NavItemType[]>();
  const [isDesktopScreen, isTabletScreen] = useIsWideScreen();
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
    <>
      {isDesktopScreen && (
        <ul className={styles.container}>
          <li className={styles.footerBlock}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a
                  className={styles.link}
                  href="mailto:alliance_media@gmail.com"
                >
                  <div className={styles.circle}>
                    <div className={styles.email}></div>
                  </div>
                  alliance_media@gmail.com
                </a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="tel:+380635318539">
                  <div className={styles.circle}>
                    <div className={styles.phone}></div>
                  </div>
                  +380635318539
                </a>
              </li>
              <li className={styles.item}>
                <a className={styles.link} href="tel:+380939998877">
                  <div className={styles.circle}>
                    <div className={styles.phone}></div>
                  </div>
                  +380939998877
                </a>
              </li>
            </ul>
          </li>
          <li className={styles.footerBlock}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <a
                  className={styles.link}
                  href={'https://t.me/AleksArden'}
                  target="_blank"
                >
                  <div className={styles.circle}>
                    <div className={styles.telegram}></div>
                  </div>
                  @alliance_media
                </a>
              </li>
              <li className={styles.item}>
                <a
                  className={styles.link}
                  href={
                    'https://www.facebook.com/profile.php?id=100004227397887'
                  }
                  target="_blank"
                >
                  <div className={styles.circle}>
                    <div className={styles.facebook}></div>
                  </div>
                  facebook.com
                </a>
              </li>
              <li className={styles.item}>
                <a
                  className={styles.link}
                  href={
                    'https://instagram.com/pilo_alliancegroup?igshid=MzRlODBiNWFlZA=='
                  }
                  target="_blank"
                >
                  <div className={styles.circle}>
                    <div className={styles.instagram}></div>
                  </div>
                  pilo_alliancegroup
                </a>
              </li>
            </ul>
          </li>
          <li className={styles.footerBlock}>
            <Link href={'/'} className={styles.logo}></Link>
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
      {isTabletScreen && (
        <div className={styles.container}>
          <ul className={styles.firstFooterList}>
            <li className={styles.footerBlock}>
              <Link href={'/'} className={styles.logo}></Link>
            </li>
            <li className={styles.footerBlock}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <a
                    className={styles.link}
                    href="mailto:alliance_media@gmail.com"
                  >
                    <div className={styles.circle}>
                      <div className={styles.email}></div>
                    </div>
                    alliance_media@gmail.com
                  </a>
                </li>
                <li className={styles.item}>
                  <a className={styles.link} href="tel:+380635318539">
                    <div className={styles.circle}>
                      <div className={styles.phone}></div>
                    </div>
                    +380635318539
                  </a>
                </li>
                <li className={styles.item}>
                  <a className={styles.link} href="tel:+380939998877">
                    <div className={styles.circle}>
                      <div className={styles.phone}></div>
                    </div>
                    +380939998877
                  </a>
                </li>
              </ul>
            </li>
            <li className={styles.footerBlock}>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <a
                    className={styles.link}
                    href={'https://t.me/AleksArden'}
                    target="_blank"
                  >
                    <div className={styles.circle}>
                      <div className={styles.telegram}></div>
                    </div>
                    @alliance_media
                  </a>
                </li>
                <li className={styles.item}>
                  <a
                    className={styles.link}
                    href={
                      'https://www.facebook.com/profile.php?id=100004227397887'
                    }
                    target="_blank"
                  >
                    <div className={styles.circle}>
                      <div className={styles.facebook}></div>
                    </div>
                    facebook.com
                  </a>
                </li>
                <li className={styles.item}>
                  <a
                    className={styles.link}
                    href={
                      'https://instagram.com/pilo_alliancegroup?igshid=MzRlODBiNWFlZA=='
                    }
                    target="_blank"
                  >
                    <div className={styles.circle}>
                      <div className={styles.instagram}></div>
                    </div>
                    pilo_alliancegroup
                  </a>
                </li>
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
        </div>
      )}
    </>
  );
};
export default FooterNavigation;
