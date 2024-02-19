import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Staff | Alliance Group LLC™',
};
import styles from './AdminStaff.module.scss';
import { Suspense } from 'react';
import { getAllCards } from '@/firebase/getData';

import Loading from '../../../loading';
import AdminStaffCardsColumn from './adminStaffCardsColumn/AdminStaffCardsColumn';
import AdminLoading from '../../../loading';
import { StaffType } from 'types/dataTypeForFirebase';

const AdminStaff = async () => {
  const data = await getAllCards<StaffType>('staff');
  // console.log('AdminStaffPage', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Staff</h2>
      <Suspense fallback={<AdminLoading />}>
        {data && <AdminStaffCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminStaff;
