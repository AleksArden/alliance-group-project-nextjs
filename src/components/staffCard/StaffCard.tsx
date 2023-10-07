import { StaffType } from 'types/dataTypeForFirebase';
import styles from './StaffCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import StaffDeleteModal from 'components/staffDeleteModal/StaffDeleteModal';
import StaffModal from 'components/staffModal/StaffModal';

interface IProps {
  data: StaffType;
  slug: Record<string, string | null | undefined>;
}

const StaffCardsList = ({ data, slug }: IProps) => {
  const showDeleteModal = slug.delete;
  const showEditModal = slug.edit;
  const orderStaff = slug.staff;
  const {
    order,
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
    <>
      <li className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={photoStaff}
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
          <Link
            className={styles.button}
            href={`/admin/staff-list/?edit=true&staff=${order}`}
          >
            Змінити
          </Link>
          <Link
            className={styles.button}
            href={`/admin/staff-list/?delete=true&staff=${order}`}
          >
            Видалити
          </Link>
        </div>
      </li>
      {showDeleteModal && orderStaff && (
        <StaffDeleteModal orderStaff={orderStaff} />
      )}
      {showEditModal && orderStaff && (
        <StaffModal data={data} btnName="Змінити" />
      )}
    </>
  );
};
export default StaffCardsList;
