import Link from 'next/link';
import StaffModal from 'components/staffModal/StaffModal';

import styles from './StaffCardsColumn.module.scss';

import { AddStaffTypeWithId } from 'types/dataTypeForFirebase';
import StaffCard from 'components/staffCard/StaffCard';

interface IProps {
  slug: Record<string, string | null | undefined>;
  data: AddStaffTypeWithId[];
}

const StaffCardsColumn = ({ slug, data }: IProps) => {
  const showModal = slug?.modal;

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map((onePerson: AddStaffTypeWithId) => (
            <StaffCard key={onePerson.id} data={onePerson} />
          ))}
        </ul>
        <Link className={styles.button} href="/admin/staff-list/?modal=true">
          Додати співробітника
        </Link>
      </div>
      {showModal && <StaffModal />}
    </>
  );
};
export default StaffCardsColumn;
