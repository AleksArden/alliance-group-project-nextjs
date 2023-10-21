import styles from './Copyright.module.scss';

const Copyright = ({ color }: { color?: string }) => {
  return (
    <div className={styles.copyright} style={{ background: color }}>
      <p className={styles.text}>2023 © alliance group llc</p>
      <p className={styles.text}>Developed By: ALEKS chubenko</p>
    </div>
  );
};
export default Copyright;
