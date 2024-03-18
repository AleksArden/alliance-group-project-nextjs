import { Metadata } from 'next';

import { getDataFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/About company | Alliance Group LLC™',
};

import { AboutCompanyType } from 'types/dataTypeForFirebase';
import AboutCompany from './AboutCompany';

const AdminAboutCompany = async () => {
  const data = await getDataFromFirestore<AboutCompanyType>('aboutCompanyPage');
  // console.log('aboutFormUs admin', data);

  return <> {data && <AboutCompany data={data} />}</>;
};
export default AdminAboutCompany;
