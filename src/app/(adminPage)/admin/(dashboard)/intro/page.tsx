import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin/Intro | Alliance Group',
};

import styles from './Intro.module.scss';
import IntroForm from './introForm/IntroForm';
import { getDataIntroFromFirestore } from '@/firebase/getData';

const AdminIntro = async () => {
  const data = await getDataIntroFromFirestore();
  console.log('intro admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Intro</h2>;
      <IntroForm data={data} />
    </div>
  );
};
export default AdminIntro;
