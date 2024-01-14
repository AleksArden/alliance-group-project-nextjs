'use client';

import { Modal } from 'components/Modal/Modal';

import styles from './DeleteModal.module.scss';

import { useRouter } from 'next/navigation';
import { GalleryImageURLType } from 'types/dataTypeForFirebase';

interface IProps {
  handleDelete: (
    id: number,
    productName: string,
    galleryImagesURL?: GalleryImageURLType[]
  ) => void;
  galleryImagesURL?: GalleryImageURLType[];
  adminRoute: string;
  id: number;
  productName: string;
  isLoading: boolean;
}

const DeleteModal = ({
  handleDelete,
  adminRoute,
  galleryImagesURL,
  id,
  productName,
  isLoading,
}: IProps) => {
  const router = useRouter();
  return (
    <Modal isCloseBtn={false} adminRoute={adminRoute}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            handleDelete(id, productName, galleryImagesURL);
            router.replace(`/admin/${adminRoute}`, {
              scroll: false,
            });
          }}
          type="button"
          disabled={isLoading ? true : false}
        >
          {isLoading ? 'Видаляємо' : 'Видалити'}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            router.replace(`/admin/${adminRoute}`, {
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
