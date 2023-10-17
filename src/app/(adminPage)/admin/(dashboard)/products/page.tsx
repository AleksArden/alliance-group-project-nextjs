import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products | Alliance Group',
};

import styles from './Products.module.scss';
import ProductCardsColumn from './productCardsColumn/ProductCardsColumn';
import { getAllProducts } from '@/firebase/getData';
import { Suspense } from 'react';

const AdminProducts = async () => {
  const data = await getAllProducts();
  console.log('AdminProducts', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Products</h2>
      <Suspense fallback={<p>Load....</p>}>
        {data && <ProductCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminProducts;
