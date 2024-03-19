'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './AdminStaffCardsColumn.module.scss';
import { useEffect, useState } from 'react';
import { StaffType } from 'types/dataTypeForFirebase';

import AdminStaffCard from 'components/adminStaffCard/AdminStaffCard';
import AdminStaffModal from 'components/adminStaffModal/AdminStaffModal';
import AdminButton from 'components/adminButton/AdminButton';

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

  useEffect(() => {
    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [showModal]);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Staff Page</h2>
        <AdminButton
          btnName="Додати співробітника"
          onClick={() =>
            router.push('/admin/staff/?modal=true', { scroll: false })
          }
        />
        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/about-company#staff');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>

      <section className={styles.section}>
        {data.length > 0 && (
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
            <AdminButton
              btnName="Додати співробітника"
              onClick={() =>
                router.push('/admin/staff/?modal=true', { scroll: false })
              }
            />
          </div>
        )}
      </section>
      {showModal && <AdminStaffModal btnName="Додати" id={biggestId} />}
    </>
  );
};
export default AdminStaffCardsColumn;
