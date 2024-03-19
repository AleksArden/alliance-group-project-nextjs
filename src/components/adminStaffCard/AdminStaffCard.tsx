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
} from 'app/api/actionCard/actionsCard';
import Loading from 'app/(adminPage)/loading';
import AdminButton from 'components/adminButton/AdminButton';

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
        <ul className={styles.stuffWrapper}>
          <li className={styles.columnWrapper}>
            <ul>
              <li>
                <p className={styles.title}>Імя та Призвище (UK)</p>
              </li>
              <li>
                <p className={styles.name}>{nameUA}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Імя та Призвище (EN)</p>
              </li>
              <li>
                <p className={styles.name}>{nameEN}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Імя та Призвище (TR)</p>
              </li>
              <li>
                <p className={styles.name}>{nameTR}</p>
              </li>
            </ul>
          </li>
          <li className={styles.columnWrapper}>
            <ul>
              <li>
                <p className={styles.title}>Посада (UK)</p>
              </li>
              <li>
                <p className={styles.name}>{positionUA}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Посада (EN)</p>
              </li>
              <li>
                <p className={styles.name}>{positionEN}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Посада (TR)</p>
              </li>
              <li>
                <p className={styles.name}>{positionTR}</p>
              </li>
            </ul>
          </li>
          <li className={styles.columnWrapper}>
            <ul>
              <li>
                <p className={styles.title}>Характеристика (UK)</p>
              </li>
              <li>
                <p>{descriptionUA}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Характеристика (EN)</p>
              </li>
              <li>
                <p>{descriptionEN}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p className={styles.title}>Характеристика (TR)</p>
              </li>
              <li>
                <p>{descriptionTR}</p>
              </li>
            </ul>
          </li>
        </ul>

        <div className={styles.btnContainer}>
          <AdminButton
            btnName="Змінити"
            onClick={() =>
              router.push(`/admin/staff/?edit=true&staff=${addressBarName}`, {
                scroll: false,
              })
            }
            style={{ width: 100, height: 40, fontSize: 13 }}
          />
          <AdminButton
            btnName="Видалити"
            onClick={() =>
              router.push(`/admin/staff/?delete=true&staff=${addressBarName}`, {
                scroll: false,
              })
            }
            style={{ width: 100, height: 40, fontSize: 13 }}
          />
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
