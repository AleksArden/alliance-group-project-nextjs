import styles from './Social.module.scss';

const Social = () => {
  return (
    <ul className={styles.socialContainer}>
      <li className={styles.item}>
        <a
          href={'https://t.me/AleksArden'}
          target="_blank"
          className={styles.circle}
        >
          <div className={styles.telegram}></div>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={
            'https://instagram.com/pilo_alliancegroup?igshid=MzRlODBiNWFlZA=='
          }
          target="_blank"
          className={styles.circle}
        >
          <div className={styles.instagram}></div>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={'https://www.facebook.com/profile.php?id=100004227397887'}
          target="_blank"
          className={styles.circle}
        >
          <div className={styles.facebook}></div>
        </a>
      </li>
    </ul>
  );
};
export default Social;
