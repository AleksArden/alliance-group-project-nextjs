import Link from 'next/link';

import styles from './ProductCardsColumn.module.scss';
import ProductModal from 'components/productsModal/ProductsModal';
import { ProductType } from 'types/dataTypeForFirebase';

interface IProps {
  slug: Record<string, string | null | undefined>;
  data: ProductType[];
}

const ProductCardsColumn = ({ slug, data }: IProps) => {
  const showModal = slug?.modal;

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {/* {data.map(oneProduct => (
            <ProductCard key={oneProduct.productId} data={oneProduct} slug={slug} />
          ))} */}
        </ul>
        <Link className={styles.button} href="/admin/products/?modal=true">
          Додати Продукцію
        </Link>
      </div>
      {showModal && <ProductModal btnName="Додати" slug={slug} />}
    </>
  );
};
export default ProductCardsColumn;
