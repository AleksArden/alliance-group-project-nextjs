'use client';

import styles from './AdminProductCardsColumn.module.scss';

import { ProductServiceType } from 'types/dataTypeForFirebase';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import AdminProductModal from 'components/adminProductModal/AdminProductModal';
import AdminProductCard from 'components/adminProductCard/AdminProductCard';
import AdminButton from 'components/adminButton/AdminButton';

interface IProps {
  data: ProductServiceType[];
}

const AdminProductCardsColumn = ({ data }: IProps) => {
  const [biggestId, setBiggestId] = useState(0);
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
        <h2 className={styles.title}>Products Page</h2>
        <AdminButton
          btnName="Додати продукцію"
          onClick={() => {
            router.push('/admin/products/?modal=true', { scroll: false });
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
                {data.map(oneProduct => (
                  <AdminProductCard
                    key={oneProduct.id}
                    data={oneProduct}
                    biggestId={data.length}
                  />
                ))}
              </ul>

              <AdminButton
                btnName="Додати продукцію"
                onClick={() => {
                  router.push('/admin/products/?modal=true', { scroll: false });
                }}
              />
            </>
          </div>
        )}
      </section>
      {showModal && <AdminProductModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminProductCardsColumn;
