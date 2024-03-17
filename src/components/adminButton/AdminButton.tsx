'use client';

import { useRouter } from 'next/navigation';
import styles from './AdminButton.module.scss';
import { logout } from '@/firebase/logout';

interface IProps {
  title: string;
  onClickLogout?: boolean;
  onClickGoToSite?: boolean;
}

const AdminButton = ({
  title,
  onClickLogout = false,
  onClickGoToSite = false,
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
    </>
  );
};
export default AdminButton;
