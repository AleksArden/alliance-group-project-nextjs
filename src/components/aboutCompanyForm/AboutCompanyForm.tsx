'use client';
import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import styles from './AboutCompanyForm.module.scss';

import { AboutCompanyType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';

import {
  initStateAboutCompanyForm,
  reducerAboutCompanyForm,
} from 'helpers/reducer';
import { ActionsAboutCompany } from 'types/reducerTypes';
import { submitAboutCompanyForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
import Editor from 'ckeditor5-custom-build';
import dynamic from 'next/dynamic';
import AdminButton from 'components/adminButton/AdminButton';

import poster from '@/public/posters/poster-not-found.jpg';

const MyEditor = dynamic(() => import('components/ckEditor/CKEditor'), {
  ssr: false,
});

interface IProps {
  data: AboutCompanyType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}
const AboutCompanyForm = ({ data, isLoading, setIsLoading }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerAboutCompanyForm,
    initStateAboutCompanyForm
  );

  const {
    titleUK,
    subtitleUK,
    textOurHistoryUK,
    textOurMissionUK,
    textOurTeamUK,
    titleEN,
    subtitleEN,
    textOurHistoryEN,
    textOurMissionEN,
    textOurTeamEN,
    titleTR,
    subtitleTR,
    textOurHistoryTR,
    textOurMissionTR,
    textOurTeamTR,
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
        'aboutCompanyPage',
        name,
        files[0]
      );

      dispatch({ type: name, payload: imageURL } as ActionsAboutCompany);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log('useEffect', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsAboutCompany);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsAboutCompany);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: AboutCompanyType = state;

    await submitAboutCompanyForm(data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <AdminLoading />}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        id="aboutCompanyForm"
        className={styles.form}
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
          Наша історія (UK)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurHistoryUK}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurHistoryUK', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша історія (EN)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurHistoryEN}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurHistoryEN', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша історія (TR)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurHistoryTR}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurHistoryTR', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (UK)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurMissionUK}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurMissionUK', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (EN)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurMissionEN}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurMissionEN', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (TR)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurMissionTR}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurMissionTR', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (UK)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurTeamUK}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurTeamUK', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (EN)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurTeamEN}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurTeamEN', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (TR)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textOurTeamTR}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textOurTeamTR', payload: data });
              }}
            />
          </div>
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
export default AboutCompanyForm;
