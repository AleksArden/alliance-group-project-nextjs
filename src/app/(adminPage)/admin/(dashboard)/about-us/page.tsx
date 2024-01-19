import { Metadata } from 'next';

import { getDataFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/About us | Alliance Group',
};
import styles from './AboutUs.module.scss';
import AboutUsForm from 'components/aboutUsForm/AboutUsForm';
import { AboutUsType } from 'types/dataTypeForFirebase';

const AdminAboutUs = async () => {
  const data = await getDataFromFirestore<AboutUsType>('aboutUs');
  // console.log('aboutFormUs admin', data);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Us</h2>
      <AboutUsForm data={data} />
    </div>
  );
};
export default AdminAboutUs;
