'use client';
import { useState } from 'react';
import styles from './AboutUsForm.module.scss';
import {
  addDataToFirestore,
  addDataToRealtimeDatabase,
} from '@/firebase/addData';
import { AboutUsType } from 'types/dataTypeForFirebase';

const AboutUsForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data: AboutUsType = {
      title,
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
        />
      </label>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
};
export default AboutUsForm;
