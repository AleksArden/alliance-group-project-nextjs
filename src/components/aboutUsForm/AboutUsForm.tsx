'use client';
import { useEffect, useReducer } from 'react';
import styles from './AboutUsForm.module.scss';
import { addDataToFirestore } from '@/firebase/addData';
import { AboutUsType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from '../../../public/posters/poster-not-found.jpg';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import SunEditorComponent from 'components/SunEditor/SunEditor';
import { initStateAboutUsForm, reducerAboutUsForm } from 'helpers/reducer';
import { ActionsAboutUs } from 'types/reducerTypes';

interface IProps {
  data: AboutUsType | undefined;
}
const AboutUsForm = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerAboutUsForm,
    initStateAboutUsForm
  );

  const {
    title,
    subtitle,
    textOurHistory,
    textOurMission,
    textOurTeam,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      const imageURL = await uploadPhotoToStorage('about-us', name, file);

      dispatch({ type: name, payload: imageURL } as ActionsAboutUs);
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
        } as ActionsAboutUs);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsAboutUs);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: AboutUsType = state;
    console.log('aboutUsForm', data);
    await addDataToFirestore('content for site', 'aboutUs', data);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Назва сторінки
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
        Наша історія
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={textOurHistory}
            handleChangeContent={content =>
              dispatch({ type: 'textOurHistory', payload: content })
            }
          />
        </div>
        <textarea
          className={styles.textarea}
          name="textOurHistory"
          value={textOurHistory}
          onChange={handleChange}
        ></textarea>
      </label>
      <label className={styles.label}>
        Наша місія
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={textOurMission}
            handleChangeContent={content =>
              dispatch({ type: 'textOurMission', payload: content })
            }
          />
        </div>
        <textarea
          className={styles.textarea}
          name="text"
          value={textOurMission}
          onChange={handleChange}
        ></textarea>
      </label>
      <label className={styles.label}>
        Наша команда
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={textOurTeam}
            handleChangeContent={content =>
              dispatch({ type: 'textOurTeam', payload: content })
            }
          />
        </div>
        <textarea
          className={styles.textarea}
          name="text"
          value={textOurTeam}
          onChange={handleChange}
        ></textarea>
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
export default AboutUsForm;
