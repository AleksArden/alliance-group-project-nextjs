import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Products | Alliance Group',
};

import styles from './HomeProdacts.module.scss';
import HomeProductsForm from './homeProdactsForm/HomeProductsForm';
import { getDataHomeProductsFromFirestore } from '@/firebase/getData';

const AdminHomeProducts = async () => {
  const data = await getDataHomeProductsFromFirestore();
  console.log('homeProducts admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Products</h2>;
      <HomeProductsForm data={data} />
    </div>
  );
};
export default AdminHomeProducts;
