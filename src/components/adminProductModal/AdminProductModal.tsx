import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminProductModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductType } from 'types/dataTypeForFirebase';

import { initStateProducts, reducerProducts } from 'helpers/reducer';
import { ActionsProducts } from 'types/reducerTypes';

import { useUploadImageFile } from 'hooks/useUploadImageFile';
import { getImageURLandImageName } from 'helpers/functions';
import Loading from 'app/(adminPage)/loading';
import { submitProductCard } from 'app/api/actionCard/action';
import AdminProductDescriptionModal from './adminProductDescriptionModal/AdminProductDescriptionModal';

interface IProps {
  data?: ProductType;
  btnName: string;
  id?: number;
  productName?: string;
}

const AdminProductModal = ({ data, btnName, id, productName }: IProps) => {
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');

  const [state, dispatch] = useReducer(reducerProducts, initStateProducts);

  const [files, setFiles] = useState<FileList | null>();
  const [isLoading, setIsLoading] = useState(false);
  const { blobImageURL, handleSelectFile } = useUploadImageFile();

  const router = useRouter();
  const {
    imageURL,
    imageName,
    nameUK,
    nameEN,
    nameTR,
    sizeUK,
    sizeEN,
    sizeTR,
    descriptionUK,
    descriptionEN,
    descriptionTR,
  } = state;

  useEffect(() => {
    dispatch({ type: 'imageURL', payload: blobImageURL } as ActionsProducts);
  }, [blobImageURL]);

  useEffect(() => {
    console.log('useEffect-products', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsProducts);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (type: string, payload: string) => {
    dispatch({ type, payload } as ActionsProducts);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsProducts);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: ProductType = state;

    if (files) {
      const imageURLandImageName:
        | { imageName: string; imageURL: string }
        | undefined = await getImageURLandImageName({
        data,
        files,
        imageName,
        nameCollection: 'products',
      });

      if (imageURLandImageName) {
        data.imageURL = imageURLandImageName.imageURL;
        data.imageName = imageURLandImageName.imageName;
      }
    }
    if (id) {
      data.id = id;
    }

    await submitProductCard(data);
    router.replace('/admin/products', {
      scroll: false,
    });
    setIsLoading(false);
  };
  return (
    <>
      <Modal adminRoute="products">
        <form autoComplete="off" onSubmit={handleSubmit}>
          {isLoading && <Loading />}
          <div className={styles.container}>
            <div>
              <label className={styles.label}>
                Зображення
                <input
                  className={styles.inputImage}
                  type="file"
                  name="imageProduct"
                  accept=".jpg, .jpeg, .png"
                  onChange={({ target: { files } }) => {
                    handleSelectFile(files);
                    setFiles(files);
                  }}
                />
                <div className={styles.wrapperImage}>
                  <Image
                    src={imageURL ? imageURL : poster}
                    alt="The photo of ptoduct"
                    priority
                    className={styles.image}
                    fill
                    sizes="550px"
                  />
                </div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Найменування продукції (UK)
                <input
                  className={styles.input}
                  type="text"
                  name="nameUK"
                  value={nameUK}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування продукції (EN)
                <input
                  className={styles.input}
                  type="text"
                  name="nameEN"
                  value={nameEN}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування продукції (TR)
                <input
                  className={styles.input}
                  type="text"
                  name="nameTR"
                  value={nameTR}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (UK)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeUK"
                  value={sizeUK}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (EN)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeEN"
                  value={sizeEN}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (TR)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeTR"
                  value={sizeTR}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className={styles.wrapperDescriptionBtn}>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/products/?edit=true&product=${productName}&description=uk`
                    : '/admin/products/?modal=true&description=uk',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionUK
                ? 'Змінити опис продукції UK'
                : 'Додати опис продукції UK'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/products/?edit=true&product=${productName}&description=en `
                    : '/admin/products/?modal=true&description=en',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionEN
                ? 'Змінити опис продукції EN'
                : 'Додати опис продукції EN'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/products/?edit=true&product=${productName}&description=tr`
                    : '/admin/products/?modal=true&description=tr',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionTR
                ? 'Змінити опис продукції TR'
                : 'Додати опис продукції TR'}
            </button>
          </div>
          <div className={styles.wrapperBtn}>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Завантажується' : btnName}
            </button>
          </div>
        </form>
      </Modal>
      {showDescriptionModal === 'uk' && (
        <AdminProductDescriptionModal
          language="UK"
          handleClick={handleClick}
          type="descriptionUK"
          description={descriptionUK}
        />
      )}
      {showDescriptionModal === 'en' && (
        <AdminProductDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === 'tr' && (
        <AdminProductDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="descriptionTR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default AdminProductModal;
