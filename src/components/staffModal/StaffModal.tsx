'use client';

import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './StaffModal.module.scss';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import Image from 'next/image';
import MainButton from 'components/mainButton/mainButton';
import { initStateAddStaff, reducerAddStaff } from 'helpers/reducer';
import { useReducer } from 'react';
import { ActionsAddStaff } from 'types/reducerTypes';

const StaffModal = () => {
  const [state, dispatch] = useReducer(reducerAddStaff, initStateAddStaff);
  const { photoStaff, name, position, description } = state;
  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      const imageURL = await uploadPhotoToStorage('staffList', name, file);

      dispatch({ type: name, payload: imageURL } as ActionsAddStaff);
    }
  };
  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsAddStaff);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(state);
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
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                />
              </div>
            </label>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>
              Ім&apos;я та Призвище
              <input
                className={styles.input}
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Посада
              <input
                className={styles.input}
                type="text"
                name="position"
                value={position}
                onChange={handleChange}
              />
            </label>
            <label className={styles.label}>
              Характеристика
              <textarea
                className={styles.textarea}
                name="description"
                rows={3}
                value={description}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
        </div>
        <MainButton
          name="Додати"
          styleWrapperBtn={{
            height: 74,
            width: 243,
            borderColor: '#5f391880',
            marginLeft: 'auto',
            borderRadius: '78px 41px 41px 0px',
          }}
          styleBtn={{
            width: 235,
            height: 66,
            padding: '21px 50px',
            borderRadius: '74px 37px 37px 0px',
          }}
          type="submit"
        />
      </form>
    </Modal>
  );
};
export default StaffModal;
