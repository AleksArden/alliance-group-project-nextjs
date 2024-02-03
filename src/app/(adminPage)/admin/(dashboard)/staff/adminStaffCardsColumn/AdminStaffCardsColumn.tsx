'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './AdminStaffCardsColumn.module.scss';
import { useEffect, useState } from 'react';
import { StaffType } from 'types/dataTypeForFirebase';

import AdminStaffCard from 'components/adminStaffCard/AdminStaffCard';
import AdminStaffModal from 'components/adminStaffModal/AdminStaffModal';

interface IProps {
  data: StaffType[];
}

const AdminStaffCardsColumn = ({ data }: IProps) => {
  const [biggestId, setBiggestId] = useState(0);

  const searchParams = useSearchParams();
  const showModal = searchParams.has('modal');

  const router = useRouter();
  useEffect(() => {
    setBiggestId(data.length + 1);
  }, [data]);
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {data.map((onePerson: StaffType) => (
            <AdminStaffCard
              key={onePerson.id}
              card={onePerson}
              biggestId={data.length}
            />
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() =>
            router.push('/admin/staff/?modal=true', { scroll: false })
          }
        >
          Додати співробітника
        </button>
      </div>
      {showModal && <AdminStaffModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminStaffCardsColumn;
