'use client';
import { useState } from 'react';
import styles from './AboutUsForm.module.scss';
import { addDataToServer } from '@/firebase/addData';
import { AboutUsType } from 'types/dataTypeForFirebase';

const AboutUsForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data: AboutUsType = {
      title,
    };
    console.log(data);
    await addDataToServer('about-us', 'about-id', data);
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
