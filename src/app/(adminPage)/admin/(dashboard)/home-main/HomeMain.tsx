'use client';

import { HomePageType } from 'types/dataTypeForFirebase';
import styles from './HomeMain.module.scss';
import HomeMainForm from './homeMainForm/HomeMainForm';
import AdminButton from 'components/adminButton/AdminButton';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const HomeMain = ({ data }: { data: HomePageType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Main Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="homeMain"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <HomeMainForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default HomeMain;
