'use client';

import StaffModal from 'components/staffModal/StaffModal';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './StaffCardsColumn.module.scss';
import { useEffect, useState } from 'react';
import { StaffType } from 'types/dataTypeForFirebase';
import StaffCard from 'components/staffCard/StaffCard';

interface IProps {
  data: StaffType[];
}

const StaffCardsColumn = ({ data }: IProps) => {
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
            <StaffCard
              key={onePerson.id}
              data={onePerson}
              biggestId={data.length}
            />
          ))}
        </ul>
        <button
          className={styles.button}
          onClick={() =>
            router.push('/admin/staff-list/?modal=true', { scroll: false })
          }
        >
          Додати співробітника
        </button>
      </div>
      {showModal && <StaffModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default StaffCardsColumn;
