import styles from './Copyright.module.scss';

const Copyright = () => {
  return (
    <div className={styles.section}>
      <div className={styles.copyright}>
        <p className={styles.text}>2023 © alliance group llc</p>
        <p className={styles.text}>Developed By: aleks_arden chubenko</p>
      </div>
    </div>
  );
};
export default Copyright;
