import styles from './ProductCard.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import StaffDeleteModal from 'components/staffDeleteModal/StaffDeleteModal';
import { ProductType } from 'types/dataTypeForFirebase';
import Content from 'components/content/Content';
import { useRouter } from 'next/navigation';

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
  return (
    <>
      <li className={styles.container}>
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
        <ul>
          <li className={styles.nameSize}>
            <p className={styles.nameUa}>{nameUA}</p>
          </li>
          <li className={styles.nameSize}>
            <p className={styles.sizeUa}>{sizeUA}</p>
          </li>
          <li className={styles.nameSize}>
            <p className={styles.nameEn}>{nameEN}</p>
          </li>
          <li className={styles.nameSize}>
            <p className={styles.sizeEn}>{sizeEN}</p>
          </li>
          <li className={styles.nameSize}>
            <p className={styles.nameTr}>{nameTR}</p>
          </li>
          <li className={styles.nameSize}>
            <p className={styles.sizeTr}>{sizeTR}</p>
          </li>
        </ul>

        <ul className={styles.list}>
          <li>
            <Content content={descriptionUA} />
          </li>
          <li>
            <Content content={descriptionEN} />
          </li>
          <li>
            <Content content={descriptionTR} />
          </li>
        </ul>
        <div className={styles.btnContainer}>
          <button
            className={styles.button}
            onClick={() =>
              router.push(`/admin/products/?modal=true&product=${nameEN}`, {
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
      </li>
      {/* {showDeleteModal && orderStaff && (
        <StaffDeleteModal orderStaff={orderStaff} />
      )} */}
      {/* {showEditModal && orderStaff && (
        <StaffModal data={data} btnName="Змінити" />
      )} */}
    </>
  );
};
export default ProductCard;
