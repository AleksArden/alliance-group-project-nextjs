import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products | Alliance Group',
};

import styles from './Products.module.scss';
import ProductCardsColumn from './productCardsColumn/ProductCardsColumn';
import { getAllProducts } from '@/firebase/getData';

interface IProps {
  searchParams: Record<string, string | null | undefined>;
}

const AdminProducts = async ({ searchParams }: IProps) => {
  const data = await getAllProducts();
  console.log('AdminProducts', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Products</h2>
      {data && (
        <ProductCardsColumn
          // slug={searchParams}
          data={data}
        />
      )}
    </div>
  );
};
export default AdminProducts;
