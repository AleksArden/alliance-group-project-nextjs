import styles from './ProductCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';
import { ProductType } from 'types/dataTypeForFirebase';
import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductModal from 'components/productsModal/ProductsModal';

interface IProps {
  data: ProductType;
}

const ProductCard = ({ data }: IProps) => {
  const {
    productId,
    imageProduct,
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

  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentProduct = searchParams.get('product');
  return (
    <>
      <li className={styles.container}>
        <div className={styles.gridWrapperFirst}>
          {/* <div>
            <form>
              <input name="orderNew" type="hidden" value={1} />
              <input name="order" type="hidden" value={2} />
              <button type="submit">Up</button>
            </form>
          </div> */}
          <div className={styles.imageWrapper}>
            <Image
              src={imageProduct}
              fill
              sizes="100vw"
              alt="The staff photo"
              priority
              className={styles.image}
            />
          </div>

          <div className={styles.nameSizeWrapper}>
            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (UA)</p>
                <p className={styles.nameUa}>{nameUA}</p>
              </div>
              <div>
                <p className={styles.title}>Розмір продукції (UA)</p>

                <p className={styles.sizeUa}>{sizeUA}</p>
              </div>
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (EN)</p>
                <p className={styles.nameEn}>{nameEN}</p>
              </div>
              <div>
                <p className={styles.title}>Розмір продукції (EN)</p>

                <p className={styles.sizeEn}>{sizeEN}</p>
              </div>
            </div>

            <div className={styles.nameSize}>
              <div>
                <p className={styles.title}>Найменування продукції (TR)</p>
                <p className={styles.nameTr}>{nameTR}</p>
              </div>
              <div>
                <p className={styles.title}>Розмір продукції (TR)</p>

                <p className={styles.sizeTr}>{sizeTR}</p>
              </div>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              onClick={() =>
                router.push(`/admin/products/?edit=true&product=${nameEN}`, {
                  scroll: false,
                })
              }
            >
              Змінити
            </button>
            <button
              className={styles.button}
              onClick={() =>
                router.push(`/admin/products/?delete=true&product=${nameEN}`, {
                  scroll: false,
                })
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
      {showDeleteModal && productId && (
        <DeleteModal
          id={productId}
          nameCollection="products"
          route="products"
        />
      )}
      {showEditModal && productId && currentProduct === nameEN && (
        <ProductModal data={data} btnName="Змінити" />
      )}
    </>
  );
};
export default ProductCard;
