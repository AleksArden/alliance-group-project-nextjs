import { Metadata } from 'next';
import AboutUsForm from './AboutUsForm/AboutUsForm';

export const metadata: Metadata = {
  title: 'Admin/About us | Alliance Group',
};
import styles from './AboutUs.module.scss';
import { getDataFromFirestore } from '@/firebase/getData';

export const dynamic = 'force-dynamic';
// export const revalidate = 30;
export const fetchCache = 'default-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

const AdminAboutUs = async () => {
  const data = await getDataFromFirestore('about-us');
  console.log('aboutFormUs', data?.imageURL);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Us</h2>
      <AboutUsForm data={data} />
    </div>
  );
};
export default AdminAboutUs;
