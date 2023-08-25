import { Metadata } from 'next';
import HomePageForm from './homePageForm/HomePageForm';
import { getDataHomePageFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/Home Page | Alliance Group',
};
import styles from './HomePage.module.scss';

const AdminHomePage = async () => {
  const data = await getDataHomePageFromFirestore();
  console.log('home-page', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Page</h2>
      <HomePageForm data={data} />
    </div>
  );
};
export default AdminHomePage;
