'use client';

import styles from './HomeProducts.module.scss';
import HomeProductsForm from './homeProductsForm/HomeProductsForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { HomeProductsType } from 'types/dataTypeForFirebase';

const HomeProducts = ({ data }: { data: HomeProductsType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Products Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="homeProductsForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/#home-products');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
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
