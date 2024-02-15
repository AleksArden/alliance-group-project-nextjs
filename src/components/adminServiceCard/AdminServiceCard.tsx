import styles from './AdminServiceCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';

import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';

import { getNameForAdressBar } from 'helpers/functions';
import { useEffect, useState } from 'react';
import Loading from 'app/(adminPage)/loading';
import {
  deleteServiceCard,
  moveDownServiceCard,
  moveUpServiceCard,
} from 'app/api/actionCard/actionsCard';
import AdminServicesModal from 'components/adminServicesModal/AdminServicesModal';
import {
  GalleryImageURLType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';

interface IProps {
  data: ProductServiceType;
  biggestId: number;
}

const AdminServiceCard = ({ data, biggestId }: IProps) => {
  const {
    id,
    imageURL,
    productName,
    nameUK,
    nameEN,
    nameTR,
    descriptionUK,
    descriptionEN,
    descriptionTR,
    galleryImagesURL,
  } = data;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentService = searchParams.get('service');

  const addressBarName = getNameForAdressBar(nameEN);

  useEffect(() => {
    showEditModal || showDeleteModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showDeleteModal, showEditModal]);

  const handleDelete = async (
    id: number,
    productName: string,
    galleryImagesURL: GalleryImageURLType[] | undefined
  ): Promise<void> => {
    if (galleryImagesURL) {
      setIsLoading(true);

      await deleteServiceCard(id, productName, galleryImagesURL);

      setIsLoading(false);
    }
  };
  const handleMoveUp = async () => {
    setIsLoading(true);

    await moveUpServiceCard(id);

    setIsLoading(false);
  };
  const handleMoveDown = async () => {
    setIsLoading(true);

    await moveDownServiceCard(id);

    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loading />}
      <li className={styles.container}>
        <div className={styles.gridWrapperFirst}>
          <div className={styles.imageWrapper}>
            <Image
              src={imageURL}
              fill
              sizes="400px"
              alt="The photo of service"
              priority
              className={styles.image}
            />
            {id !== 1 && (
              <button
                type="button"
                className={styles.up}
                onClick={handleMoveUp}
              >
                Up
              </button>
            )}

            {id !== biggestId && (
              <button
                type="button"
                className={styles.down}
                onClick={handleMoveDown}
              >
                Down
              </button>
            )}
          </div>

          <div className={styles.nameSizeWrapper}>
            <div className={styles.nameSize}>
              <p className={styles.title}>Найменування продукції (UA)</p>
              <p className={styles.nameUk}>{nameUK}</p>
            </div>

            <div className={styles.nameSize}>
              <p className={styles.title}>Найменування продукції (EN)</p>
              <p className={styles.nameEn}>{nameEN}</p>
            </div>

            <div className={styles.nameSize}>
              <p className={styles.title}>Найменування продукції (TR)</p>
              <p className={styles.nameTr}>{nameTR}</p>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              onClick={() =>
                router.push(
                  `/admin/services/?edit=true&service=${addressBarName}`,
                  {
                    scroll: false,
                  }
                )
              }
            >
              Змінити
            </button>
            <button
              className={styles.button}
              onClick={() =>
                router.push(
                  `/admin/services/?delete=true&service=${addressBarName}`,
                  {
                    scroll: false,
                  }
                )
              }
            >
              Видалити
            </button>
          </div>
        </div>
        <div className={styles.gridWrapperSecond}>
          <div>
            <p className={styles.title}>Опис послуги (UK)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionUK} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис послуги (EN)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionEN} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис послуги (TR)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionTR} />
            </div>
          </div>
        </div>
        {galleryImagesURL.length > 0 && (
          <div className={styles.galleryWrapper}>
            <p className={styles.title}>Галерея</p>

            <ul className={styles.list}>
              {galleryImagesURL.map(({ imageURL, imageName }) => (
                <li key={imageName}>
                  <div className={styles.galleryImageWrapper}>
                    <Image
                      src={imageURL}
                      alt="The photo of service"
                      priority
                      className={styles.image}
                      fill
                      sizes="150px"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
      {showDeleteModal && currentService === addressBarName && (
        <DeleteModal
          handleDelete={handleDelete}
          adminRoute={'services'}
          galleryImagesURL={galleryImagesURL}
          id={id}
          productName={productName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentService === addressBarName && (
        <AdminServicesModal
          data={data}
          btnName="Змінити"
          serviceAdressBarName={addressBarName}
        />
      )}
    </>
  );
};
export default AdminServiceCard;
