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
  const handleDeleteWithGalleryImages = () => {
    handleDelete(id, productName, galleryImagesURL);
    router.replace(`/admin/${adminRoute}`, {
      scroll: false,
    });
  };
  const handleDeleteWithoutGalleryImages = () => {
    handleDelete(id, productName);
    router.replace(`/admin/${adminRoute}`, {
      scroll: false,
    });
  };

  const handleClickComeBack = () => {
    router.replace(`/admin/${adminRoute}`, {
      scroll: false,
    });
  };

  return (
    <Modal isCloseBtn={false} adminRoute={adminRoute}>
      <div className={styles.container}>
        <AdminButton
          title={isLoading ? 'Видаляємо' : 'Видалити'}
          otherBtn={true}
          onClick={
            galleryImagesURL
              ? handleDeleteWithGalleryImages
              : handleDeleteWithoutGalleryImages
          }
          disabled={isLoading ? true : false}
        />
        <AdminButton
          title="Повернутись"
          otherBtn={true}
          onClick={handleClickComeBack}
          whiteBtn={true}
        />
        {/* {galleryImagesURL ? (
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
        ) : (
          <button
            className={styles.button}
            onClick={() => {
              handleDelete(id, productName);
              router.replace(`/admin/${adminRoute}`, {
                scroll: false,
              });
            }}
            type="button"
            disabled={isLoading ? true : false}
          >
            {isLoading ? 'Видаляємо' : 'Видалити'}
          </button>
        )} */}
        {/* <button
          type="button"
          className={styles.button}
          onClick={() => {
            router.replace(`/admin/${adminRoute}`, {
              scroll: false,
            });
          }}
        >
          Повернутись
        </button> */}
      </div>
    </Modal>
  );
};
export default DeleteModal;
