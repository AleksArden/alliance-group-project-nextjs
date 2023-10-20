'use client';

import styles from './ProductCardsColumn.module.scss';
import ProductModal from 'components/productsModal/ProductsModal';
import { ProductType } from 'types/dataTypeForFirebase';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from 'components/productCard/ProductCard';

interface IProps {
  data: ProductType[];
}

const ProductCardsColumn = ({ data }: IProps) => {
  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map(oneProduct => (
            <ProductCard key={oneProduct.productId} data={oneProduct} />
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
      {showModal && <ProductModal btnName="Додати" />}
    </>
  );
};
export default ProductCardsColumn;
