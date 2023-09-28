import Link from 'next/link';
import StaffModal from 'components/staffModal/StaffModal';

import styles from './StaffCardsColumn.module.scss';

interface IProps {
  slug: Record<string, string | null | undefined>;
}

const StaffCardsColumn = ({ slug }: IProps) => {
  const showModal = slug?.modal;

  return (
    <>
      <div className={styles.container}>
        <ul></ul>
        <Link className={styles.button} href="/admin/staff-list/?modal=true">
          Додати співробітника
        </Link>
      </div>
      {showModal && <StaffModal />}
    </>
  );
};
export default StaffCardsColumn;
