'use client';
import styles from './HomeServices.module.scss';
import HomeSerevicesForm from './homeServicesForm/HomeServicesForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';
import { HomeServicesType } from 'types/dataTypeForFirebase';

const HomeServices = ({ data }: { data: HomeServicesType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Services Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="homeServices"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <HomeSerevicesForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default HomeServices;
