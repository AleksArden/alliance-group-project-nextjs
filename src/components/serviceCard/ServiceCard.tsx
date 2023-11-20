import styles from './ServiceCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';

import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';
import ServicesModal from 'components/servicesModal/ServicesModal';

import { getNameForAdressBar } from 'helpers/functions';
import { useState } from 'react';
import Loading from 'app/(marketing)/loading';
import {
  deleteServiceCard,
  moveDownServiceCard,
  moveUpServiceCard,
} from 'app/api/actionCard/action';

interface IProps {
  data: ServiceType;
  biggestId: number;
}

const ServiceCard = ({ data, biggestId }: IProps) => {
  const {
    id,
    imageURL,
    imageName,
    nameUA,
    nameEN,
    nameTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = data;
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
              <p className={styles.nameUa}>{nameUA}</p>
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
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис послуги (UA)</p>
            <Content content={descriptionUA} />
          </div>{' '}
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис послуги (EN)</p>
            <Content content={descriptionEN} />
          </div>
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Опис послуги (TR)</p>
            <Content content={descriptionTR} />
          </div>
        </div>
      </li>
      {showDeleteModal && currentService === serviceName && (
        <DeleteModal
          handleDelete={handleDelete}
          route={'services'}
          id={id}
          imageName={imageName}
          isLoading={isLoading}
        />
      )}
      {showEditModal && currentService === serviceName && (
        <ServicesModal
          data={data}
          btnName="Змінити"
          serviceName={serviceName}
        />
      )}
    </>
  );
};
export default ServiceCard;
