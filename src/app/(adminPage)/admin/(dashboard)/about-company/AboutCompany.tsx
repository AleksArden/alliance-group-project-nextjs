'use client';

import styles from './AboutCompany.module.scss';
import AboutCompanyForm from 'components/aboutCompanyForm/AboutCompanyForm';
import AdminButton from 'components/adminButton/AdminButton';
import AdminSubmitButton from 'components/adminSubmitButton/AdminSubmitButton';
import { useState } from 'react';
import { AboutCompanyType } from 'types/dataTypeForFirebase';

const AboutCompany = ({ data }: { data: AboutCompanyType }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>About Company Page</h2>

        <AdminSubmitButton
          btnName="Зберегти"
          idForm="aboutCompany"
          isLoading={isLoading}
        />

        <div className={styles.buttonWrapper}>
          <AdminButton title="Перейти на сайт" onClickGoToSite={true} />
          <AdminButton title="Вийти" onClickLogout={true} />
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
