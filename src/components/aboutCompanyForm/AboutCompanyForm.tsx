'use client';
import { useEffect, useReducer, useState } from 'react';
import styles from './AboutCompanyForm.module.scss';

import { AboutCompanyType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../public/posters/poster-not-found.jpg';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
// import SunEditorComponent from 'components/SunEditor/SunEditor';
import {
  initStateAboutCompanyForm,
  reducerAboutCompanyForm,
} from 'helpers/reducer';
import { ActionsAboutCompany } from 'types/reducerTypes';
import { submitAboutUsForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';

interface IProps {
  data: AboutCompanyType | undefined;
}
const AboutCompanyForm = ({ data }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
      const imageURL = await uploadImageToStorage('about-us', name, files[0]);

      dispatch({ type: name, payload: imageURL } as ActionsAboutCompany);
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

    await submitAboutUsForm(data);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <AdminLoading />}
      <form autoComplete="off" onSubmit={handleSubmit}>
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
        {/* <label className={styles.label}>
          Наша історія (UK)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurHistoryUK}
              handleChangeContent={content =>
                dispatch({ type: 'textOurHistoryUK', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша історія (EN)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurHistoryEN}
              handleChangeContent={content =>
                dispatch({ type: 'textOurHistoryEN', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша історія (TR)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurHistoryTR}
              handleChangeContent={content =>
                dispatch({ type: 'textOurHistoryTR', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (UK)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurMissionUK}
              handleChangeContent={content =>
                dispatch({ type: 'textOurMissionUK', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (EN)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurMissionEN}
              handleChangeContent={content =>
                dispatch({ type: 'textOurMissionEN', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша місія (TR)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurMissionTR}
              handleChangeContent={content =>
                dispatch({ type: 'textOurMissionTR', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (UK)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurTeamUK}
              handleChangeContent={content =>
                dispatch({ type: 'textOurTeamUK', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (EN)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurTeamEN}
              handleChangeContent={content =>
                dispatch({ type: 'textOurTeamEN', payload: content })
              }
            />
          </div>
        </label>
        <label className={styles.label}>
          Наша команда (TR)
          <div className={styles.wrapperSunEditor}>
            <SunEditorComponent
              content={textOurTeamTR}
              handleChangeContent={content =>
                dispatch({ type: 'textOurTeamTR', payload: content })
              }
            />
          </div>
        </label> */}
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
export default AboutCompanyForm;
