import { Modal } from 'components/Modal/Modal';
import poster from '../../../public/posters/poster-not-found.jpg';
import styles from './AdminServicesModal.module.scss';

import Image from 'next/image';

import { useEffect, useReducer, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  getArrayImagesURL,
  getImageURL,
  getImageURLandImageName,
} from 'helpers/functions';
import {
  useUploadGalleryImageFile,
  useUploadImageFile,
} from 'hooks/useUploadImageFile';
import Loading from 'app/(adminPage)/loading';
import { submitServiceCard } from 'app/api/actionCard/actionsCard';
import AdminServicesDescriptionModal from './adminServicesDescriptionModal/AdminServicesDescriptionModal';
import {
  GalleryImageURLType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
import {
  initStateProductService,
  reducerProductService,
} from 'helpers/reducer';
import { ActionsProductService } from 'types/reducerTypes';
import { deleteGalleryImageFromStorage } from '@/firebase/uploadAndDeleteImage';
import { Lang } from 'types/otherType';

interface IProps {
  data?: ProductServiceType;
  btnName: string;
  id?: number;
  serviceAdressBarName?: string;
}

const AdminServicesModal = ({
  data,
  btnName,
  id,
  serviceAdressBarName,
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
    // console.log('useEffect-service', data);

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

  const handleClick = (type: string, payload: string) => {
    dispatch({ type, payload } as ActionsProductService);
  };

  const handleChange = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
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
          nameCollection: 'services',
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
        nameCollection: 'services',
        filesImageURL,
        productName: data.productName,
        imageName: 'imageURL',
      });

      if (imageURL) {
        data.imageURL = imageURL;
      }
    }

    // console.log('data', data);

    await submitServiceCard(data);

    router.replace('/admin/services', {
      scroll: false,
    });

    setIsLoading(false);
  };
  return (
    <>
      <Modal adminRoute="services">
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
                    alt="The photo of service"
                    priority
                    className={styles.image}
                    sizes="550px"
                    fill
                  />
                </div>
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>
                Найменування послуги (UK)
                <input
                  className={styles.input}
                  type="text"
                  name="nameUK"
                  value={nameUK}
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
                    ? `/admin/services/?edit=true&service=${serviceAdressBarName}&description=uk`
                    : '/admin/services/?modal=true&description=uk',
                  {
                    scroll: false,
                  }
                )
              }
            >
              {descriptionUK
                ? 'Змінити опис послуги UK'
                : 'Додати опис послуги UK'}
            </button>

            <button
              type="button"
              className={styles.button}
              onClick={() =>
                router.replace(
                  data
                    ? `/admin/services/?edit=true&service=${serviceAdressBarName}&description=en `
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
                    ? `/admin/services/?edit=true&service=${serviceAdressBarName}&description=tr`
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
                              alt="The photo of service"
                              priority
                              className={styles.image}
                              fill
                              sizes="130px"
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                galleryImagesURL.splice(idx, 1);
                                await submitServiceCard(state);
                                await deleteGalleryImageFromStorage(
                                  'services',
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
                              alt="The photo of service"
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
        <AdminServicesDescriptionModal
          language="UK"
          handleClick={handleClick}
          type="descriptionUK"
          description={descriptionUK}
        />
      )}
      {showDescriptionModal === Lang.EN && (
        <AdminServicesDescriptionModal
          language="EN"
          handleClick={handleClick}
          type="descriptionEN"
          description={descriptionEN}
        />
      )}
      {showDescriptionModal === Lang.TR && (
        <AdminServicesDescriptionModal
          language="TR"
          handleClick={handleClick}
          type="descriptionTR"
          description={descriptionTR}
        />
      )}
    </>
  );
};
export default AdminServicesModal;
