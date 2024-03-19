'use client';

import styles from './HomeIntro.module.scss';
import HomeIntroForm from './homeIntroForm/HomeIntroForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { IntroType } from 'types/dataTypeForFirebase';

const HomeIntro = ({ data }: { data: IntroType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Home Intro Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="homeIntroForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/#home-intro');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <HomeIntroForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default HomeIntro;
