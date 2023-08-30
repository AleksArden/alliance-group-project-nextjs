'use client';

import { usePathname } from 'next/navigation';
import { navItemsFooterFirst, navItemsFooterSecond } from 'helpers/navigation';
import Link from 'next/link';

import styles from './FooterNavigation.module.scss';
import Lang from 'components/lang/Lang';

const FooterNavigation = () => {
  const pathname = usePathname();
  return (
    <ul className={styles.container}>
      <li className={styles.footerBlock}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a className={styles.link} href="mailto:alliance_media@gmail.com">
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
              href={'https://www.facebook.com/profile.php?id=100004227397887'}
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
                <div className={styles.phone}></div>
              </div>
              pilo_alliancegroup
            </a>
          </li>
        </ul>
      </li>
      <li className={styles.footerBlock}>
        <a href={'/'} className={styles.logo}></a>
      </li>
      <li className={styles.footerBlock}>
        <nav>
          <ul className={styles.list}>
            {navItemsFooterFirst.map(({ id, href, label }) => {
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
            {navItemsFooterSecond.map(({ id, href, label }) => {
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
              <Lang style="footer" />
            </li>
          </ul>
        </nav>
      </li>
    </ul>
  );
};
export default FooterNavigation;
