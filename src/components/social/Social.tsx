import { ContactsType } from 'types/dataTypeForFirebase';
import styles from './Social.module.scss';

const Social = ({ contacts }: { contacts: ContactsType | undefined }) => {
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
          href={`https://instagram.com/${contacts?.instagram}`}
          target="_blank"
          className={styles.circle}
        >
          <div className={styles.instagram}></div>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={`https://www.facebook.com/${contacts?.facebook}`}
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
