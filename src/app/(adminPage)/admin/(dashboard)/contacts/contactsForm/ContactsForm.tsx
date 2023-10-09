'use client';
import Image from 'next/image';
import styles from './ContacsForm.module.scss';
import SunEditorComponent from 'components/SunEditor/SunEditor';
import { useEffect, useReducer } from 'react';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { ContactsType } from 'types/dataTypeForFirebase';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';
import { initStateContactsForm, reducerContactsForm } from 'helpers/reducer';
import { ActionContacts } from 'types/reducerTypes';
import { addDataToFirestore } from '@/firebase/addData';

import submit from 'app/api/actions';

interface IProps {
  data: ContactsType | undefined;
}

const ContactsForm = ({ data }: IProps) => {
  const [state, dispatch] = useReducer(
    reducerContactsForm,
    initStateContactsForm
  );

  const {
    title,
    subtitle,
    text,
    address,
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
      const imageURL = await uploadPhotoToStorage('contacts', name, file);

      dispatch({ type: name, payload: imageURL } as ActionContacts);
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
        } as ActionContacts);
      });
    }
  }, [data]);

  const handleChangeContent = (content: string) => {
    dispatch({ type: 'text', payload: content });
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: name, payload: value } as ActionContacts);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: ContactsType = state;
    console.log('contactsForm', data);
    await addDataToFirestore('content for site', 'contacts', data);
    await submit('/(adminPage)/admin/(dashboard)/contacts');
    await submit('/(marketing)/contacts');
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
        Опис
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={text}
            handleChangeContent={handleChangeContent}
          />
        </div>
        <textarea
          className={styles.textarea}
          name="text"
          value={text}
          onChange={evt =>
            dispatch({
              type: evt.target.name,
              payload: evt.target.value,
            } as ActionContacts)
          }
        ></textarea>
      </label>
      <label className={styles.label}>
        Адреса
        <input
          className={styles.input}
          type="text"
          name="address"
          value={address}
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
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
              ? styles.wrapperImageWithBefore
              : styles.wrapperImage
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
export default ContactsForm;
