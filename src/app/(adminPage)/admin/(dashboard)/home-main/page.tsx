import { Metadata } from 'next';
import HomeMainForm from './homeMainForm/HomeMainForm';
import { getDataFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/Home Main | Alliance Group LLC™',
};
import styles from './HomeMain.module.scss';
import { HomePageType } from 'types/dataTypeForFirebase';

const AdminHomeMain = async () => {
  const data = await getDataFromFirestore<HomePageType>('home');
  // console.log('home-page admin', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Page</h2>
      <HomeMainForm data={data} />
    </div>
  );
};
export default AdminHomeMain;
