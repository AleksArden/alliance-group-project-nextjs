import { Metadata } from 'next';
import AboutUsForm from './AboutUsForm/AboutUsForm';
export const metadata: Metadata = {
  title: 'Admin/About us | Alliance Group',
};
import styles from './AboutUs.module.scss';

const AdminAboutUs = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Us</h2>
      <AboutUsForm />
    </div>
  );
};
export default AdminAboutUs;
