import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminProductModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  GalleryImageURLType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';

import { getArrayImagesURL, getImageURL } from 'helpers/functions';

import { submitProductCard } from 'app/api/actionCard/actionsCard';
import AdminProductDescriptionModal from './adminProductDescriptionModal/AdminProductDescriptionModal';

import { deleteGalleryImageFromStorage } from '@/firebase/uploadAndDeleteImage';
import {
  useUploadGalleryImageFile,
  useUploadImageFile,
} from 'hooks/useUploadImageFile';
import { Lang } from 'types/otherType';
import {
  initStateProductService,
  reducerProductService,
} from 'helpers/reducer';
import { ActionsProductService } from 'types/reducerTypes';
import AdminLoading from 'app/(adminPage)/loading';

interface IProps {
  data?: ProductServiceType;
  btnName: string;
  id?: number;
  productAdressBarName?: string;
}

const AdminProductModal = ({
  data,
  btnName,
  id,
  productAdressBarName,
}: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showDescriptionModal = searchParams.get('description');
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(
    reducerProductService,
    initStateProductService
  );
  const {
    imageURL,
    productName,
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

  useEffect(() => {
    // console.log('useEffect-products', data);
    if (data) {
      const keys = Object.keys(data);
      keys.forEach(key => {
        key === 'galleryImagesURL'
          ? data.galleryImagesURL.forEach(galleryImageURL => {
              dispatch({
                type: 'galleryImagesURL',
                payload: galleryImageURL,
              });
            })
          : dispatch({
              type: key,
              payload: data[key as keyof typeof data],
            } as ActionsProductService);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (type: string, payload: string): void => {
    dispatch({ type, payload } as ActionsProductService);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch({ type: name, payload: value } as ActionsProductService);
  };

  const handleSubmit = async (
    evt: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();

    const data: ProductServiceType = state;

    setIsLoading(true);
    if (id) {
      data.id = id;
      data.productName = nameEN;
    }
    if (arrayFilesImageURL.length > 0) {
      const arrayImagesURLandImageName: (GalleryImageURLType | undefined)[] =
        await getArrayImagesURL({
          arrayFilesImageURL,
          productName: data.productName,
          nameCollection: 'products',
        });

      if (arrayImagesURLandImageName.length > 0) {
        let arrayImages: GalleryImageURLType[] = [];

        arrayImagesURLandImageName?.forEach(galleryImageURL => {
          if (galleryImageURL) {
            return arrayImages.push(galleryImageURL);
          }
        });
        data.galleryImagesURL = [...state.galleryImagesURL, ...arrayImages];
      }
    }

    if (filesImageURL) {
      const imageURL = await getImageURL({
        nameCollection: 'products',
        filesImageURL,
        productName: data.productName,
        imageName: 'imageURL',
      });

      if (imageURL) {
        data.imageURL = imageURL;
      }
    }

    // console.log('data', data);

    await submitProductCard(data);

    router.replace('/admin/products', {
      scroll: false,
    });

    setIsLoading(false);
  };
  return (
    <>
      <Modal adminRoute="products">
        {isLoading && <AdminLoading />}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div>
              <label className={styles.label}>
                Зображення. Розмір 1920х800.
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
                    ? `/admin/products/?edit=true&product=${productAdressBarName}&description=uk`
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
                    ? `/admin/products/?edit=true&product=${productAdressBarName}&description=en `
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
                    ? `/admin/products/?edit=true&product=${productAdressBarName}&description=tr`
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

          <p className={styles.title}>Галерея. Розмір 800х800.</p>
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
                                  productName,
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
          type="descriptionUK"
          description={descriptionUK}
        />
      )}
      {showDescriptionModal === Lang.EN && (
        <AdminProductDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === Lang.TR && (
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
