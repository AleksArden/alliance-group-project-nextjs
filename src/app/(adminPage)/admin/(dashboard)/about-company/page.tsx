import { Metadata } from 'next';

import { getDataFromFirestore } from '@/firebase/getData';

export const metadata: Metadata = {
  title: 'Admin/About company | Alliance Group LLC™',
};
import styles from './AboutCompany.module.scss';
import AboutCompanyForm from 'components/aboutCompanyForm/AboutCompanyForm';
import { AboutCompanyType } from 'types/dataTypeForFirebase';

const AdminAboutCompany = async () => {
  const data = await getDataFromFirestore<AboutCompanyType>('aboutUs');
  console.log('aboutFormUs admin', data);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/About Company</h2>
      <AboutCompanyForm data={data} />
    </div>
  );
};
export default AdminAboutCompany;
