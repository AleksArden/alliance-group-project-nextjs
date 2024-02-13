import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Services | Alliance Group LLC™',
};
import styles from './AdminServices.module.scss';

import { Suspense } from 'react';

import { getAllServices } from '@/firebase/getData';
import Loading from '../../../loading';
import AdminServicesCardsColumn from './adminServicesCardsColumn/AdminServicesCardsColumn';

const AdminServises = async () => {
  const data = await getAllServices();
  // console.log('AdminServices', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Services</h2>
      <Suspense fallback={<Loading />}>
        {data && <AdminServicesCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminServises;
