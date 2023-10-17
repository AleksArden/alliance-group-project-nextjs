import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Staff List | Alliance Group',
};
import styles from './StaffList.module.scss';

import { getAllStaff } from '@/firebase/getData';
import StaffCardsColumn from './staffCardsColumn/StaffCardsColumn';

const AdminStaffList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const data = await getAllStaff();
  console.log('AdminStaffPage', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Staff List</h2>
      {data && <StaffCardsColumn slug={searchParams} data={data} />}
    </div>
  );
};
export default AdminStaffList;
