import { Metadata } from 'next';
import HomePageForm from './homePageForm/HomePageForm';
export const metadata: Metadata = {
  title: 'Admin/Home Page | Alliance Group',
};
import styles from './HomePage.module.scss';

const AdminHomePage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Home Page</h2>
      <HomePageForm />
    </div>
  );
};
export default AdminHomePage;
