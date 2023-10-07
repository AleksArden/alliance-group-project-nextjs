'use client';

import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './StaffModal.module.scss';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import Image from 'next/image';

import { initStateAddStaff, reducerAddStaff } from 'helpers/reducer';
import { useEffect, useReducer } from 'react';
import { ActionAddStaff } from 'types/reducerTypes';
import { v4 as uuidv4 } from 'uuid';
import { StaffType } from 'types/dataTypeForFirebase';
import { addStaffToFirestore } from '@/firebase/addData';
import { useRouter } from 'next/navigation';

interface IProps {
  data?: StaffType;
  btnName: string;
}

const StaffModal = ({ data, btnName }: IProps) => {
  const [state, dispatch] = useReducer(reducerAddStaff, initStateAddStaff);
  const router = useRouter();
  const {
    order,
    photoStaff,
    nameUA,
    nameEN,
    nameTR,
    positionUA,
    positionEN,
    positionTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = state;
  const handleChangePreview = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      const name = uuidv4();

      const imageURL = await uploadPhotoToStorage('staffList', name, file);

      dispatch({ type: 'photoStaff', payload: imageURL } as ActionAddStaff);
    }
  };
  useEffect(() => {
    console.log('useEffect-staff', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionAddStaff);
      });
    }
  }, [data]);
  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionAddStaff);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const data: StaffType = state;

    console.log('staff', data);
    await addStaffToFirestore('staff', order, data);
    router.back();
  };
  return (
    <Modal>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div>
            <label className={styles.label}>
              Зображення
              <input
                className={styles.inputImage}
                type="file"
                name="photoStaff"
                accept=".jpg, .jpeg, .png"
                onChange={handleChangePreview}
              />
              <div className={styles.wrapperImage}>
                <Image
                  src={photoStaff ? photoStaff : poster}
                  fill
                  alt="The photo of staff"
                  priority
                  className={styles.image}
                  sizes="100vw"
                />
              </div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Ім&apos;я та Призвище (UA)
              <input
                className={styles.input}
                type="text"
                name="nameUA"
                value={nameUA}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Ім&apos;я та Призвище (EN)
              <input
                className={styles.input}
                type="text"
                name="nameEN"
                value={nameEN}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Ім&apos;я та Призвище (TR)
              <input
                className={styles.input}
                type="text"
                name="nameTR"
                value={nameTR}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (UA)
              <input
                className={styles.input}
                type="text"
                name="positionUA"
                value={positionUA}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (EN)
              <input
                className={styles.input}
                type="text"
                name="positionEN"
                value={positionEN}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада (TR)
              <input
                className={styles.input}
                type="text"
                name="positionTR"
                value={positionTR}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <label className={styles.label}>
          Характеристика (UA)
          <textarea
            className={styles.textarea}
            name="descriptionUA"
            rows={3}
            value={descriptionUA}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className={styles.label}>
          Характеристика (EN)
          <textarea
            className={styles.textarea}
            name="descriptionEN"
            rows={3}
            value={descriptionEN}
            onChange={handleChange}
          ></textarea>
        </label>
        <label className={styles.label}>
          Характеристика (TR)
          <textarea
            className={styles.textarea}
            name="descriptionTR"
            rows={2}
            value={descriptionTR}
            onChange={handleChange}
          ></textarea>
        </label>
        <div className={styles.wrapperBtn}>
          <button className={styles.button} type="submit">
            {btnName}
          </button>

          <label className={styles.label}>
            Порядок розташування
            <input
              className={styles.inputOrder}
              type="text"
              name="order"
              value={order}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
    </Modal>
  );
};
export default StaffModal;
