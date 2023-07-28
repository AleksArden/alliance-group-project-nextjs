import Link from 'next/link';
import styles from './Lang.module.scss';

const Lang = () => {
  return (
    <div className={styles.langContainer}>
      <Link className={styles.circle} href={''}>
        ua
      </Link>
      <Link className={styles.circle} href={''}>
        en
      </Link>
      <Link className={styles.circle} href={''}>
        tk
      </Link>
    </div>
  );
};
export default Lang;
