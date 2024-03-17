import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Services | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { HomeServicesType } from 'types/dataTypeForFirebase';
import HomeServices from './HomeServices';

const AdminHomeServicesPage = async () => {
  const data = await getDataFromFirestore<HomeServicesType>('homePageServices');
  // console.log('homeServices admin', data);
  return <> {data && <HomeServices data={data} />}</>;
};
export default AdminHomeServicesPage;
