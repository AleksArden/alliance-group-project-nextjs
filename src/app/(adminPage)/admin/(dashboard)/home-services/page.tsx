import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Services | Alliance Group',
};

import styles from './HomeServices.module.scss';
import HomeSerevicesForm from './homeServicesForm/HomeServicesForm';
import { getDataHomeServicesFromFirestore } from '@/firebase/getData';

const AdminHomeServices = async () => {
  const data = await getDataHomeServicesFromFirestore();
  // console.log('homeServices admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Services</h2>;
      <HomeSerevicesForm data={data} />
    </div>
  );
};
export default AdminHomeServices;
