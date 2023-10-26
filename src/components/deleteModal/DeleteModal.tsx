'use client';

import { Modal } from 'components/Modal/Modal';

import styles from './DeleteModal.module.scss';
import { deleteData } from '@/firebase/deleteData';
import { useRouter } from 'next/navigation';

interface IProps {
  id: string;
  nameCollection: string;
  route: string;
}

const DeleteModal = ({ id, nameCollection, route }: IProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteData(nameCollection, id);
    router.replace(`/admin/${route}`, {
      scroll: false,
    });
  };
  return (
    <Modal isCloseBtn={false} route={route}>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleDelete} type="button">
          Видалити
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            router.replace(`/admin/${route}`, {
              scroll: false,
            })
          }
        >
          Скасувати
        </button>
      </div>
    </Modal>
  );
};
export default DeleteModal;
