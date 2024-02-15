'use client';
import styles from './ProductsServicesForm.module.scss';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import { ProductsServicesType } from 'types/dataTypeForFirebase';
import { useEffect, useReducer, useState } from 'react';
import {
  initStateProductsServicesForm,
  reducerProductsServicesForm,
} from 'helpers/reducer';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ActionsProductsServices } from 'types/reducerTypes';
import { submitProductsServicesForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
// import SunEditorComponent from 'components/SunEditor/SunEditor';

interface IProps {
  data: ProductsServicesType | undefined;
}

const ProductsServicesForm = ({ data }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
        'products-services',
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
      <form autoComplete="off" onSubmit={handleSubmit}>
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
        {/* <label className={styles.label}>
          Текст (UK)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textUK}
              handleChangeContent={content =>
                dispatch({ type: 'textUK', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Текст (EN)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textEN}
              handleChangeContent={content =>
                dispatch({ type: 'textEN', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Текст (TR)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textTR}
              handleChangeContent={content =>
                dispatch({ type: 'textTR', payload: content })
              }
            />
          </div>
        </label> */}

        <label className={styles.label}>
          Фонове зображення для комп&apos;ютерів
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
              sizes="850px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Фонове зображення для планшетів
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
              sizes="600px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Фонове зображення для мобільних телефонів
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
              sizes="200px"
              alt="Alliance Group"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <button
          className={styles.button}
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? 'Завантажується' : 'Зберегти'}
        </button>
      </form>
    </>
  );
};
export default ProductsServicesForm;
