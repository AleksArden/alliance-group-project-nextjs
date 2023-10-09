'use client';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { useEffect, useReducer } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

import styles from './HomePageForm.module.scss';

import { initStateHomePageForm, reducerHomePageForm } from 'helpers/reducer';
import { ActionsHomePage } from 'types/reducerTypes';

import { submitHomePageForm } from 'app/api/actions';

interface IProps {
  data: HomePageType | undefined;
}

const HomePageForm = ({ data }: IProps) => {
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
          required
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePreview}
        />
        <div
          className={
            backgroundImageDesktop
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
export default HomePageForm;
