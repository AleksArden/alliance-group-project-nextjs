import styles from './ServiceCard.module.scss';

import Image from 'next/image';

import DeleteModal from 'components/deleteModal/DeleteModal';

import Content from 'components/content/Content';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceType } from 'types/dataTypeForFirebase';
import ServicesModal from 'components/servicesModal/ServicesModal';
import { deleteServiceCard } from 'app/api/actions';
import { getName } from 'helpers/functions';

interface IProps {
  data: ServiceType;
}

const ServiceCard = ({ data }: IProps) => {
  const {
    id,
    image,
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

  const serviceName = getName(nameEN);
  // console.log(serviceName);

  const handleDelete = async (id: number, imageName: string) => {
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
              src={image}
              fill
              sizes="100vw"
              alt="The photo"
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
      {showDeleteModal && currentService === serviceName && (
        <DeleteModal
          handleDelete={handleDelete}
          route={'services'}
          id={id}
          imageName={imageName}
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
