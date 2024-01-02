'use client';

import { ServiceType } from 'types/dataTypeForFirebase';
import styles from './AdminServicesCardsColumn.module.scss';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import AdminServiceCard from 'components/adminServiceCard/AdminServiceCard';
import AdminServicesModal from 'components/adminServicesModal/AdminServicesModal';

interface IProps {
  data: ServiceType[];
}

const AdminServicesCardsColumn = ({ data }: IProps) => {
  const [biggestId, setBiggestId] = useState(0);
  // console.log('service', data);

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
            // console.log('arrServices', data);
            // console.log('oneService', oneService);
            return (
              <AdminServiceCard
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
      {showModal && <AdminServicesModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminServicesCardsColumn;
