'use client';

import styles from './AdminProductCardsColumn.module.scss';

import { ProductServiceType } from 'types/dataTypeForFirebase';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import AdminProductModal from 'components/adminProductModal/AdminProductModal';
import AdminProductCard from 'components/adminProductCard/AdminProductCard';

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
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map(oneProduct => (
            <AdminProductCard
              key={oneProduct.id}
              data={oneProduct}
              biggestId={data.length}
            />
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() =>
            router.push('/admin/products/?modal=true', { scroll: false })
          }
        >
          Додати Продукцію
        </button>
      </div>
      {showModal && <AdminProductModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminProductCardsColumn;
