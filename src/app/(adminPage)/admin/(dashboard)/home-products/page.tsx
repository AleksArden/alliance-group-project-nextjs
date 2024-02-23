import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Products | Alliance Group LLC™',
};

import styles from './HomeProducts.module.scss';
import HomeProductsForm from './homeProductsForm/HomeProductsForm';
import { getDataFromFirestore } from '@/firebase/getData';
import { HomeProductsType } from 'types/dataTypeForFirebase';

const AdminHomeProducts = async () => {
  const data = await getDataFromFirestore<HomeProductsType>('homePageProducts');
  // console.log('homeProducts admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Products</h2>
      <HomeProductsForm data={data} />
    </div>
  );
};
export default AdminHomeProducts;
