import { ContactsType } from 'types/dataTypeForFirebase';
import styles from './Social.module.scss';

interface IProps {
  contacts: ContactsType | undefined;
  onToggle?: () => void;
}

const Social = ({ contacts, onToggle }: IProps) => {
  return (
    <ul className={styles.socialContainer}>
      <li className={styles.item}>
        <a
          href={`https://t.me/${contacts?.telegram.slice(1)}`}
          target="_blank"
          className={styles.circle}
          onClick={onToggle}
        >
          <div className={styles.telegram}></div>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={`https://instagram.com/${contacts?.instagram}`}
          target="_blank"
          className={styles.circle}
          onClick={onToggle}
        >
          <div className={styles.instagram}></div>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={`https://www.facebook.com/${contacts?.facebook}`}
          target="_blank"
          className={styles.circle}
          onClick={onToggle}
        >
          <div className={styles.facebook}></div>
        </a>
      </li>
    </ul>
  );
};
export default Social;
