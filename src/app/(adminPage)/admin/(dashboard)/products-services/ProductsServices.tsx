'use client';
import styles from './ProductsServices.module.scss';
import ProductsServicesForm from './productsServicesForm/ProductsServicesForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { ProductsServicesType } from 'types/dataTypeForFirebase';

const AdminProductsServices = ({ data }: { data: ProductsServicesType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Products and Services Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="productsServicesForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/products-services');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
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
