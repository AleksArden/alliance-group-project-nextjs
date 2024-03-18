'use client';
import styles from './ProductsServices.module.scss';
import ProductsServicesForm from './productsServicesForm/ProductsServicesForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';
import { ProductsServicesType } from 'types/dataTypeForFirebase';

const AdminProductsServices = ({ data }: { data: ProductsServicesType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Products and Services Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="productsServices"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <ProductsServicesForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default AdminProductsServices;
