'use client';

import { FormattedMessage } from 'react-intl';
import { usePathname } from 'next/navigation';
import { navItemsFooterFirst, navItemsFooterSecond } from 'helpers/navigation';
import Link from 'next/link';

import styles from './FooterNavigation.module.scss';

import LocaleSwitcher from 'components/localeSwitcher/LocaleSwitcher';
import LangContainerForClientComponent from 'components/langContainerForClientComponent/LangContainerForClientComponent';

const FooterNavigation = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  const isMain = pathname === '/' || pathname === `/${locale}`;
  const isActiveAboutUs =
    pathname === '/about-us' || pathname === `/${locale}/about-us`;
  const isActiveGallery =
    pathname === '/gallery' || pathname === `/${locale}/gallery`;
  const isActiveProductsServices =
    pathname === '/products-services' ||
    pathname === `/${locale}/products-services`;
  const isActiveContacts =
    pathname === '/contacts' || pathname === `/${locale}/contacts`;
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
            <LangContainerForClientComponent locale={locale}>
              <div>
                {/* {navItemsFooterFirst.map(({ id, href, label }) => {
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
            })} */}
                <li className={styles.navItem}>
                  <Link
                    className={isMain ? styles.active : styles.navLink}
                    href={locale ? `/${locale}` : '/'}
                  >
                    {<FormattedMessage id="navBar.main" />}
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    className={isActiveAboutUs ? styles.active : styles.navLink}
                    href={locale ? `/${locale}/about-us` : '/about-us'}
                  >
                    {<FormattedMessage id="navBar.aboutCompany" />}
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    className={isActiveGallery ? styles.active : styles.navLink}
                    href={locale ? `/${locale}/gallery` : '/gallery'}
                  >
                    {<FormattedMessage id="navBar.gallery" />}
                  </Link>
                </li>
              </div>
            </LangContainerForClientComponent>
          </ul>
        </nav>
      </li>
      <li className={styles.footerBlock}>
        <nav>
          <ul className={styles.list}>
            <LangContainerForClientComponent locale={locale}>
              <div>
                {/* {navItemsFooterSecond.map(({ id, href, label }) => {
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
            })} */}

                <li className={styles.navItem}>
                  <Link
                    className={
                      isActiveProductsServices ? styles.active : styles.navLink
                    }
                    href={
                      locale
                        ? `/${locale}/products-services`
                        : '/products-services'
                    }
                  >
                    {<FormattedMessage id="navBar.products-services" />}
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    className={
                      isActiveContacts ? styles.active : styles.navLink
                    }
                    href={locale ? `/${locale}/contacts` : '/contacts'}
                  >
                    {<FormattedMessage id="navBar.contacts" />}
                  </Link>
                </li>
                <li>
                  <LocaleSwitcher style="footer" locale={locale} />
                </li>
              </div>
            </LangContainerForClientComponent>
          </ul>
        </nav>
      </li>
    </ul>
  );
};
export default FooterNavigation;
