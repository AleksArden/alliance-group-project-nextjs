import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Intro | Alliance Group LLC™',
};

import { getDataFromFirestore } from '@/firebase/getData';
import { IntroType } from 'types/dataTypeForFirebase';
import HomeIntro from './HomeIntro';

const AdminHomeIntroPage = async () => {
  const data = await getDataFromFirestore<IntroType>('homePageIntro');
  // console.log('intro admin', data);
  return <> {data && <HomeIntro data={data} />}</>;
};
export default AdminHomeIntroPage;
