import { StaffType } from 'types/dataTypeForFirebase';
import styles from './StaffCard.module.scss';
import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';
import StaffModal from 'components/staffModal/StaffModal';
import { useState } from 'react';
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

const StaffCards = ({ card, biggestId }: IProps) => {
  console.log('staffCard', card);
  const {
    id,
    imageURL,
    imageName,
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

  const staffName = getNameForAdressBar(nameEN);

  const handleDelete = async (id: number, imageName: string) => {
    setIsLoading(true);
    await deleteStaffCard(id, imageName);
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
              router.push(`/admin/staff-list/?edit=true&staff=${staffName}`, {
                scroll: false,
              })
            }
          >
            Змінити
          </button>
          <button
            className={styles.button}
            onClick={() =>
              router.push(`/admin/staff-list/?delete=true&staff=${staffName}`, {
                scroll: false,
              })
            }
          >
            Видалити
          </button>
        </div>
      </li>
      {showDeleteModal && currentStaff === staffName && (
        <DeleteModal
          handleDelete={handleDelete}
          adminRoute={'staff-list'}
          id={id}
          imageName={imageName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentStaff === staffName && (
        <StaffModal data={card} btnName="Змінити" />
      )}
    </>
  );
};
export default StaffCards;
