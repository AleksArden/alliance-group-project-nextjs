'use client';
import { useEffect, useState } from 'react';
import styles from './AboutUsForm.module.scss';
import {
  addDataToFirestore,
  addDataToRealtimeDatabase,
} from '@/firebase/addData';
import { AboutUsType } from 'types/dataTypeForFirebase';
import Image from 'next/image';
import poster from 'public/posters/poster-not-found.jpg';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
interface IProps {
  data: AboutUsType | undefined;
}
const AboutUsForm = ({ data }: IProps) => {
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  console.log(image);

  const handleChangePreview = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (evt.target.files !== null) {
      const file = evt.target.files[0];
      setFile(file);

      const fileUrl = URL.createObjectURL(evt.target.files[0]);

      setImage(fileUrl);

      // URL.revokeObjectURL(file);
    }
  };
  useEffect(() => {
    if (data?.title) setTitle(data?.title);
    if (data?.imageURL) setImage(data?.imageURL);
  }, [data?.imageURL, data?.title]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!file) return;
    const imageURL = await uploadPhotoToStorage('about-us', 'photo', file);
    console.log(imageURL);
    const data: AboutUsType = {
      title,
      imageURL,
    };
    console.log(data);
    await addDataToFirestore('content', 'about-us', data);
    // addDataToRealtimeDatabase(data, 'about-us');
    // await addDataToRealtimeDatabaseREST(data, 'about-us');
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label className={styles.label}>
        Title
        <input
          className={styles.input}
          type="text"
          name="title"
          minLength={3}
          maxLength={255}
          value={title}
          onChange={evt => setTitle(evt.target.value)}
        />
      </label>
      <label className={styles.label}>
        Description
        <textarea className={styles.textarea} name="text"></textarea>
      </label>
      <label className={styles.label}>
        Image
        <input
          className={styles.input}
          type="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleChangePreview}
        />
        <Image
          src={image ? image : poster}
          width={150}
          height={150}
          alt="The photo download"
        />
      </label>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
export default AboutUsForm;
