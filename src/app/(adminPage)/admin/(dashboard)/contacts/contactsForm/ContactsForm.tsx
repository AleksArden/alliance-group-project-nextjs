'use client';
import Image from 'next/image';
import styles from './ContacsForm.module.scss';

import { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import { ContactsType } from 'types/dataTypeForFirebase';
import { initStateContactsForm, reducerContactsForm } from 'helpers/reducer';
import { ActionsContacts } from 'types/reducerTypes';

import { submitContactsForm } from 'app/api/actions';
import AdminLoading from 'app/(adminPage)/loading';
import dynamic from 'next/dynamic';

import Editor from 'ckeditor5-custom-build';
import AdminButton from 'components/adminButton/AdminButton';

import poster from '@/public/posters/poster-not-found.jpg';

const MyEditor = dynamic(() => import('components/ckEditor/CKEditor'), {
  ssr: false,
});

interface IProps {
  data: ContactsType | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const ContactsForm = ({ data, isLoading, setIsLoading }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerContactsForm,
    initStateContactsForm
  );

  const {
    titleUK,
    titleEN,
    titleTR,
    subtitleUK,
    subtitleEN,
    subtitleTR,
    textUK,
    textEN,
    textTR,
    addressUK,
    addressEN,
    addressTR,
    email,
    tel1,
    tel2,
    telegram,
    facebook,
    instagram,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      setIsLoading(true);
      const imageURL = await uploadImageToStorage('contactsPage', name, file);

      dispatch({ type: name, payload: imageURL } as ActionsContacts);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log('useEffect-contacts', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsContacts);
      });
    }
  }, [data]);

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsContacts);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    const data: ContactsType = state;

    await submitContactsForm(data);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <AdminLoading />}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form}
        id="contactsForm"
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
          Текст (UK)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textUK}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textUK', payload: data });
              }}
            />
          </div>
        </label>

        <label className={styles.label}>
          Текст (EN)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textEN}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textEN', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Текст (TR)
          <div className={styles.wrapperCKEditor}>
            <MyEditor
              content={textTR}
              handleChangeContent={(
                event: string | unknown,
                editor: typeof Editor
              ) => {
                const data = editor.getData();
                dispatch({ type: 'textTR', payload: data });
              }}
            />
          </div>
        </label>
        <label className={styles.label}>
          Адреса (UK)
          <input
            className={styles.input}
            type="text"
            name="addressUK"
            value={addressUK}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Адреса (EN)
          <input
            className={styles.input}
            type="text"
            name="addressEN"
            value={addressEN}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Адреса (TR)
          <input
            className={styles.input}
            type="text"
            name="addressTR"
            value={addressTR}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          E-mail
          <input
            className={styles.input}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Телефон 1
          <input
            className={styles.input}
            type="tel"
            name="tel1"
            value={tel1}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Телефон 2
          <input
            className={styles.input}
            type="tel"
            name="tel2"
            value={tel2}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Telegram
          <input
            className={styles.input}
            type="text"
            name="telegram"
            value={telegram}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Facebook
          <input
            className={styles.input}
            type="text"
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Instagram
          <input
            className={styles.input}
            type="text"
            name="instagram"
            value={instagram}
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
export default ContactsForm;
