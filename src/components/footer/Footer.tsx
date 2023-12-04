import styles from 'components/footer/footer.module.scss';
import Copyright from './copyright/Copyright';
import FooterNavigation from './footerNavigation/FooterNavigation';

const Footer = ({ locale }: { locale: string }) => {
  return (
    <footer>
      <div className={styles.footer}>
        <FooterNavigation locale={locale} />
      </div>
      <Copyright />
    </footer>
  );
};
export default Footer;
