import { AddStaffTypeWithId } from 'types/dataTypeForFirebase';
import styles from './StaffCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  data: AddStaffTypeWithId;
}

const StaffCardsList = ({ data }: IProps) => {
  const {
    photoStaff,
    nameUA,
    nameEN,
    nameTR,
    positionUA,
    positionEN,
    positionTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = data;
  return (
    <li className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={photoStaff}
          fill
          sizes="100vw"
          alt="The staff photo"
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <ul className={styles.list}>
        <li>
          <p>{nameUA}</p>
        </li>
        <li>
          <p>{positionUA}</p>
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
          <p>{positionEN}</p>
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
          <p>{positionTR}</p>
        </li>
        <li>
          <p>{descriptionTR}</p>
        </li>
      </ul>
      <div className={styles.btnContainer}>
        <Link className={styles.button} href={''}>
          Змінити
        </Link>
        <Link className={styles.button} href={''}>
          Видалити
        </Link>
      </div>
    </li>
  );
};
export default StaffCardsList;
