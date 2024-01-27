import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Intro | Alliance Group LLC™',
};

import styles from './HomeIntro.module.scss';
import HomeIntroForm from './homeIntroForm/HomeIntroForm';
import { getDataFromFirestore } from '@/firebase/getData';
import { IntroType } from 'types/dataTypeForFirebase';

const AdminHomeIntro = async () => {
  const data = await getDataFromFirestore<IntroType>('intro');
  // console.log('intro admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Intro</h2>;
      <HomeIntroForm data={data} />
    </div>
  );
};
export default AdminHomeIntro;
