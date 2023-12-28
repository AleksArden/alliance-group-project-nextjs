'use client';

import { ServiceType } from 'types/dataTypeForFirebase';
import styles from './ServicesCardsColumn.module.scss';

import { useRouter, useSearchParams } from 'next/navigation';

import ServicesModal from 'components/servicesModal/ServicesModal';
import { useEffect, useState } from 'react';
import ServiceCard from 'components/serviceCard/ServiceCard';

interface IProps {
  data: ServiceType[];
}

const ServicesCardsColumn = ({ data }: IProps) => {
  const [biggestId, setBiggestId] = useState(0);
  console.log('service', data);

  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();

  useEffect(() => {
    setBiggestId(data.length + 1);
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map(oneService => {
            console.log('arrServices', data);
            console.log('oneService', oneService);
            return (
              <ServiceCard
                key={oneService.id}
                card={oneService}
                biggestId={data.length}
              />
            );
          })}
        </ul>
        <button
          className={styles.button}
          onClick={() =>
            router.push('/admin/services/?modal=true', { scroll: false })
          }
        >
          Додати Послугу
        </button>
      </div>
      {showModal && <ServicesModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default ServicesCardsColumn;
