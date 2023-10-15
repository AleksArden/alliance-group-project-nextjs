'use client';

import { Modal } from 'components/Modal/Modal';
import Link from 'next/link';
import styles from './StaffDeleteModal.module.scss';
import { deleteStaff } from '@/firebase/deleteData';
import { useRouter } from 'next/navigation';

interface IProps {
  orderStaff: string;
}

const StaffDeleteModal = ({ orderStaff }: IProps) => {
  const router = useRouter();
  const handleDeleteStaff = async () => {
    await deleteStaff(orderStaff);
    router.back;
  };
  return (
    <Modal isCloseBtn={false} route="staff-list">
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={handleDeleteStaff}
          type="button"
        >
          Видалити
        </button>
        <Link className={styles.button} href={'/admin/staff-list'}>
          Скасувати
        </Link>
      </div>
    </Modal>
  );
};
export default StaffDeleteModal;
