'use client';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { useEffect, useReducer } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

import styles from './HomeMainForm.module.scss';

import { initStateHomePageForm, reducerHomePageForm } from 'helpers/reducer';
import { ActionsHomePage } from 'types/reducerTypes';

import { submitHomePageForm } from 'app/api/actions';

interface IProps {
  data: HomePageType | undefined;
}

const HomeMainForm = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerHomePageForm,
    initStateHomePageForm
  );

  const {
    title,
    subtitle,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];

      const imageURL = await uploadPhotoToStorage('home', name, file);
      dispatch({ type: name, payload: imageURL } as ActionsHomePage);
    }
  };
  useEffect(() => {
    console.log('useEffect-homaPage', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsHomePage);
      });
    }
  }, [data]);
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: name, payload: value } as ActionsHomePage);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: HomePageType = state;
    console.log('homePage in client');
    await submitHomePageForm(data);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label className={styles.label}>
        Назва Компанії
        <input
          className={styles.input}
          type="text"
          name="title"
          required
          value={title}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Доповнення до назви
        <input
          className={styles.input}
          type="text"
          name="subtitle"
          required
          minLength={10}
          value={subtitle}
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
            sizes="100vw"
            alt="The background photo"
            priority
            className={styles.image}
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
export default HomeMainForm;
