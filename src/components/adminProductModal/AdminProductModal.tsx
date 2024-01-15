import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminProductModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { GalleryImageURLType, ProductType } from 'types/dataTypeForFirebase';

import { initStateProducts, reducerProducts } from 'helpers/reducer';
import { ActionsProducts } from 'types/reducerTypes';

import {
  getArrayImagesURL,
  getImageURL,
  getImageURLandImageName2,
} from 'helpers/functions';
import Loading from 'app/(adminPage)/loading';
import { submitProductCard } from 'app/api/actionCard/action';
import AdminProductDescriptionModal from './adminProductDescriptionModal/AdminProductDescriptionModal';

import { deleteGalleryImageFromStorage } from '@/firebase/uploadAndDeleteImage';
import {
  useUploadGalleryImageFile,
  useUploadImageFile,
} from 'hooks/useUploadImageFile';
import { Lang } from 'types/otherType';

interface IProps {
  data?: ProductType;
  btnName: string;
  id?: number;
  productName?: string;
}

const AdminProductModal = ({ data, btnName, id, productName }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducerProducts, initStateProducts);
  const {
    imageURL,
    nameUK,
    nameEN,
    nameTR,
    sizeUK,
    sizeEN,
    sizeTR,
    descriptionUK,
    descriptionEN,
    descriptionTR,
    galleryImagesURL,
  } = state;

  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [filesImageURL, setFilesImageURL] = useState<FileList | null>();
  const [arrayFilesImageURL, setArrayFilesImageURL] = useState<
    (FileList | null)[]
  >([]);
  const { blobGalleryImageURL, handleSelectGalleryFile } =
    useUploadGalleryImageFile();
  const { blobImageURL, handleSelectFile } = useUploadImageFile();

  useEffect(() => {
    if (blobImageURL) {
      dispatch({ type: 'imageURL', payload: blobImageURL });
    }
    if (blobGalleryImageURL) {
      setImagesURL([...imagesURL, blobGalleryImageURL]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobGalleryImageURL, blobImageURL]);
  console.log('state', state);
  // console.log('imagesURL', imagesURL);
  // console.log('arrayFiles', arrayFilesImageURL);
  // console.log('filesImageURL', filesImageURL);
  // console.log('blobGalleryImageURL', blobGalleryImageURL);

  useEffect(() => {
    // console.log('useEffect-products', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        switch (key) {
          case 'galleryImagesURL':
            data.galleryImagesURL.map(
              (galleryImageURL: GalleryImageURLType) => {
                dispatch({
                  type: 'galleryImagesURL',
                  payload: galleryImageURL,
                });
              }
            );
          default:
            dispatch({
              type: key,
              payload: data[key as keyof typeof data],
            } as ActionsProducts);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (type: string, payload: string): void => {
    dispatch({ type, payload } as ActionsProducts);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: name, payload: value } as ActionsProducts);
  };

  const handleSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();

    const data: ProductType = state;

    setIsLoading(true);

    if (arrayFilesImageURL.length > 0) {
      const arrayImagesURLandImageName: (GalleryImageURLType | undefined)[] =
        await getArrayImagesURL(arrayFilesImageURL, nameEN, 'products');

      if (arrayImagesURLandImageName.length > 0) {
        let arrayImages: GalleryImageURLType[] = [];
        arrayImagesURLandImageName?.forEach(
          (galleryImageURL: GalleryImageURLType | undefined) => {
            if (galleryImageURL) {
              return arrayImages.push(galleryImageURL);
            }
          }
        );
        data.galleryImagesURL = [...state.galleryImagesURL, ...arrayImages];
        // data.galleryImagesURL = state.galleryImagesURL.concat(arrayImages);
      }
    }

    if (filesImageURL) {
      const imageURL = await getImageURL({
        nameCollection: 'products',
        filesImageURL,
        productName: nameEN,
        imageName: 'imageURL',
      });

      if (imageURL) {
        data.imageURL = imageURL;
      }
    }
    if (id) {
      data.id = id;
    }
    console.log('data', data);

    await submitProductCard(data);

    router.replace('/admin/products', {
      scroll: false,
    });

    setIsLoading(false);
  };
  return (
    <>
      <Modal adminRoute="products">
        <form autoComplete="off" onSubmit={handleSubmit}>
          {isLoading && <Loading />}
          <div className={styles.container}>
            <div>
              <label className={styles.label}>
                Зображення
                <input
                  className={styles.inputImage}
                  type="file"
                  name="imageURL"
                  accept=".jpg, .jpeg, .png"
                  onChange={({ target: { files } }) => {
                    handleSelectFile(files);
                    setFilesImageURL(files);
                  }}
                />
                <div className={styles.wrapperImage}>
                  <Image
                    src={imageURL ? imageURL : poster}
                    alt="The photo of ptoduct"
                    priority
                    className={styles.image}
                    fill
                    sizes="550px"
                  />
                </div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Найменування продукції (UK)
                <input
                  className={styles.input}
                  type="text"
                  name="nameUK"
                  value={nameUK}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування продукції (EN)
                <input
                  className={styles.input}
                  type="text"
                  name="nameEN"
                  value={nameEN}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Найменування продукції (TR)
                <input
                  className={styles.input}
                  type="text"
                  name="nameTR"
                  value={nameTR}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (UK)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeUK"
                  value={sizeUK}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (EN)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeEN"
                  value={sizeEN}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                Розмір продукції (TR)
                <input
                  className={styles.input}
                  type="text"
                  name="sizeTR"
                  value={sizeTR}
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
                    ? `/admin/products/?edit=true&product=${productName}&description=uk`
                    : '/admin/products/?modal=true&description=uk',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionUK
                ? 'Змінити опис продукції UK'
                : 'Додати опис продукції UK'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/products/?edit=true&product=${productName}&description=en `
                    : '/admin/products/?modal=true&description=en',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionEN
                ? 'Змінити опис продукції EN'
                : 'Додати опис продукції EN'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/products/?edit=true&product=${productName}&description=tr`
                    : '/admin/products/?modal=true&description=tr',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionTR
                ? 'Змінити опис продукції TR'
                : 'Додати опис продукції TR'}
            </button>
          </div>

          <p className={styles.title}>Галерея</p>
          <div className={styles.galleryWrapper}>
            {(galleryImagesURL.length !== 0 || imagesURL.length !== 0) && (
              <ul className={styles.list}>
                <>
                  {galleryImagesURL.length > 0 &&
                    galleryImagesURL.map(
                      ({ imageName, imageURL }: GalleryImageURLType, idx) => (
                        <li key={imageName}>
                          <div className={styles.galleryImageWrapper}>
                            <Image
                              src={imageURL}
                              alt="The photo of ptoduct"
                              priority
                              className={styles.image}
                              fill
                              sizes="130px"
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                galleryImagesURL.splice(idx, 1);
                                await submitProductCard(state);
                                await deleteGalleryImageFromStorage(
                                  'products',
                                  nameEN,
                                  imageName
                                );
                              }}
                            >
                              <div className={styles.iconDelete}></div>
                            </button>
                          </div>
                        </li>
                      )
                    )}
                  {imagesURL.length > 0 &&
                    imagesURL.map((image, idx) => {
                      // console.log(image);
                      return (
                        <li key={idx}>
                          <div className={styles.galleryImageWrapper}>
                            <Image
                              src={image}
                              alt="The photo of ptoduct"
                              priority
                              className={styles.image}
                              fill
                              sizes="130px"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                imagesURL.splice(idx, 1);
                                arrayFilesImageURL.splice(idx, 1);
                                setImagesURL([...imagesURL]);
                                setArrayFilesImageURL([...arrayFilesImageURL]);
                              }}
                            >
                              <div className={styles.iconDelete}></div>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </>
              </ul>
            )}
            {galleryImagesURL.length + imagesURL.length < 6 && (
              <label className={styles.label}>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputImage}
                    type="file"
                    name="galleryImagesURL"
                    accept=".jpg, .jpeg, .png"
                    onChange={({ target: { files } }) => {
                      handleSelectGalleryFile(files);
                      if (arrayFilesImageURL !== undefined) {
                        setArrayFilesImageURL([...arrayFilesImageURL, files]);
                      }
                    }}
                  />
                  <div className={styles.iconPlus}></div>
                </div>
              </label>
            )}
          </div>

          <div className={styles.wrapperBtn}>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Завантажується' : btnName}
            </button>
          </div>
        </form>
      </Modal>
      {showDescriptionModal === Lang.UK && (
        <AdminProductDescriptionModal
          language="UK"
          handleClick={handleClick}
          type="description.UK"
          description={descriptionUK}
        />
      )}
      {showDescriptionModal === Lang.EN && (
        <AdminProductDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="description.EN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === Lang.TR && (
        <AdminProductDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="description.TR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default AdminProductModal;
