'use client';

import Link from 'next/link';

import styles from './ProductCardsColumn.module.scss';
import ProductModal from 'components/productsModal/ProductsModal';
import { ProductType } from 'types/dataTypeForFirebase';
import { useRouter, useSearchParams } from 'next/navigation';

interface IProps {
  // slug: Record<string, string | null | undefined>;
  data: ProductType[];
}

const ProductCardsColumn = ({ data }: IProps) => {
  // const showModal = slug?.modal;

  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {/* {data.map(oneProduct => (
            <ProductCard key={oneProduct.productId} data={oneProduct} />
          ))} */}
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
      {showModal && <ProductModal btnName="Додати" />}
    </>
  );
};
export default ProductCardsColumn;
