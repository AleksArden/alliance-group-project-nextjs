'use client';

import styles from './HomeProducts.module.scss';
import HomeProductsForm from './homeProductsForm/HomeProductsForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';
import { HomeProductsType } from 'types/dataTypeForFirebase';

const HomeProducts = ({ data }: { data: HomeProductsType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Products Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="homeProducts"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <HomeProductsForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default HomeProducts;
