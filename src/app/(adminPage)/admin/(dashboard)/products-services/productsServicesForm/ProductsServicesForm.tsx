'use client';
import styles from './ProductsServicesForm.module.scss';
import Image from 'next/image';
import { ProductsServicesType } from 'types/dataTypeForFirebase';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import {
  initStateProductsServicesForm,
  reducerProductsServicesForm,
} from 'helpers/reducer';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ActionsProductsServices } from 'types/reducerTypes';
import { submitProductsServicesForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';

import Editor from 'ckeditor5-custom-build';
import dynamic from 'next/dynamic';
import AdminButton from 'components/adminButton/AdminButton';

import poster from '@/public/posters/poster-not-found.jpg';

const MyEditor = dynamic(() => import('components/ckEditor/CKEditor'), {
  ssr: false,
});

interface IProps {
  data: ProductsServicesType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const ProductsServicesForm = ({ data, isLoading, setIsLoading }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerProductsServicesForm,
    initStateProductsServicesForm
  );

  const {
    titleUK,
    subtitleUK,
    textUK,
    titleEN,
    subtitleEN,
    textEN,
    titleTR,
    subtitleTR,
    textTR,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;
  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      setIsLoading(true);
      const imageURL = await uploadImageToStorage(
        'productsServicesPage',
        name,
        files[0]
      );

      dispatch({ type: name, payload: imageURL } as ActionsProductsServices);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('useEffect', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsProductsServices);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsProductsServices);
  };
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: ProductsServicesType = state;

    await submitProductsServicesForm(data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <AdminLoading />}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form}
        id="productsServicesForm"
      >
        <label className={styles.label}>
          Назва сторінки (UK)
          <input
            className={styles.input}
            type="text"
            name="titleUK"
            value={titleUK}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Назва сторінки (EN)
          <input
            className={styles.input}
            type="text"
            name="titleEN"
            value={titleEN}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Назва сторінки (TR)
          <input
            className={styles.input}
            type="text"
            name="titleTR"
            value={titleTR}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Доповнення до назви (UK)
          <input
            className={styles.input}
            type="text"
            name="subtitleUK"
            value={subtitleUK}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Доповнення до назви (EN)
          <input
            className={styles.input}
            type="text"
            name="subtitleEN"
            value={subtitleEN}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Доповнення до назви (TR)
          <input
            className={styles.input}
            type="text"
            name="subtitleTR"
            value={subtitleTR}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Текст (UK)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textUK}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textUK', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Текст (EN)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textEN}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textEN', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Текст (TR)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textTR}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textTR', payload: data });
              }}
            />
          </div>
        </label>

        <label className={styles.label}>
          Фонове зображення для комп&apos;ютерів. Розмір 1920х800.
          <input
            className={styles.inputImage}
            type="file"
            name="backgroundImageDesktop"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              backgroundImageDesktop
                ? styles.wrapperImageDesktopBefore
                : styles.wrapperImageDesktop
            }
          >
            <Image
              src={backgroundImageDesktop ? backgroundImageDesktop : poster}
              fill
              alt="The background photo"
              priority
              className={styles.image}
              sizes="950px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Фонове зображення для планшетів. Розмір зображення 1260х500.
          <input
            className={styles.inputImage}
            type="file"
            name="backgroundImageTablet"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              backgroundImageTablet
                ? styles.wrapperImageTabletBefore
                : styles.wrapperImageTablet
            }
          >
            <Image
              src={backgroundImageTablet ? backgroundImageTablet : poster}
              fill
              sizes="700px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Фонове зображення для мобільних телефонів. Розмір зображення 770х240.
          <input
            className={styles.inputImage}
            type="file"
            name="backgroundImageMobile"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              backgroundImageMobile
                ? styles.wrapperImageMobileBefore
                : styles.wrapperImageMobile
            }
          >
            <Image
              src={backgroundImageMobile ? backgroundImageMobile : poster}
              fill
              sizes="510px"
              alt="Alliance Group"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          disabled={isLoading ? true : false}
          type="submit"
        />
      </form>
    </>
  );
};
export default ProductsServicesForm;
