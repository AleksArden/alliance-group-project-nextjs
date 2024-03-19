'use client';

import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import styles from './HomeServicesForm.module.scss';

import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import Image from 'next/image';

import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { HomeServicesType } from 'types/dataTypeForFirebase';
import {
  initStateHomeServicesForm,
  reducerHomeServicesForm,
} from 'helpers/reducer';
import { ActionsHomeServices } from 'types/reducerTypes';
import { submitHomeServicesForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data: HomeServicesType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const HomeSerevicesForm = ({ data, isLoading, setIsLoading }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerHomeServicesForm,
    initStateHomeServicesForm
  );

  const {
    titleUK,
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
      setIsLoading(true);
      const file = files[0];
      const imageURL = await uploadImageToStorage(
        'homePageServices',
        name,
        file
      );

      dispatch({ type: name, payload: imageURL } as ActionsHomeServices);
    }
    setIsLoading(false);
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
    setIsLoading(true);
    const data: HomeServicesType = state;
    await submitHomeServicesForm(data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <AdminLoading />}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        id="homeServicesForm"
        className={styles.form}
      >
        <label className={styles.label}>
          Назва сторінки (UK)
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
          Фонове зображення для комп&apos;ютерів. Розмір 1920х1000.
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
          Фонове зображення для планшетів. Розмір 1260х1024.
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
          Фонове зображення для мобільних телефонів. Розмір 770х800.
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
export default HomeSerevicesForm;
