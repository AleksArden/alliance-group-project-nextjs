import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Products | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { HomeProductsType } from 'types/dataTypeForFirebase';
import HomeProducts from './HomeProducts';

const AdminHomeProductsPage = async () => {
  const data = await getDataFromFirestore<HomeProductsType>('homePageProducts');
  // console.log('homeProducts admin', data);
  return <> {data && <HomeProducts data={data} />}</>;
};
export default AdminHomeProductsPage;
