import { Metadata } from 'next';

import { getDataAboutUsFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/About us | Alliance Group',
};
import styles from './AboutUs.module.scss';

export const revalidate = 3600;
// export const fetchCache = 'only-cache';
const AdminAboutUs = async () => {
  const data = await getDataAboutUsFromFirestore();
  console.log('aboutFormUs admin', data);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Us</h2>
    </div>
  );
};
export default AdminAboutUs;
