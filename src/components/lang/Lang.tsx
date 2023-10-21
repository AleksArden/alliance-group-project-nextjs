import Link from 'next/link';
import styles from './Lang.module.scss';

interface IProps {
  style: string;
  color?: string;
}

const Lang = ({ style, color }: IProps) => {
  return (
    <ul
      className={
        style === 'header' ? styles.langContainer : styles.footerLangContainer
      }
    >
      <li>
        <Link
          style={{ color: color }}
          className={style === 'header' ? styles.circle : styles.footerCircle}
          href={'/'}
        >
          ua
        </Link>
      </li>
      <li>
        <Link
          style={{ color: color }}
          className={style === 'header' ? styles.circle : styles.footerCircle}
          href={'/'}
        >
          en
        </Link>
      </li>
      <li>
        <Link
          style={{ color: color }}
          className={style === 'header' ? styles.circle : styles.footerCircle}
          href={'/'}
        >
          tr
        </Link>
      </li>
    </ul>
  );
};
export default Lang;
