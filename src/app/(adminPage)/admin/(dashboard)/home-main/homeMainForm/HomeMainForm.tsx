'use client';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

import styles from './HomeMainForm.module.scss';

import { initStateHomePageForm, reducerHomePageForm } from 'helpers/reducer';
import { ActionsHomePage } from 'types/reducerTypes';

import { submitHomePageForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data: HomePageType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const HomeMainForm = ({ data, isLoading, setIsLoading }: IProps) => {
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
    firstBackgroundImageDesktop,
    secondBackgroundImageDesktop,
    thirdBackgroundImageDesktop,
    firstBackgroundImageTablet,
    secondBackgroundImageTablet,
    thirdBackgroundImageTablet,
    firstBackgroundImageMobile,
    secondBackgroundImageMobile,
    thirdBackgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      setIsLoading(true);
      const imageURL = await uploadImageToStorage(
        'homePageHero',
        name,
        files[0]
      );
      dispatch({ type: name, payload: imageURL } as ActionsHomePage);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log('useEffect-homePageHero', data);
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
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        id="homeMain"
        className={styles.form}
      >
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
          Перше фонове зображення для комп&apos;ютерів. Розмір 1920х1080.
          <input
            className={styles.inputImage}
            type="file"
            name="firstBackgroundImageDesktop"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              firstBackgroundImageDesktop
                ? styles.wrapperImageDesktopBefore
                : styles.wrapperImageDesktop
            }
          >
            <Image
              src={
                firstBackgroundImageDesktop
                  ? firstBackgroundImageDesktop
                  : poster
              }
              fill
              sizes="950px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Друге фонове зображення для комп&apos;ютерів. Розмір 1920х1080.
          <input
            className={styles.inputImage}
            type="file"
            name="secondBackgroundImageDesktop"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              secondBackgroundImageDesktop
                ? styles.wrapperImageDesktopBefore
                : styles.wrapperImageDesktop
            }
          >
            <Image
              src={
                secondBackgroundImageDesktop
                  ? secondBackgroundImageDesktop
                  : poster
              }
              fill
              sizes="950px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Третє фонове зображення для комп&apos;ютерів. Розмір 1920х1080.
          <input
            className={styles.inputImage}
            type="file"
            name="thirdBackgroundImageDesktop"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              thirdBackgroundImageDesktop
                ? styles.wrapperImageDesktopBefore
                : styles.wrapperImageDesktop
            }
          >
            <Image
              src={
                thirdBackgroundImageDesktop
                  ? thirdBackgroundImageDesktop
                  : poster
              }
              fill
              sizes="950px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>

        <label className={styles.label}>
          Перше фонове зображення для планшетів. Розмір 1260х1024.
          <input
            className={styles.inputImage}
            type="file"
            name="firstBackgroundImageTablet"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              firstBackgroundImageTablet
                ? styles.wrapperImageTabletBefore
                : styles.wrapperImageTablet
            }
          >
            <Image
              src={
                firstBackgroundImageTablet ? firstBackgroundImageTablet : poster
              }
              fill
              sizes="700px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Друге фонове зображення для планшетів. Розмір 1260х1024.
          <input
            className={styles.inputImage}
            type="file"
            name="secondBackgroundImageTablet"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              secondBackgroundImageTablet
                ? styles.wrapperImageTabletBefore
                : styles.wrapperImageTablet
            }
          >
            <Image
              src={
                secondBackgroundImageTablet
                  ? secondBackgroundImageTablet
                  : poster
              }
              fill
              sizes="700px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Третє фонове зображення для планшетів. Розмір 1260х1024.
          <input
            className={styles.inputImage}
            type="file"
            name="thirdBackgroundImageTablet"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              thirdBackgroundImageTablet
                ? styles.wrapperImageTabletBefore
                : styles.wrapperImageTablet
            }
          >
            <Image
              src={
                thirdBackgroundImageTablet ? thirdBackgroundImageTablet : poster
              }
              fill
              sizes="700px"
              alt="The background photo"
              priority
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Перше фонове зображення для мобільних телефонів. Розмір 770х800.
          <input
            className={styles.inputImage}
            type="file"
            name="firstBackgroundImageMobile"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              firstBackgroundImageMobile
                ? styles.wrapperImageMobileBefore
                : styles.wrapperImageMobile
            }
          >
            <Image
              src={
                firstBackgroundImageMobile ? firstBackgroundImageMobile : poster
              }
              fill
              sizes="510px"
              alt="Alliance Group"
              className={styles.image}
            />
          </div>
        </label>

        <label className={styles.label}>
          Друге фонове зображення для мобільних телефонів. Розмір 770х800.
          <input
            className={styles.inputImage}
            type="file"
            name="secondBackgroundImageMobile"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              secondBackgroundImageMobile
                ? styles.wrapperImageMobileBefore
                : styles.wrapperImageMobile
            }
          >
            <Image
              src={
                secondBackgroundImageMobile
                  ? secondBackgroundImageMobile
                  : poster
              }
              fill
              sizes="510px"
              alt="Alliance Group"
              className={styles.image}
            />
          </div>
        </label>
        <label className={styles.label}>
          Третє фонове зображення для мобільних телефонів. Розмір 770х800.
          <input
            className={styles.inputImage}
            type="file"
            name="thirdBackgroundImageMobile"
            accept=".jpg, .jpeg, .png"
            onChange={handleChangePreview}
          />
          <div
            className={
              thirdBackgroundImageMobile
                ? styles.wrapperImageMobileBefore
                : styles.wrapperImageMobile
            }
          >
            <Image
              src={
                thirdBackgroundImageMobile ? thirdBackgroundImageMobile : poster
              }
              fill
              sizes="510px"
              alt="Alliance Group"
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
export default HomeMainForm;
