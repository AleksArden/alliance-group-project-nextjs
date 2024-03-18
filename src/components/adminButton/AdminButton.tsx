'use client';

import { useRouter } from 'next/navigation';
import styles from './AdminButton.module.scss';
import { logout } from '@/firebase/logout';

interface IProps {
  title: string;
  onClickLogout?: boolean;
  onClickGoToSite?: boolean;
  btnGoToSite?: boolean;
  btnLogout?: boolean;
  otherBtn?: boolean;
  onClick?: () => void;
  style?: {
    width?: number;
    height?: number;
    fontSize?: number;
  };
  disabled?: boolean;
  whiteBtn?: boolean;
}

const AdminButton = ({
  title,
  onClickLogout = false,
  onClickGoToSite = false,
  btnGoToSite = false,
  btnLogout = false,
  otherBtn = false,
  onClick,
  style,
  disabled,
  whiteBtn = false,
}: IProps) => {
  const router = useRouter();
  const handleClickLogout = () => {
    logout();
  };
  const handleClickGoToSite = () => {
    router.push('/');
  };
  return (
    <>
      {onClickLogout && (
        <button
          className={styles.button}
          type="button"
          onClick={handleClickLogout}
        >
          {title}
        </button>
      )}
      {onClickGoToSite && (
        <button
          className={styles.button}
          type="button"
          onClick={handleClickGoToSite}
        >
          {title}
        </button>
      )}
      {btnLogout && (
        <button
          className={styles.button}
          type="button"
          onClick={handleClickLogout}
        >
          {title}
        </button>
      )}
      {btnGoToSite && (
        <button
          className={styles.button}
          type="button"
          onClick={handleClickGoToSite}
        >
          {title}
        </button>
      )}
      {otherBtn && (
        <button
          className={whiteBtn ? styles.whiteButton : styles.button}
          type="button"
          onClick={onClick}
          style={style}
          disabled={disabled}
        >
          {title}
        </button>
      )}
    </>
  );
};
export default AdminButton;
