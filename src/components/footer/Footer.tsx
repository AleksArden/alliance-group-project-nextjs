import styles from './Footer.module.scss';
import Copyright from './copyright/Copyright';
import FooterNavigation from './footerNavigation/FooterNavigation';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <FooterNavigation />
      </div>
      <Copyright />
    </footer>
  );
};
export default Footer;
