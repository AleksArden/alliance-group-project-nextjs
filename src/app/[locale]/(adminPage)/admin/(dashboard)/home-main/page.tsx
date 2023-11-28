import { Metadata } from 'next';
import HomeMainForm from './homeMainForm/HomeMainForm';
import { getDataHomePageFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/Home Main | Alliance Group',
};
import styles from './HomeMain.module.scss';

const AdminHomeMain = async () => {
  const data = await getDataHomePageFromFirestore();
  console.log('home-page admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Page</h2>
      <HomeMainForm data={data} />
    </div>
  );
};
export default AdminHomeMain;
