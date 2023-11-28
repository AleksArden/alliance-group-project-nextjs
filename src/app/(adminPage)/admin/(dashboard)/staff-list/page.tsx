import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Staff List | Alliance Group',
};
import styles from './StaffList.module.scss';
import { Suspense } from 'react';
import { getAllStaff } from '@/firebase/getData';
import StaffCardsColumn from './staffCardsColumn/StaffCardsColumn';
import Loading from '../../../loading';

const AdminStaffList = async () => {
  const data = await getAllStaff();
  console.log('AdminStaffPage', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Staff List</h2>
      <Suspense fallback={<Loading />}>
        {data && <StaffCardsColumn data={data} />}
      </Suspense>
    </div>
  );
};
export default AdminStaffList;
