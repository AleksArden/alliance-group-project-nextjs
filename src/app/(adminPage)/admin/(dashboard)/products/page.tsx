import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Products | Alliance Group LLC™',
};

import { getAllCards } from '@/firebase/getData';
import { Suspense } from 'react';

import AdminProductCardsColumn from './adminProductCardsColumn/AdminProductCardsColumn';

import AdminLoading from 'app/(adminPage)/loading';
import { ProductServiceType } from 'types/dataTypeForFirebase';

const AdminProducts = async () => {
  const data = await getAllCards<ProductServiceType>('products');
  // console.log('AdminProducts', data);
  return (
    <Suspense fallback={<AdminLoading />}>
      {data && <AdminProductCardsColumn data={data} />}
    </Suspense>
  );
};
export default AdminProducts;
