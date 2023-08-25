import styles from './Social.module.scss';

const Social = () => {
  return (
    <div className={styles.socialContainer}>
      <a
        href={'https://t.me/AleksArden'}
        target="_blank"
        className={styles.circle}
      >
        <div className={styles.telegram}></div>
      </a>
      <a
        href={
          'https://instagram.com/pilo_alliancegroup?igshid=MzRlODBiNWFlZA=='
        }
        target="_blank"
        className={styles.circle}
      >
        <div className={styles.instagram}></div>
      </a>
      <a
        href={'https://www.facebook.com/profile.php?id=100004227397887'}
        target="_blank"
        className={styles.circle}
      >
        <div className={styles.facebook}></div>
      </a>
    </div>
  );
};
export default Social;
