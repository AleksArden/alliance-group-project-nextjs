'use client';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { useEffect, useReducer, useState } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

import styles from './HomeMainForm.module.scss';

import { initStateHomePageForm, reducerHomePageForm } from 'helpers/reducer';
import { ActionsHomePage } from 'types/reducerTypes';

import { submitHomePageForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';

interface IProps {
  data: HomePageType | undefined;
}

const HomeMainForm = ({ data }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(
    reducerHomePageForm,
    initStateHomePageForm
  );

  const {
    titleUK,
    titleEN,
    titleTR,
    subtitleUK,
    subtitleEN,
    subtitleTR,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      setIsLoading(true);
      const imageURL = await uploadImageToStorage('home', name, files[0]);
      dispatch({ type: name, payload: imageURL } as ActionsHomePage);
    }
    setIsLoading(false);
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
    setIsLoading(true);
    const data: HomePageType = state;

    await submitHomePageForm(data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <AdminLoading />}
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
        <label className={styles.label}>
          Назва Компанії UK
          <input
            className={styles.input}
            type="text"
            name="titleUK"
            required
            value={titleUK}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Назва Компанії EN
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
          Назва Компанії TR
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
          Доповнення до назви UK
          <input
            className={styles.input}
            type="text"
            name="subtitleUK"
            required
            minLength={10}
            value={subtitleUK}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Доповнення до назви EN
          <input
            className={styles.input}
            type="text"
            name="subtitleEN"
            required
            minLength={10}
            value={subtitleEN}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Доповнення до назви TR
          <input
            className={styles.input}
            type="text"
            name="subtitleTR"
            required
            minLength={10}
            value={subtitleTR}
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
              sizes="850px"
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
              className={styles.image}
            />
          </div>
        </label>
        <div className={styles.wrapperBtn}>
          <button
            className={styles.button}
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? 'Завантажується' : 'Зберегти'}
          </button>
        </div>
      </form>
    </>
  );
};
export default HomeMainForm;
