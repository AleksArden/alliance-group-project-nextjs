import Link from 'next/link';
import StaffModal from 'components/staffModal/StaffModal';

import styles from './StaffCardsColumn.module.scss';
import StaffCardsList from 'components/staffCardsList/StaffCardsList';
import { AddStaffTypeWithId } from 'types/dataTypeForFirebase';

interface IProps {
  slug: Record<string, string | null | undefined>;
  data: AddStaffTypeWithId[];
}

const StaffCardsColumn = ({ slug, data }: IProps) => {
  const showModal = slug?.modal;

  return (
    <>
      <div className={styles.container}>
        <StaffCardsList data={data} />
        <Link className={styles.button} href="/admin/staff-list/?modal=true">
          Додати співробітника
        </Link>
      </div>
      {showModal && <StaffModal />}
    </>
  );
};
export default StaffCardsColumn;
