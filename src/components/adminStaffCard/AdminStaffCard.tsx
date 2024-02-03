import { StaffType } from 'types/dataTypeForFirebase';
import styles from './AdminStaffCard.module.scss';
import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';
import StaffModal from 'components/adminStaffModal/AdminStaffModal';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNameForAdressBar } from 'helpers/functions';
import {
  deleteStaffCard,
  moveDownStaffCard,
  moveUpStaffCard,
} from 'app/api/actionCard/action';
import Loading from 'app/(adminPage)/loading';

interface IProps {
  card: StaffType;
  biggestId: number;
}

const AdminStaffCard = ({ card, biggestId }: IProps) => {
  const {
    id,
    imageURL,
    staffName,
    nameUA,
    nameEN,
    nameTR,
    positionUA,
    positionEN,
    positionTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = card;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentStaff = searchParams.get('staff');

  const addressBarName = getNameForAdressBar(nameEN);

  useEffect(() => {
    showEditModal || showDeleteModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showDeleteModal, showEditModal]);

  const handleDelete = async (id: number, staffName: string) => {
    setIsLoading(true);
    await deleteStaffCard(id, staffName);
    setIsLoading(false);
  };
  const handleMoveUp = async () => {
    setIsLoading(true);
    await moveUpStaffCard(id);
    setIsLoading(false);
  };
  const handleMoveDown = async () => {
    setIsLoading(true);
    await moveDownStaffCard(id);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <li className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageURL}
            fill
            sizes="280px"
            alt="The photo of staff"
            priority
            className={styles.image}
          />
          {id !== 1 && (
            <button type="button" className={styles.up} onClick={handleMoveUp}>
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
          <button
            className={styles.button}
            onClick={() =>
              router.push(`/admin/staff/?edit=true&staff=${addressBarName}`, {
                scroll: false,
              })
            }
          >
            Змінити
          </button>
          <button
            className={styles.button}
            onClick={() =>
              router.push(`/admin/staff/?delete=true&staff=${addressBarName}`, {
                scroll: false,
              })
            }
          >
            Видалити
          </button>
        </div>
      </li>
      {showDeleteModal && currentStaff === addressBarName && (
        <DeleteModal
          handleDelete={handleDelete}
          adminRoute={'staff'}
          id={id}
          productName={staffName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentStaff === addressBarName && (
        <StaffModal data={card} btnName="Змінити" />
      )}
    </>
  );
};
export default AdminStaffCard;
