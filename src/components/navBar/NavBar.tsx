'use client';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from 'helpers/navigation';
import styles from 'components/navBar/navBar.module.scss';
import LangContainerForClientComponent from 'components/langContainerForClientComponent/LangContainerForClientComponent';

const NavBar = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
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
    <LangContainerForClientComponent locale={locale}>
      <div>
        <nav className={styles.nav}>
          <Link
            className={isActiveAboutUs ? styles.active : styles.link}
            href={locale ? `/${locale}/about-us` : '/about-us'}
          >
            {<FormattedMessage id="navBar.aboutCompany" />}
          </Link>
          <Link
            className={isActiveGallery ? styles.active : styles.link}
            href={locale ? `/${locale}/gallery` : '/gallery'}
          >
            {<FormattedMessage id="navBar.gallery" />}
          </Link>

          <Link
            href={locale ? `/${locale}/` : '/'}
            className={styles.logo}
          ></Link>
          <Link
            className={isActiveProductsServices ? styles.active : styles.link}
            href={
              locale ? `/${locale}/products-services` : '/products-services'
            }
          >
            {<FormattedMessage id="navBar.products-services" />}
          </Link>

          <Link
            className={isActiveContacts ? styles.active : styles.link}
            href={locale ? `/${locale}/contacts` : '/contacts'}
          >
            {<FormattedMessage id="navBar.contacts" />}
          </Link>

          {/* {navItems.map(({ id, href, label }) => {
            console.log('route', `/${locale}/${href}`);
            const isActive = pathname === href;
            if (label === '') {
              return <Link key={id} href={href} className={styles.logo}></Link>;
            }
            return (
              <Link
                key={id}
                className={isActive ? styles.active : styles.link}
                href={href}
              >
                {label}
              </Link>
            );
          })} */}
        </nav>
      </div>
    </LangContainerForClientComponent>
  );
};
export default NavBar;
