'use client';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { useEffect, useReducer } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

import styles from './HomePageForm.module.scss';
import {
  addDataHomePageToFirestore,
  addDataToFirestore,
} from '@/firebase/addData';

import { initStateHomePageForm, reducerHomePageForm } from 'helpers/reducer';
import { ActionsHomePage } from 'types/reducerTypes';

interface IProps {
  data: HomePageType;
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
      console.log(file);
      const imageURL = await uploadPhotoToStorage('home', name, file);
      dispatch({ type: name, payload: imageURL } as ActionsHomePage);
    }
  };
  useEffect(() => {
    console.log('useEffect-homaPage', data);
    const keys = Object.keys(data);
    keys.forEach(key => {
      dispatch({
        type: key,
        payload: data[key as keyof typeof data],
      } as ActionsHomePage);
    });
  }, [data]);
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: name, payload: value } as ActionsHomePage);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: HomePageType = state;
    console.log('HomrPageForm', data);
    await addDataToFirestore('content for site', 'home', data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Назва Компанії
        <input
          className={styles.input}
          type="text"
          name="title"
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
        <div style={{ position: 'relative', width: '850px', height: '500px' }}>
          <Image
            className={styles.image}
            src={backgroundImageDesktop ? backgroundImageDesktop : poster}
            fill
            alt="The background photo"
            priority
            style={{ objectFit: 'cover' }}
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
        <div style={{ position: 'relative', width: '600px', height: '400px' }}>
          <Image
            className={styles.image}
            src={backgroundImageTablet ? backgroundImageTablet : poster}
            fill
            sizes="100vw"
            alt="The background photo"
            priority
            style={{ objectFit: 'cover' }}
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
        <div style={{ position: 'relative', width: '200px', height: '300px' }}>
          <Image
            className={styles.image}
            src={backgroundImageMobile ? backgroundImageMobile : poster}
            fill
            sizes="100vw"
            alt="Alliance Group"
            priority
            style={{ objectFit: 'cover' }}
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
