import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin/Staff List | Alliance Group',
};
import styles from './StaffList.module.scss';
import StaffColumn from './staffCardsColumn/StaffCardsColumn';

export const revalidate = 18000;

interface IProps {
  searchParams: Record<string, string | null | undefined>;
}

const AdminStaffList = ({ searchParams }: IProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin/Staff List</h2>

      <StaffColumn slug={searchParams} />
    </div>
  );
};
export default AdminStaffList;
