import { Metadata } from 'next';

import { getDataFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/Home Main | Alliance Group LLC™',
};

import { HomePageType } from 'types/dataTypeForFirebase';

import HomeMain from './HomeMain';

const AdminHomeMainPage = async () => {
  const data = await getDataFromFirestore<HomePageType>('homePageHero');
  // console.log('home-page admin', data);
  return <> {data && <HomeMain data={data} />}</>;
};
export default AdminHomeMainPage;
