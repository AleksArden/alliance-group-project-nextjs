'use client';

import { useEffect, useReducer } from 'react';
import styles from './HomeServicesForm.module.scss';

import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import Image from 'next/image';

import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { HomeServicesType } from 'types/dataTypeForFirebase';
import {
  initStateHomeServicesForm,
  reducerHomeServicesForm,
} from 'helpers/reducer';
import { ActionsHomeServices } from 'types/reducerTypes';
import { submitHomeServicesForm } from 'app/api/actions';

interface IProps {
  data: HomeServicesType | undefined;
}

const HomeSerevicesForm = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerHomeServicesForm,
    initStateHomeServicesForm
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
      const imageURL = await uploadPhotoToStorage('homeServices', name, file);

      dispatch({ type: name, payload: imageURL } as ActionsHomeServices);
    }
  };
  useEffect(() => {
    console.log('useEffect-services', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsHomeServices);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsHomeServices);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: HomeServicesType = state;
    await submitHomeServicesForm(data);
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
export default HomeSerevicesForm;
