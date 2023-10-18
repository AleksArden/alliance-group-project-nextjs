'use client';

import { useEffect, useReducer } from 'react';
import styles from './HomeProductsForm.module.scss';

import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import Image from 'next/image';
import { HomeProductsType } from 'types/dataTypeForFirebase';
import {
  initStateHomeProductsForm,
  reducerHomeProductsForm,
} from 'helpers/reducer';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { ActionsHomeProducts } from 'types/reducerTypes';
import { submitHomeProductsForm } from 'app/api/actions';

interface IProps {
  data: HomeProductsType | undefined;
}

const HomeProductsForm = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerHomeProductsForm,
    initStateHomeProductsForm
  );

  const {
    titleUA,
    titleEN,
    titleTR,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      const imageURL = await uploadPhotoToStorage('homeProducts', name, file);

      dispatch({ type: name, payload: imageURL } as ActionsHomeProducts);
    }
  };
  useEffect(() => {
    console.log('useEffect-intro', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsHomeProducts);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsHomeProducts);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: HomeProductsType = state;
    await submitHomeProductsForm(data);
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Назва сторінки (UA)
        <input
          className={styles.input}
          type="text"
          name="titleUA"
          required
          value={titleUA}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Назва сторінки (EN)
        <input
          className={styles.input}
          type="text"
          name="titleEN"
          required
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
          required
          value={titleTR}
          onChange={handleChange}
        />
      </label>

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
            sizes="100vw"
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
            sizes="100vw"
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
            sizes="100vw"
            alt="Alliance Group"
            priority
            className={styles.image}
          />
        </div>
      </label>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
export default HomeProductsForm;
