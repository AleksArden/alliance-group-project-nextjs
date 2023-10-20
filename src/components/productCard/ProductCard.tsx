import styles from './ProductCard.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import StaffDeleteModal from 'components/staffDeleteModal/StaffDeleteModal';
import { ProductType } from 'types/dataTypeForFirebase';

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
        <ul className={styles.list}>
          <li>
            <p>{nameUA}</p>
          </li>
          <li>
            <p>{sizeUA}</p>
          </li>
          <li>
            <p>{descriptionUA}</p>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <p>{nameEN}</p>
          </li>
          <li>
            <p>{sizeEN}</p>
          </li>
          <li>
            <p>{descriptionEN}</p>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <p>{nameTR}</p>
          </li>
          <li>
            <p>{sizeTR}</p>
          </li>
          <li>
            <p>{descriptionTR}</p>
          </li>
        </ul>
        <div className={styles.btnContainer}>
          <Link
            className={styles.button}
            href={`/admin/staff-list/?edit=true&staff=${1}`}
          >
            Змінити
          </Link>
          <Link
            className={styles.button}
            href={`/admin/staff-list/?delete=true&staff=${2}`}
          >
            Видалити
          </Link>
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
