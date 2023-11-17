import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Services | Alliance Group',
};
import styles from './Services.module.scss';

import { Suspense } from 'react';
import ServicesCardsColumn from './servicesCardsColumn/ServicesCardsColumn';
import { getAllServices } from '@/firebase/getData';
import Loading from 'app/(marketing)/loading';

const AdminServises = async () => {
  const data = await getAllServices();
  console.log('AdminServices', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Services</h2>
      <Suspense fallback={<Loading />}>
        {data && <ServicesCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminServises;
