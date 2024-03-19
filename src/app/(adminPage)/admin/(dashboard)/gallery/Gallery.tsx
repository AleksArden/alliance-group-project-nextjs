'use client';

import styles from './Gallery.module.scss';
import GalleryForm from './galleryForm/GalleryForm';
import AdminButton from 'components/adminButton/AdminButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GalleryType } from 'types/dataTypeForFirebase';

const AdminGallery = ({ data }: { data: GalleryType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.adminHeader}>
        <h2 className={styles.title}>Gallery Page</h2>

        <AdminButton
          btnName={isLoading ? 'Завантажується' : 'Зберегти'}
          idForm="galleryForm"
          disabled={isLoading ? true : false}
          type="submit"
        />

        <div className={styles.buttonWrapper}>
          <AdminButton
            btnName="Перейти на сайт"
            onClick={() => {
              router.push('/gallery');
            }}
          />
          <AdminButton btnName="Вийти" btnLogout={true} />
        </div>
      </header>
      <section className={styles.section}>
        <div className={styles.container}>
          <GalleryForm
            data={data}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </section>
    </>
  );
};
export default AdminGallery;
