import { Metadata } from 'next';
import AboutUsForm from './aboutUsForm/AboutUsForm';
import { getDataAboutUsFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/About us | Alliance Group',
};
import styles from './AboutUs.module.scss';

// export const dynamic = 'force-dynamic';
// // export const revalidate = 30;
// export const fetchCache = 'default-cache';
// export const runtime = 'nodejs';
// export const preferredRegion = 'auto';

const AdminAboutUs = async () => {
  const data = await getDataAboutUsFromFirestore();
  console.log('aboutFormUs', data);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Us</h2>
      <AboutUsForm data={data} />
    </div>
  );
};
export default AdminAboutUs;
