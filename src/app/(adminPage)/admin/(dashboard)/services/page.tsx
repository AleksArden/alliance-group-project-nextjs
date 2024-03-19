import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Services | Alliance Group LLC™',
};

import { Suspense } from 'react';

import { getAllCards } from '@/firebase/getData';

import AdminServicesCardsColumn from './adminServicesCardsColumn/AdminServicesCardsColumn';
import AdminLoading from '../../../loading';
import { ProductServiceType } from 'types/dataTypeForFirebase';

const AdminServises = async () => {
  const data = await getAllCards<ProductServiceType>('services');
  // console.log('AdminServices', data);
  return (
    <Suspense fallback={<AdminLoading />}>
      {data && <AdminServicesCardsColumn data={data} />}
    </Suspense>
  );
};
export default AdminServises;
