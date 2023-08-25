'use client';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import { useEffect, useState } from 'react';
import { HomePageType } from 'types/dataTypeForFirebase';
import Image from 'next/image';

import styles from './HomePageForm.module.scss';
import { addDataHomePageToFirestore } from '@/firebase/addData';
import SunEditorComponent from 'components/SunEditor/SunEditor';

interface IProps {
  data: HomePageType | undefined;
}

const HomePageForm = ({ data }: IProps) => {
  const [imageURL, setImageURL] = useState('');
  const [text, setText] = useState('');

  const handleChangePreview = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.files !== null) {
      const file = evt.target.files[0];
      const imageURL = await uploadPhotoToStorage(
        'home-page',
        'background image desktop',
        file
      );
      setImageURL(imageURL);
    }
  };
  useEffect(() => {
    console.log('useEffect-homaPage', data);
    if (data?.text) setText(data?.text);
    if (data?.imageURL) setImageURL(data?.imageURL);
  }, [data]);

  const handleChangeText = (content: string) => {
    setText(content);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: HomePageType = {
      text,
      imageURL,
    };
    console.log('homePageForm', data);
    await addDataHomePageToFirestore('content', 'home-page', data);
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Text
        <div className={styles.wrapperSunEditor}>
          <SunEditorComponent
            content={text}
            handleChangeContent={handleChangeText}
          />
        </div>
        <textarea
          className={styles.textarea}
          name="content"
          value={text}
          onChange={evt => setText(evt.target.value)}
        ></textarea>
      </label>
      <label>
        Image desktop
        <input
          className={styles.inputImage}
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePreview}
        />
        <Image
          className={styles.image}
          src={imageURL}
          width={900}
          height={700}
          alt="The photo download"
        />
      </label>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
export default HomePageForm;
