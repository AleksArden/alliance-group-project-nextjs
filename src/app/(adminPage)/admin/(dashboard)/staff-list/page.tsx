import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Staff List | Alliance Group',
};
import styles from './StaffList.module.scss';

import { getAllStaff } from '@/firebase/getData';
import StaffCardsColumn from './staffCardsColumn/StaffCardsColumn';

export const revalidate = 18000;

interface IProps {
  searchParams: Record<string, string | null | undefined>;
}

const AdminStaffList = async ({ searchParams }: IProps) => {
  const data = await getAllStaff();
  // console.log('AdminStaffPage', data);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Staff List</h2>
      {data && <StaffCardsColumn slug={searchParams} data={data} />}
    </div>
  );
};
export default AdminStaffList;
