'use client';

import styles from './AdminServicesCardsColumn.module.scss';

import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import AdminServiceCard from 'components/adminServiceCard/AdminServiceCard';
import AdminServicesModal from 'components/adminServicesModal/AdminServicesModal';
import { ProductServiceType } from 'types/dataTypeForFirebase';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data: ProductServiceType[];
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

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showModal]);

  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Services Page</h2>
        <AdminButton
          btnName="Додати послугу"
          onClick={() => {
            router.push('/admin/services/?modal=true', { scroll: false });
          }}
        />
        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/products-services#products-and-services');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        {data.length > 0 && (
          <div className={styles.container}>
            <>
              <ul className={styles.list}>
                {data.map(oneService => (
                  <AdminServiceCard
                    key={oneService.id}
                    data={oneService}
                    biggestId={data.length}
                  />
                ))}
              </ul>
              <AdminButton
                btnName="Додати послугу"
                onClick={() => {
                  router.push('/admin/services/?modal=true', { scroll: false });
                }}
              />
            </>
          </div>
        )}
      </section>
      {showModal && <AdminServicesModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminServicesCardsColumn;
