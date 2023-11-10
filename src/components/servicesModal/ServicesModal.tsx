import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './ServicesModal.module.scss';
import {
  getProgressUpload,
  uploadPhotoToStorage,
} from '@/firebase/uploadPhotoToStorage';
import Image from 'next/image';

import { useEffect, useReducer, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';
import { initStateServices, reducerServices } from 'helpers/reducer';
import { ActionsServices } from 'types/reducerTypes';
import ServicesDescriptionModal from './servicesDescriptionModal/ServicesDescriptionModal';
import { submitServiceCard } from 'app/api/actions';
import firebase_app from '@/firebase/config';

import { useUploadImageFile } from 'hooks/useUploadImageFile';

interface IProps {
  data?: ServiceType;
  btnName: string;
  id?: number;
  serviceName?: string;
}

const ServicesModal = ({ data, btnName, id, serviceName }: IProps) => {
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');

  const [state, dispatch] = useReducer(reducerServices, initStateServices);

  const router = useRouter();
  const {
    imageService,
    imageName,
    nameUA,
    nameEN,
    nameTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = state;
  console.log(nameEN);
  console.log('data', data);
  const { isLoading, downloadURL, fileName, getImageURL } = useUploadImageFile(
    data,
    imageName
  );
  useEffect(() => {
    console.log('fileName', fileName);
    dispatch({ type: 'imageName', payload: fileName } as ActionsServices);

    dispatch({
      type: 'imageService',
      payload: downloadURL,
    } as ActionsServices);
  }, [downloadURL, fileName]);

  useEffect(() => {
    console.log('useEffect-service', data);

    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: data[key as keyof typeof data],
        } as ActionsServices);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (type: string, payload: string) => {
    dispatch({ type, payload } as ActionsServices);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsServices);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data: ServiceType = state;

    if (id) {
      data.serviceId = id.toString();
    }

    router.replace('/admin/services', {
      scroll: false,
    });
    await submitServiceCard(data);
  };
  return (
    <>
      <Modal route="services">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div>
              <label className={styles.label}>
                Зображення
                <input
                  className={styles.inputImage}
                  type="file"
                  name="imageProduct"
                  accept=".jpg, .jpeg, .png"
                  // onChange={handleChangePreview}
                  onChange={({ target: { files } }) => getImageURL(files)}
                />
                <div className={styles.wrapperImage}>
                  {isLoading && (
                    <p className={styles.loading}>Upload is running</p>
                  )}

                  <Image
                    src={imageService ? imageService : poster}
                    alt="The photo of product"
                    priority
                    className={styles.image}
                    fill
                    sizes="100vw"
                  />
                </div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Найменування послуги (UA)
                <input
                  className={styles.input}
                  type="text"
                  name="nameUA"
                  value={nameUA}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування послуги (EN)
                <input
                  className={styles.input}
                  type="text"
                  name="nameEN"
                  value={nameEN}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування послуги (TR)
                <input
                  className={styles.input}
                  type="text"
                  name="nameTR"
                  value={nameTR}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className={styles.wrapperDescriptionBtn}>
            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/services/?edit=true&service=${serviceName}&description=ua`
                    : '/admin/services/?modal=true&description=ua',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionUA
                ? 'Змінити опис послуги UA'
                : 'Додати опис послуги UA'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/services/?edit=true&service=${serviceName}&description=en `
                    : '/admin/services/?modal=true&description=en',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionEN
                ? 'Змінити опис послуги EN'
                : 'Додати опис послуги EN'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/services/?edit=true&service=${serviceName}&description=tr`
                    : '/admin/services/?modal=true&description=tr',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionTR
                ? 'Змінити опис послуги TR'
                : 'Додати опис послуги TR'}
            </button>
          </div>
          <div className={styles.wrapperBtn}>
            <button className={styles.button} type="submit">
              {btnName}
            </button>
          </div>
        </form>
      </Modal>
      {showDescriptionModal === 'ua' && (
        <ServicesDescriptionModal
          language="UA"
          handleClick={handleClick}
          type="descriptionUA"
          description={descriptionUA}
        />
      )}
      {showDescriptionModal === 'en' && (
        <ServicesDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === 'tr' && (
        <ServicesDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="descriptionTR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default ServicesModal;
