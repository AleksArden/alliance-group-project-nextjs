'use client';

import { ProductType } from 'types/dataTypeForFirebase';
import styles from './AdminFormGalleryProductsServices.module.scss';
import { useEffect, useReducer } from 'react';
import { initStateProducts, reducerProducts } from 'helpers/reducer';
import { ActionsProducts } from 'types/reducerTypes';
import { uploadImageToStorage } from '@/firebase/uploadAndDeleteImage';
import Image from 'next/image';
import poster from '../../../../../../../public/posters/poster-not-found.jpg';

interface IProps {
  product: ProductType;
}

const AdminFormGalleryProductsServices = ({ product }: IProps) => {
  const [state, dispatch] = useReducer(reducerProducts, initStateProducts);

  const {
    nameUK,
    backgroundImageDesktop,
    backgroundImageTablet,
    backgroundImageMobile,
    imageURL1,
    imageURL2,
    imageURL3,
    imageURL4,
    imageURL5,
    imageURL6,
  } = state;

  const handleChangePreview = async ({
    target: { name, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files !== null) {
      const imageURL = await uploadImageToStorage('home', name, files[0]);
      dispatch({ type: name, payload: imageURL } as ActionsProducts);
    }
  };

  useEffect(() => {
    console.log('useEffect-products', product);
    if (product) {
      const keys = Object.keys(product);
      keys.forEach(key => {
        dispatch({
          type: key,
          payload: product[key as keyof typeof product],
        } as ActionsProducts);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <li>
      <form autoComplete="off">
        <h3 className={styles.title}>{nameUK}</h3>
        <label className={styles.label}>
          Зображення 1
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL1"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL1 ? imageURL1 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
        </label>

        <label className={styles.label}>
          Зображення 2
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL2"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL2 ? imageURL2 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Зображення 3
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL3"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL3 ? imageURL3 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Зображення 4
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL4"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL4 ? imageURL4 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Зображення 5
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL5"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL5 ? imageURL5 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
        </label>
        <label className={styles.label}>
          Зображення 6
          <input
            className={styles.inputImage}
            type="file"
            name="imageURL6"
            accept=".jpg, .jpeg, .png"
            // onChange={({ target: { files } }) => {
            //   handleSelectFile(files);
            //   setFiles(files);
            // }}
          />
          <div className={styles.wrapperImage}>
            <Image
              src={imageURL6 ? imageURL6 : poster}
              alt="The photo of ptoduct"
              priority
              className={styles.image}
              fill
              sizes="400px"
            />
          </div>
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
                ? styles.wrapperImageDesktopBefore
                : styles.wrapperImageDesktop
            }
          >
            <Image
              src={backgroundImageDesktop ? backgroundImageDesktop : poster}
              fill
              sizes="850px"
              alt="The background photo"
              priority
              className={styles.image}
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
                ? styles.wrapperImageTabletBefore
                : styles.wrapperImageTablet
            }
          >
            <Image
              src={backgroundImageTablet ? backgroundImageTablet : poster}
              fill
              sizes="600px"
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
                ? styles.wrapperImageMobileBefore
                : styles.wrapperImageMobile
            }
          >
            <Image
              src={backgroundImageMobile ? backgroundImageMobile : poster}
              fill
              sizes="200px"
              alt="Alliance Group"
              className={styles.image}
              priority
            />
          </div>
        </label>
      </form>
    </li>
  );
};
export default AdminFormGalleryProductsServices;
