'use client';

import styles from './ProductCardsColumn.module.scss';
import ProductModal from 'components/productsModal/ProductsModal';
import { ProductType } from 'types/dataTypeForFirebase';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from 'components/productCard/ProductCard';
import { useEffect, useState } from 'react';

interface IProps {
  data: ProductType[];
}

const ProductCardsColumn = ({ data }: IProps) => {
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
            <ProductCard
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
      {showModal && <ProductModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default ProductCardsColumn;
