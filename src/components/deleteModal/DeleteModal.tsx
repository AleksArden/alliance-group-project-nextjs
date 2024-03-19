'use client';

import { Modal } from 'components/Modal/Modal';

import styles from './DeleteModal.module.scss';

import { useRouter } from 'next/navigation';
import { GalleryImageURLType } from 'types/dataTypeForFirebase';
import AdminButton from 'components/adminButton/AdminButton';

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
        <AdminButton
          btnName={isLoading ? 'Видаляємо' : 'Видалити'}
          onClick={
            galleryImagesURL
              ? () => {
                  handleDelete(id, productName, galleryImagesURL);
                  router.replace(`/admin/${adminRoute}`, {
                    scroll: false,
                  });
                }
              : () => {
                  handleDelete(id, productName);
                  router.replace(`/admin/${adminRoute}`, {
                    scroll: false,
                  });
                }
          }
          disabled={isLoading ? true : false}
        />
        <AdminButton
          btnName="Повернутись"
          onClick={() => {
            router.replace(`/admin/${adminRoute}`, {
              scroll: false,
            });
          }}
          whiteBtn={true}
        />
      </div>
    </Modal>
  );
};
export default DeleteModal;
