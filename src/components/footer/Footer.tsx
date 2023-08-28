import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}></div>
      <div className={styles.copyright}>
        <p className={styles.text}>2023 © alliance group llc</p>
        <p className={styles.text}>Developed By: ALEKS chubenko</p>
      </div>
    </footer>
  );
};
export default Footer;
