'use client';

import { useEffect, useReducer, useState } from 'react';
import styles from './HomeIntroForm.module.scss';
import { initStateIntroForm, reducerIntroForm } from 'helpers/reducer';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ActionsIntro } from 'types/reducerTypes';
import { IntroType } from 'types/dataTypeForFirebase';
import { submitIntroForm } from 'app/api/actions';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import Image from 'next/image';
import AdminLoading from 'app/(adminPage)/loading';

interface IProps {
  data: IntroType | undefined;
}

const HomeIntroForm = ({ data }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(reducerIntroForm, initStateIntroForm);

  const {
    text,
    sign,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      setIsLoading(true);
      const imageURL = await uploadImageToStorage('intro', name, files[0]);

      dispatch({ type: name, payload: imageURL } as ActionsIntro);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log('useEffect-intro', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsIntro);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsIntro);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: IntroType = state;
    await submitIntroForm(data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <AdminLoading />}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label className={styles.label}>
          Текст
          <textarea
            className={styles.textarea}
            name="text"
            required
            value={text}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Підпис
          <input
            className={styles.input}
            type="text"
            name="sign"
            required
            value={sign}
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
export default HomeIntroForm;
