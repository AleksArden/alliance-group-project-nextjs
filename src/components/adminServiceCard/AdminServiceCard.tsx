import styles from './AdminServiceCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';

import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';

import { getNameForAdressBar } from 'helpers/functions';
import { useState } from 'react';
import Loading from 'app/(adminPage)/loading';
import {
  deleteServiceCard,
  moveDownServiceCard,
  moveUpServiceCard,
} from 'app/api/actionCard/action';
import AdminServicesModal from 'components/adminServicesModal/AdminServicesModal';

interface IProps {
  card: ServiceType;
  biggestId: number;
}

const AdminServiceCard = ({ card, biggestId }: IProps) => {
  console.log('serviceCard', card);

  const {
    id,
    imageURL,
    imageName,
    nameUK,
    nameEN,
    nameTR,
    descriptionUK,
    descriptionEN,
    descriptionTR,
  } = card;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentService = searchParams.get('service');

  const serviceName = getNameForAdressBar(nameEN);

  const handleDelete = async (id: number, imageName: string) => {
    setIsLoading(true);
    await deleteServiceCard(id, imageName);
    setIsLoading(false);
  };
  const handleMoveUp = async () => {
    setIsLoading(true);
    await moveUpServiceCard(id);
    setIsLoading(false);
  };
  const handleMoveDown = async () => {
    setIsLoading(true);
    await moveDownServiceCard(id);
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
              alt="The photo of service"
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
              <p className={styles.title}>Найменування продукції (UA)</p>
              <p className={styles.nameUk}>{nameUK}</p>
            </div>

            <div className={styles.nameSize}>
              <p className={styles.title}>Найменування продукції (EN)</p>
              <p className={styles.nameEn}>{nameEN}</p>
            </div>

            <div className={styles.nameSize}>
              <p className={styles.title}>Найменування продукції (TR)</p>
              <p className={styles.nameTr}>{nameTR}</p>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              onClick={() =>
                router.push(
                  `/admin/services/?edit=true&service=${serviceName}`,
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
                  `/admin/services/?delete=true&service=${serviceName}`,
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
          <div>
            <p className={styles.title}>Опис послуги (UK)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionUK} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис послуги (EN)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionEN} />
            </div>
          </div>
          <div>
            <p className={styles.title}>Опис послуги (TR)</p>
            <div className={styles.contentWrapper}>
              <Content content={descriptionTR} />
            </div>
          </div>
        </div>
      </li>
      {/* {showDeleteModal && currentService === serviceName && (
        <DeleteModal
          handleDelete={handleDelete}
          adminRoute={'services'}
          id={id}
          productName={imageName}
          isLoading={isLoading}
        />
      )} */}
      {showEditModal && currentService === serviceName && (
        <AdminServicesModal
          data={card}
          btnName="Змінити"
          serviceName={serviceName}
        />
      )}
    </>
  );
};
export default AdminServiceCard;
