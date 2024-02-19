import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Services | Alliance Group LLC™',
};
import styles from './AdminServices.module.scss';

import { Suspense } from 'react';

import { getAllCards } from '@/firebase/getData';
import Loading from '../../../loading';
import AdminServicesCardsColumn from './adminServicesCardsColumn/AdminServicesCardsColumn';
import AdminLoading from '../../../loading';
import { ProductServiceType } from 'types/dataTypeForFirebase';

const AdminServises = async () => {
  const data = await getAllCards<ProductServiceType>('services');
  // console.log('AdminServices', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Services</h2>
      <Suspense fallback={<AdminLoading />}>
        {data && <AdminServicesCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminServises;
