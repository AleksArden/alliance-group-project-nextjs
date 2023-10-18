import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Home Intro | Alliance Group',
};

import styles from './HomeIntro.module.scss';
import HomeIntroForm from './homeIntroForm/HomeIntroForm';
import { getDataIntroFromFirestore } from '@/firebase/getData';

const AdminHomeIntro = async () => {
  const data = await getDataIntroFromFirestore();
  console.log('intro admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Intro</h2>;
      <HomeIntroForm data={data} />
    </div>
  );
};
export default AdminHomeIntro;
