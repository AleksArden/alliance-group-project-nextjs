import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './ProductsModal.module.scss';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import Image from 'next/image';

import { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductType } from 'types/dataTypeForFirebase';
import ProductsDescriptionModal from './productsDescriptionModal/ProductsDescriptionModal';

import { initStateProducts, reducerProducts } from 'helpers/reducer';
import { ActionsProducts } from 'types/reducerTypes';
import { submitProductCard } from 'app/api/actions';

interface IProps {
  data?: ProductType;
  btnName: string;
}

const ProductModal = ({ data, btnName }: IProps) => {
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');

  const [state, dispatch] = useReducer(reducerProducts, initStateProducts);
  const router = useRouter();
  const {
    imageProduct,
    nameUA,
    nameEN,
    nameTR,
    sizeUA,
    sizeEN,
    sizeTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = state;
  const handleChangePreview = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      const name = uuidv4();

      const imageURL = await uploadPhotoToStorage('products', name, file);

      dispatch({ type: 'imageProduct', payload: imageURL } as ActionsProducts);
    }
  };
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
  }, [data]);

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
    const data: ProductType = state;

    router.replace('/admin/products', {
      scroll: false,
    });
    await submitProductCard(data);
  };
  return (
    <>
      <Modal route="products">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div>
              <label className={styles.label}>
                Зображення
                <input
                  className={styles.inputImage}
                  type="file"
                  name="imageProduct"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleChangePreview}
                />
                <div className={styles.wrapperImage}>
                  <Image
                    src={imageProduct ? imageProduct : poster}
                    alt="The photo of product"
                    priority
                    className={styles.image}
                    fill
                    sizes="100vw"
                  />
                </div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Найменування продукції (UA)
                <input
                  className={styles.input}
                  type="text"
                  name="nameUA"
                  value={nameUA}
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
                Розмір продукції (UA)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeUA"
                  value={sizeUA}
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
                router.replace('/admin/products/?modal=true&description=ua', {
                  scroll: false,
                })
              }
            >
              {descriptionUA
                ? 'Змінити опис продукції UA'
                : 'Додати опис продукції UA'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace('/admin/products/?modal=true&description=en', {
                  scroll: false,
                })
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
                router.replace('/admin/products/?modal=true&description=tr', {
                  scroll: false,
                })
              }
            >
              {descriptionTR
                ? 'Змінити опис продукції TR'
                : 'Додати опис продукції TR'}
            </button>
          </div>
          <div className={styles.wrapperBtn}>
            <button className={styles.button} type="submit">
              {btnName}
            </button>
          </div>
        </form>
      </Modal>
      {showDescriptionModal === 'ua' && (
        <ProductsDescriptionModal
          language="UA"
          handleClick={handleClick}
          type="descriptionUA"
          description={descriptionUA}
        />
      )}
      {showDescriptionModal === 'en' && (
        <ProductsDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === 'tr' && (
        <ProductsDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="descriptionTR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default ProductModal;
