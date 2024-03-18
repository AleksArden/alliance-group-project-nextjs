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

  const handleClickAdd = () => {
    router.push('/admin/products/?modal=true', { scroll: false });
  };
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Products Page</h2>

        <AdminButton
          title="Додати продукцію"
          otherBtn={true}
          onClick={handleClickAdd}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            title="Перейти на сайт"
            otherBtn={true}
            onClick={() => {
              router.push('/products-services');
            }}
          />
          <AdminButton title="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          {data.length > 0 && (
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
                title="Додати продукцію"
                otherBtn={true}
                onClick={handleClickAdd}
              />
            </>
          )}
        </div>
      </section>
      {showModal && <AdminProductModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminProductCardsColumn;
