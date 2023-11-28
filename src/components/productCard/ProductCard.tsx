import styles from './ProductCard.module.scss';

import Image from 'next/image';

import { ProductType } from 'types/dataTypeForFirebase';
import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductModal from 'components/productsModal/ProductsModal';
import { useState } from 'react';
import { getNameForAdressBar } from 'helpers/functions';
import {
  deleteProductCard,
  moveDownProductCard,
  moveUpProductCard,
} from 'app/api/actionCard/action';
import Loading from 'app/(adminPage)/loading';
import DeleteModal from 'components/deleteModal/DeleteModal';

interface IProps {
  data: ProductType;
  biggestId: number;
}

const ProductCard = ({ data, biggestId }: IProps) => {
  const {
    id,
    imageURL,
    imageName,
    nameUA,
    nameEN,
    nameTR,
    sizeUA,
    sizeEN,
    sizeTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = data;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentProduct = searchParams.get('product');

  const productName = getNameForAdressBar(nameEN);
  const handleDelete = async (id: number, imageName: string) => {
    setIsLoading(true);
    await deleteProductCard(id, imageName);
    setIsLoading(false);
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
              sizes="400px"
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
              <div>
                <p className={styles.title}>Найменування продукції (UA)</p>
                <p className={styles.nameUa}>{nameUA}</p>
              </div>
              {sizeUA && (
                <div>
                  <p className={styles.title}>Розмір продукції (UA)</p>

                  <p className={styles.sizeUa}>{sizeUA}</p>
                </div>
              )}
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (EN)</p>
                <p className={styles.nameEn}>{nameEN}</p>
              </div>
              {sizeEN && (
                <div>
                  <p className={styles.title}>Розмір продукції (EN)</p>

                  <p className={styles.sizeEn}>{sizeEN}</p>
                </div>
              )}
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (TR)</p>
                <p className={styles.nameTr}>{nameTR}</p>
              </div>
              {sizeTR && (
                <div>
                  <p className={styles.title}>Розмір продукції (TR)</p>

                  <p className={styles.sizeTr}>{sizeTR}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              onClick={() =>
                router.push(
                  `/admin/products/?edit=true&product=${productName}`,
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
                  `/admin/products/?delete=true&product=${productName}`,
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
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис продукції (UA)</p>
            <Content content={descriptionUA} />
          </div>{' '}
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис продукції (EN)</p>
            <Content content={descriptionEN} />
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис продукції (TR)</p>
            <Content content={descriptionTR} />
          </div>
        </div>
      </li>
      {showDeleteModal && currentProduct === productName && (
        <DeleteModal
          handleDelete={handleDelete}
          route={'products'}
          id={id}
          imageName={imageName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentProduct === productName && (
        <ProductModal data={data} btnName="Змінити" productName={productName} />
      )}
    </>
  );
};
export default ProductCard;
