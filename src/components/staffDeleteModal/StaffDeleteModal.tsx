'use client';

import { Modal } from 'components/Modal/Modal';
import Link from 'next/link';
import styles from './StaffDeleteModal.module.scss';
import { deleteStaff } from '@/firebase/deleteData';
import { useRouter } from 'next/navigation';

interface IProps {
  id: string;
}

const StaffDeleteModal = ({ id }: IProps) => {
  console.log('modal', id);
  const router = useRouter();
  const handleDeleteStaff = async () => {
    await deleteStaff(id);
    router.push('/admin/staff-list');
  };
  return (
    <Modal isCloseBtn={false}>
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
