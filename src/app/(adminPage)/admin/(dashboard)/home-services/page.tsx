import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Services | Alliance Group',
};

import styles from './HomeServices.module.scss';
import HomeSerevicesForm from './homeServicesForm/HomeServicesForm';
import { getDataFromFirestore } from '@/firebase/getData';
import { HomeServicesType } from 'types/dataTypeForFirebase';

const AdminHomeServices = async () => {
  const data = await getDataFromFirestore<HomeServicesType>('homeServices');
  // console.log('homeServices admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Services</h2>;
      <HomeSerevicesForm data={data} />
    </div>
  );
};
export default AdminHomeServices;
