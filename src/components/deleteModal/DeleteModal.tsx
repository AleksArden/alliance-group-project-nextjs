'use client';

import { Modal } from 'components/Modal/Modal';

import styles from './DeleteModal.module.scss';

import { useRouter } from 'next/navigation';

interface IProps {
  handleDelete: (id: string, imageName: string) => void;
  route: string;
  id: string;
  imageName: string;
}

const DeleteModal = ({ handleDelete, route, id, imageName }: IProps) => {
  const router = useRouter();
  return (
    <Modal isCloseBtn={false} route={route}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            handleDelete(id, imageName);
            router.replace('/admin/services', {
              scroll: false,
            });
          }}
          type="button"
        >
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
