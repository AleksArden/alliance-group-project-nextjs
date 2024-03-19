'use client';
import styles from './HomeServices.module.scss';
import HomeSerevicesForm from './homeServicesForm/HomeServicesForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HomeServicesType } from 'types/dataTypeForFirebase';

const HomeServices = ({ data }: { data: HomeServicesType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Services Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="homeServicesForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/#home-services');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
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
