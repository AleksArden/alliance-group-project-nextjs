'use client';

import { HomePageType } from 'types/dataTypeForFirebase';
import styles from './HomeMain.module.scss';
import HomeMainForm from './homeMainForm/HomeMainForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';

const HomeMain = ({ data }: { data: HomePageType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="homeMain"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
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
