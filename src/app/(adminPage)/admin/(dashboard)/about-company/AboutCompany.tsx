'use client';

import styles from './AboutCompany.module.scss';
import AboutCompanyForm from 'components/aboutCompanyForm/AboutCompanyForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AboutCompanyType } from 'types/dataTypeForFirebase';

const AboutCompany = ({ data }: { data: AboutCompanyType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>About Company Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="aboutCompanyForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/about-company');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <AboutCompanyForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default AboutCompany;
