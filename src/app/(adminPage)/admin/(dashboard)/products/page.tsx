import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products | Alliance Group LLC™',
};

import { getAllProducts } from '@/firebase/getData';
import { Suspense } from 'react';

import AdminProductCardsColumn from './adminProductCardsColumn/AdminProductCardsColumn';

import styles from './AdminProducts.module.scss';
import AdminLoading from 'app/(adminPage)/loading';

const AdminProducts = async () => {
  const data = await getAllProducts();
  // console.log('AdminProducts', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Products</h2>
      <Suspense fallback={<AdminLoading />}>
        {data && <AdminProductCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminProducts;
