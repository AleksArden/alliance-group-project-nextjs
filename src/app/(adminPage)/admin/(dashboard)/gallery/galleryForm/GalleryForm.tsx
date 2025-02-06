'use client';
import Image from 'next/image';
import styles from './GalleryForm.module.scss';
import { GalleryType } from 'types/dataTypeForFirebase';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { initStateGalleryForm, reducerGalleryForm } from 'helpers/reducer';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ActionsGallery } from 'types/reducerTypes';
import { submitGalleryForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
import AdminButton from 'components/adminButton/AdminButton';

import poster from '@/public/posters/poster-not-found.jpg';

interface IProps {
  data: GalleryType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const GalleryForm = ({ data, isLoading, setIsLoading }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerGalleryForm,
    initStateGalleryForm
  );

  const {
    titleUK,
    subtitleUK,
    titleEN,
    subtitleEN,
    titleTR,
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
      const imageURL = await uploadImageToStorage(
        'galleryPage',
        name,
        files[0]
      );

      dispatch({ type: name, payload: imageURL } as ActionsGallery);
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
        } as ActionsGallery);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsGallery);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: GalleryType = state;

    await submitGalleryForm(data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <AdminLoading />}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form}
        id="galleryForm"
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
export default GalleryForm;
