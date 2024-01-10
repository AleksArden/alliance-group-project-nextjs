import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminProductModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { ProductType } from 'types/dataTypeForFirebase';

import { initStateProducts, reducerProducts } from 'helpers/reducer';
import { ActionsProducts } from 'types/reducerTypes';

import { useUploadImageFileWithName } from 'hooks/useUploadImageFile';
import { getImageURL, getImageURLandImageName2 } from 'helpers/functions';
import Loading from 'app/(adminPage)/loading';
import { submitProductCard } from 'app/api/actionCard/action';
import AdminProductDescriptionModal from './adminProductDescriptionModal/AdminProductDescriptionModal';

type ImageURLandImageNameType = {
  imageName: string;
  imageURL: string;
};

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

  const [filesImageURL, setFilesImageURL] = useState<FileList | null>();
  const [arrayFilesImageURL, setArrayFilesImageURL] = useState<
    (FileList | null)[]
  >([]);
  const { blobImagesURL, name, handleSelectFileWithName } =
    useUploadImageFileWithName();

  console.log('state', state);
  console.log('arrayFiles', arrayFilesImageURL);
  console.log('filesImageURL', filesImageURL);
  console.log('blobImagesURL', blobImagesURL);

  useEffect(() => {
    // console.log('useEffect-products', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        key === 'galleryImagesURL'
          ? data.galleryImagesURL.map(imageURL => {
              dispatch({
                type: key,
                payload: imageURL,
              } as ActionsProducts);
            })
          : dispatch({
              type: key,
              payload: data[key as keyof typeof data],
            } as ActionsProducts);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleDeleteImageFromGallery = (idx: number) => {

  // };

  const handleClick = (type: string, payload: string): void => {
    dispatch({ type, payload } as ActionsProducts);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch({ type: name, payload: value } as ActionsProducts);
  };

  const getArrayImagesURL = async (
    arrayFilesImageURL: (FileList | null)[],
    productName: string
  ): Promise<(ImageURLandImageNameType | undefined)[]> => {
    const arrayImageURLandImageName = await Promise.all(
      arrayFilesImageURL.map(async filesImageURL => {
        if (filesImageURL) {
          const imageURLandImageName = await getImageURLandImageName2({
            filesImageURL,
            productName,
            nameCollection: 'products',
          });
          if (imageURLandImageName) {
            return imageURLandImageName;
          }
        }
      })
    );
    return arrayImageURLandImageName;
  };

  const handleSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();

    console.log('before data', state);
    setIsLoading(true);
    const data: ProductType = state;

    if (arrayFilesImageURL) {
      const arrayImagesURLandImageName: (
        | ImageURLandImageNameType
        | undefined
      )[] = await getArrayImagesURL(arrayFilesImageURL, data.nameEN);

      arrayImagesURLandImageName?.forEach(({ imageURL, imageName }: any) => {
        data.galleryImagesURL.push(imageURL);
      });
    }

    if (filesImageURL) {
      const imageURL = await getImageURL({
        nameCollection: 'products',
        filesImageURL,
        productName: data.nameEN,
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
                  onChange={({ target: { files, name } }) => {
                    handleSelectFileWithName(files, name);
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
            {(galleryImagesURL.length !== 0 || blobImagesURL.length !== 0) && (
              <ul className={styles.list}>
                <>
                  {galleryImagesURL.length > 0 &&
                    galleryImagesURL.map((image, idx) => (
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
                            onClick={() => {
                              galleryImagesURL.splice(idx, 1);
                            }}
                          >
                            <div className={styles.iconDelete}></div>
                          </button>
                        </div>
                      </li>
                    ))}
                  {blobImagesURL.length > 0 &&
                    blobImagesURL.map((image, idx) => {
                      console.log(image);
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
                              onClick={() => {
                                galleryImagesURL.splice(idx, 1);
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
            {galleryImagesURL.length + blobImagesURL.length < 6 && (
              <label className={styles.label}>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.inputImage}
                    type="file"
                    name="galleryImagesURL"
                    accept=".jpg, .jpeg, .png"
                    onChange={({ target: { files, name } }) => {
                      handleSelectFileWithName(files, name);
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
      {showDescriptionModal === 'uk' && (
        <AdminProductDescriptionModal
          language="UK"
          handleClick={handleClick}
          type="descriptionUK"
          description={descriptionUK}
        />
      )}
      {showDescriptionModal === 'en' && (
        <AdminProductDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === 'tr' && (
        <AdminProductDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="descriptionTR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default AdminProductModal;
