import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './ServicesModal.module.scss';
import { uploadPhotoToStorage } from '@/firebase/uploadPhotoToStorage';
import Image from 'next/image';

import { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';
import { initStateServices, reducerServices } from 'helpers/reducer';
import { ActionsServices } from 'types/reducerTypes';
import ServicesDescriptionModal from './servicesDescriptionModal/ServicesDescriptionModal';
import { submitServiceCard } from 'app/api/actions';

interface IProps {
  data?: ServiceType;
  btnName: string;
  id?: number;
}

const ServicesModal = ({ data, btnName, id = 0 }: IProps) => {
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');

  const [state, dispatch] = useReducer(reducerServices, initStateServices);
  const router = useRouter();
  const {
    imageService,
    nameUA,
    nameEN,
    nameTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = state;
  const handleChangePreview = async ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const file = files[0];
      // const name = uuidv4();

      const imageURL = await uploadPhotoToStorage('services', '1', file);

      dispatch({ type: 'imageService', payload: imageURL } as ActionsServices);
    }
  };
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
  }, [data]);

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

    data.serviceId = id.toString();

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
                  onChange={handleChangePreview}
                />
                <div className={styles.wrapperImage}>
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
                    ? `/admin/services/?edit=true&service=${nameEN}&description=ua`
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
                    ? `/admin/services/?edit=true&service=${nameEN}&description=en `
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
                    ? `/admin/services/?edit=true&service=${nameEN}&description=tr`
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
