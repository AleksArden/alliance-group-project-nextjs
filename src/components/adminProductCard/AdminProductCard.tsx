import styles from './AdminProductCard.module.scss';

import Image from 'next/image';

import {
  GalleryImageURLType,
  ProductServiceType,
} from 'types/dataTypeForFirebase';
import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import { getNameForAdressBar } from 'helpers/functions';
import {
  deleteProductCard,
  moveDownProductCard,
  moveUpProductCard,
} from 'app/api/actionCard/actionsCard';
import Loading from 'app/(adminPage)/loading';
import DeleteModal from 'components/deleteModal/DeleteModal';
import AdminProductModal from 'components/adminProductModal/AdminProductModal';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data: ProductServiceType;
  biggestId: number;
}

const AdminProductCard = ({ data, biggestId }: IProps) => {
  const {
    id,
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
  } = data;
  // console.log('state', data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentProduct = searchParams.get('product');

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

      await deleteProductCard(id, productName, galleryImagesURL);

      setIsLoading(false);
    }
  };
  const handleMoveUp = async () => {
    setIsLoading(true);

    await moveUpProductCard(id);

    setIsLoading(false);
  };
  const handleMoveDown = async () => {
    setIsLoading(true);

    await moveDownProductCard(id);

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
              sizes="(max-width: 1439px) 280px,  400px"
              alt="The photo of product"
              priority
              className={styles.image}
            />
            {id !== 1 && (
              <button
                type="button"
                className={styles.up}
                onClick={handleMoveUp}
              >
                <div className={styles.iconUp}></div>
              </button>
            )}

            {id !== biggestId && (
              <button
                type="button"
                className={styles.down}
                onClick={handleMoveDown}
              >
                <div className={styles.iconDown}></div>
              </button>
            )}
          </div>

          <div className={styles.nameSizeWrapper}>
            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (UA)</p>
                <p className={styles.name}>{nameUK}</p>
              </div>
              {sizeUK && (
                <div>
                  <p className={styles.title}>Розмір продукції (UA)</p>

                  <p className={styles.size}>{sizeUK}</p>
                </div>
              )}
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (EN)</p>
                <p className={styles.name}>{nameEN}</p>
              </div>
              {sizeEN && (
                <div>
                  <p className={styles.title}>Розмір продукції (EN)</p>

                  <p className={styles.size}>{sizeEN}</p>
                </div>
              )}
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (TR)</p>
                <p className={styles.name}>{nameTR}</p>
              </div>
              {sizeTR && (
                <div>
                  <p className={styles.title}>Розмір продукції (TR)</p>

                  <p className={styles.size}>{sizeTR}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.btnContainer}>
            <AdminButton
              btnName="Змінити"
              onClick={() => {
                router.push(
                  `/admin/products/?edit=true&product=${addressBarName}`,
                  {
                    scroll: false,
                  }
                );
              }}
              style={{ width: 100, height: 40, fontSize: 13 }}
            />
            <AdminButton
              btnName="Видалити"
              onClick={() => {
                router.push(
                  `/admin/products/?delete=true&product=${addressBarName}`,
                  {
                    scroll: false,
                  }
                );
              }}
              style={{ width: 100, height: 40, fontSize: 13 }}
            />
          </div>
        </div>
        <div className={styles.gridWrapperSecond}>
          <div>
            <p className={styles.title}>Опис продукції (UA)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionUK} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис продукції (EN)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionEN} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис продукції (TR)</p>
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
                      alt="The photo of ptoduct"
                      priority
                      className={styles.image}
                      fill
                      sizes="(max-width: 1439px) 120px,  150px"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
      {showDeleteModal && currentProduct === addressBarName && (
        <DeleteModal
          handleDelete={handleDelete}
          adminRoute={'products'}
          galleryImagesURL={galleryImagesURL}
          id={id}
          productName={productName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentProduct === addressBarName && (
        <AdminProductModal
          data={data}
          btnName="Змінити"
          productAdressBarName={addressBarName}
        />
      )}
    </>
  );
};
export default AdminProductCard;
