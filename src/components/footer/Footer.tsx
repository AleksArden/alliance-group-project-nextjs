import styles from 'components/footer/footer.module.scss';
import Copyright from './copyright/Copyright';
import FooterNavigation from './footerNavigation/FooterNavigation';

const Footer = ({ color }: { color?: string }) => {
  return (
    <footer>
      <div className={styles.footer}>
        <FooterNavigation />
      </div>
      <Copyright color={color} />
    </footer>
  );
};
export default Footer;
