import styles from './ServiceCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';

import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';
import ServicesModal from 'components/servicesModal/ServicesModal';
import { deleteServiceCard } from 'app/api/actions';

interface IProps {
  data: ServiceType;
}

const ServiceCard = ({ data }: IProps) => {
  const {
    serviceId,
    imageService,
    imageName,
    nameUA,
    nameEN,
    nameTR,
    descriptionUA,
    descriptionEN,
    descriptionTR,
  } = data;

  const router = useRouter();

  const searchParams = useSearchParams();
  const showDeleteModal = searchParams.has('delete');
  const showEditModal = searchParams.has('edit');
  const currentService = searchParams.get('service');

  const handleDelete = async (id: string, imageName: string) => {
    await deleteServiceCard(id, imageName);
  };
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
              src={imageService}
              fill
              sizes="100vw"
              alt="The staff photo"
              priority
              className={styles.image}
            />
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
                router.push(`/admin/services/?edit=true&service=${nameEN}`, {
                  scroll: false,
                })
              }
            >
              Змінити
            </button>
            <button
              className={styles.button}
              onClick={() =>
                router.push(`/admin/services/?delete=true&service=${nameEN}`, {
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
      {showDeleteModal && currentService === nameEN && (
        <DeleteModal
          handleDelete={handleDelete}
          route={'services'}
          id={serviceId}
          imageName={imageName}
        />
      )}
      {showEditModal && currentService === nameEN && (
        <ServicesModal data={data} btnName="Змінити" serviceName={nameEN} />
      )}
    </>
  );
};
export default ServiceCard;
